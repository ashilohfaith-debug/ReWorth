"""
ReWorth – Waste to Wealth  |  Flask REST API
============================================================
Auth   : username + password  (JWT via PyJWT)
DB     : PostgreSQL (psycopg2, no ORM)
AI     : Google Gemini Vision  (gemini-1.5-flash)
CORS   : enabled for frontend dev server
============================================================
"""

import os, re, uuid, base64, io
from datetime import datetime, timezone, timedelta
from functools import wraps

import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import jwt

from database import get_db_connection, close_connection

load_dotenv()

app = Flask(__name__)
# Allow requests from:
#   - file:// (origin is "null" when opened directly in browser)
#   - any localhost port (live server, VS Code, etc.)
#   - any origin in development
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=False)
app.config["JSON_SORT_KEYS"] = False

JWT_SECRET  = os.getenv("JWT_SECRET", "reworth_dev_secret")
JWT_EXPIRES = timedelta(days=7)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ── helpers ──────────────────────────────────────────────────────────────

def ok(data=None, msg="Success", code=200):
    body = {"success": True, "message": msg}
    if data is not None:
        body["data"] = data
    return jsonify(body), code

def err(msg="Error", code=400):
    return jsonify({"success": False, "message": msg}), code

def rows(cursor):
    return [dict(r) for r in cursor.fetchall()]

def row(cursor):
    r = cursor.fetchone()
    return dict(r) if r else None

def make_token(user_id, username):
    payload = {
        "user_id": user_id,
        "username": username,
        "exp": datetime.now(timezone.utc) + JWT_EXPIRES,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# ── JWT auth decorator ────────────────────────────────────────────────────

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "").strip()
        if not token:
            return err("Token missing", 401)
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.current_user = payload
        except jwt.ExpiredSignatureError:
            return err("Token expired", 401)
        except jwt.InvalidTokenError:
            return err("Invalid token", 401)
        return f(*args, **kwargs)
    return decorated

def optional_token(f):
    """Decorator that tries to decode the token but doesn't block if missing."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "").strip()
        request.current_user = None
        if token:
            try:
                request.current_user = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            except Exception:
                pass
        return f(*args, **kwargs)
    return decorated

# ── health ────────────────────────────────────────────────────────────────

@app.route("/api/health")
def health():
    return ok(msg="ReWorth API is running")

# ═════════════════════════════════════════════════════════════════════════
# AUTH
# ═════════════════════════════════════════════════════════════════════════

@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip().lower()
    password = data.get("password") or ""

    if not username or not password:
        return err("Username and password are required")
    if len(username) < 3:
        return err("Username must be at least 3 characters")
    if len(password) < 6:
        return err("Password must be at least 6 characters")
    if not re.match(r"^[a-z0-9_\.]+$", username):
        return err("Username may only contain letters, numbers, underscores or dots")

    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT user_id FROM users WHERE username = %s", (username,))
        if cur.fetchone():
            return err("Username already exists. Please choose another username.", 409)
        hashed = generate_password_hash(password)
        cur.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s) RETURNING user_id, username, created_at",
            (username, hashed)
        )
        user = dict(cur.fetchone())
        conn.commit()
        token = make_token(user["user_id"], user["username"])
        return ok({"token": token, "user": {"user_id": user["user_id"], "username": user["username"]}},
                  "Registration successful", 201)
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip().lower()
    password = data.get("password") or ""

    if not username or not password:
        return err("Username and password are required")

    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT user_id, username, password FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        if not user or not check_password_hash(user["password"], password):
            return err("Invalid username or password", 401)
        token = make_token(user["user_id"], user["username"])
        return ok({
            "token": token,
            "user": {"user_id": user["user_id"], "username": user["username"]}
        }, "Login successful")
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/auth/me", methods=["GET"])
@token_required
def me():
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT user_id, username, created_at FROM users WHERE user_id = %s", (uid,))
        user = row(cur)
        if not user:
            return err("User not found", 404)
        return ok(user)
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

# ═════════════════════════════════════════════════════════════════════════
# COMMUNITY POSTS
# ═════════════════════════════════════════════════════════════════════════

@app.route("/api/posts", methods=["GET"])
@optional_token
def get_posts():
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        uid  = request.current_user["user_id"] if request.current_user else None
        cur.execute("""
            SELECT p.post_id, p.content, p.image_url, p.likes, p.created_at,
                   u.username,
                   CASE WHEN pl.like_id IS NOT NULL THEN TRUE ELSE FALSE END AS liked_by_me
            FROM posts p
            JOIN users u ON u.user_id = p.user_id
            LEFT JOIN post_likes pl ON pl.post_id = p.post_id AND pl.user_id = %s
            ORDER BY p.created_at DESC
            LIMIT 100
        """, (uid,))
        return ok(rows(cur))
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/posts", methods=["POST"])
@token_required
def create_post():
    data    = request.get_json(silent=True) or {}
    content = (data.get("content") or "").strip()
    image   = (data.get("image_url") or "").strip()
    if not content:
        return err("Post content is required")
    if len(content) > 2000:
        return err("Post content must be under 2000 characters")
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("""
            INSERT INTO posts (user_id, content, image_url)
            VALUES (%s, %s, %s)
            RETURNING post_id, content, image_url, likes, created_at
        """, (uid, content, image or None))
        post = dict(cur.fetchone())
        post["username"]     = request.current_user["username"]
        post["liked_by_me"]  = False
        conn.commit()
        return ok(post, "Post created", 201)
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
@token_required
def delete_post(post_id):
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT user_id FROM posts WHERE post_id = %s", (post_id,))
        post = cur.fetchone()
        if not post:
            return err("Post not found", 404)
        if post["user_id"] != uid:
            return err("You can only delete your own posts", 403)
        cur.execute("DELETE FROM posts WHERE post_id = %s", (post_id,))
        conn.commit()
        return ok(msg="Post deleted")
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/posts/<int:post_id>/like", methods=["POST"])
@token_required
def like_post(post_id):
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT post_id FROM posts WHERE post_id = %s", (post_id,))
        if not cur.fetchone():
            return err("Post not found", 404)
        cur.execute("SELECT like_id FROM post_likes WHERE post_id=%s AND user_id=%s", (post_id, uid))
        existing = cur.fetchone()
        if existing:
            cur.execute("DELETE FROM post_likes WHERE post_id=%s AND user_id=%s", (post_id, uid))
            cur.execute("UPDATE posts SET likes = GREATEST(0, likes-1) WHERE post_id=%s RETURNING likes", (post_id,))
            liked = False
        else:
            cur.execute("INSERT INTO post_likes (post_id, user_id) VALUES (%s, %s)", (post_id, uid))
            cur.execute("UPDATE posts SET likes = likes+1 WHERE post_id=%s RETURNING likes", (post_id,))
            liked = True
        new_likes = cur.fetchone()["likes"]
        conn.commit()
        return ok({"liked": liked, "likes": new_likes})
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

# ═════════════════════════════════════════════════════════════════════════
# LOCATIONS
# ═════════════════════════════════════════════════════════════════════════

@app.route("/api/locations", methods=["GET"])
def get_locations():
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("""
            SELECT l.location_id, l.title, l.description, l.address, l.image_url, l.created_at,
                   u.username
            FROM locations l
            JOIN users u ON u.user_id = l.user_id
            ORDER BY l.created_at DESC
            LIMIT 100
        """)
        return ok(rows(cur))
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/locations", methods=["POST"])
@token_required
def create_location():
    data  = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if not title:
        return err("Title is required")
    desc    = (data.get("description") or "").strip()
    address = (data.get("address") or "").strip()
    image   = (data.get("image_url") or "").strip()
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("""
            INSERT INTO locations (user_id, title, description, address, image_url)
            VALUES (%s,%s,%s,%s,%s)
            RETURNING location_id, title, description, address, image_url, created_at
        """, (uid, title, desc or None, address or None, image or None))
        loc = dict(cur.fetchone())
        loc["username"] = request.current_user["username"]
        conn.commit()
        return ok(loc, "Location reported", 201)
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

@app.route("/api/locations/<int:loc_id>", methods=["DELETE"])
@token_required
def delete_location(loc_id):
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("SELECT user_id FROM locations WHERE location_id=%s", (loc_id,))
        loc = cur.fetchone()
        if not loc:
            return err("Location not found", 404)
        if loc["user_id"] != uid:
            return err("You can only delete your own location reports", 403)
        cur.execute("DELETE FROM locations WHERE location_id=%s", (loc_id,))
        conn.commit()
        return ok(msg="Location deleted")
    except psycopg2.Error as e:
        if conn: conn.rollback()
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

# ═════════════════════════════════════════════════════════════════════════
# DASHBOARD
# ═════════════════════════════════════════════════════════════════════════

@app.route("/api/dashboard", methods=["GET"])
@token_required
def dashboard():
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()

        cur.execute("SELECT COUNT(*) AS cnt FROM posts")
        total_posts = cur.fetchone()["cnt"]

        cur.execute("SELECT COUNT(*) AS cnt FROM locations")
        total_locs = cur.fetchone()["cnt"]

        cur.execute("SELECT COUNT(*) AS cnt FROM users")
        total_users = cur.fetchone()["cnt"]

        cur.execute("SELECT COUNT(*) AS cnt FROM ai_history WHERE user_id=%s", (uid,))
        my_scans = cur.fetchone()["cnt"]

        cur.execute("""
            SELECT p.post_id, p.content, p.image_url, p.likes, p.created_at, u.username
            FROM posts p JOIN users u ON u.user_id=p.user_id
            ORDER BY p.created_at DESC LIMIT 5
        """)
        recent_posts = rows(cur)

        cur.execute("""
            SELECT l.location_id, l.title, l.address, l.image_url, l.created_at, u.username
            FROM locations l JOIN users u ON u.user_id=l.user_id
            ORDER BY l.created_at DESC LIMIT 4
        """)
        recent_locs = rows(cur)

        cur.execute("""
            SELECT history_id, waste_type, category, created_at
            FROM ai_history WHERE user_id=%s
            ORDER BY created_at DESC LIMIT 5
        """, (uid,))
        recent_scans = rows(cur)

        return ok({
            "stats": {
                "total_posts": total_posts,
                "total_locations": total_locs,
                "total_users": total_users,
                "my_scans": my_scans,
            },
            "recent_posts":     recent_posts,
            "recent_locations": recent_locs,
            "recent_scans":     recent_scans,
        })
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

# ═════════════════════════════════════════════════════════════════════════
# AI WASTE IDENTIFICATION  (Gemini Vision)
# ═════════════════════════════════════════════════════════════════════════
#
#  ┌──────────────────────────────────────────────────────────────┐
#  │  GEMINI INTEGRATION IS READY.                                │
#  │  To activate: paste your Google AI Studio key into .env:     │
#  │      GEMINI_API_KEY=AIza...                                  │
#  │  Then restart the server.  No other changes needed.          │
#  └──────────────────────────────────────────────────────────────┘

def _call_gemini(image_bytes: bytes, mime_type: str) -> dict:
    """
    Calls Gemini 1.5 Flash with the uploaded image and returns a structured
    waste-identification result.

    If GEMINI_API_KEY is not set, returns a mock result so the rest of the
    pipeline (DB storage, frontend display) can be tested without a key.
    """
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if not api_key:
        # ── MOCK (no API key) ─────────────────────────────────────────────
        return {
            "waste_type":   "Plastic Bottle",
            "category":     "Recyclable Plastic",
            "explanation":  "This appears to be a PET plastic bottle commonly used for beverages. (Mock result — add GEMINI_API_KEY to .env to enable real AI analysis.)",
            "disposal":     "Place in the blue recycling bin. Ensure it is empty and rinsed.",
            "suggestions":  "Clean before recycling. Remove cap if required. Can be repurposed as a planter or storage container.",
        }

    # ── REAL GEMINI CALL ──────────────────────────────────────────────────
    import google.generativeai as genai
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """You are an expert waste management AI assistant.
Analyze the provided image and identify the waste material.
Respond ONLY with a JSON object (no markdown fences) with these exact keys:
{
  "waste_type": "<specific name, e.g. Plastic Bottle>",
  "category": "<broad category, e.g. Recyclable Plastic>",
  "explanation": "<2-3 sentence description of what you see and why it belongs to this category>",
  "disposal": "<clear, actionable disposal instruction>",
  "suggestions": "<2-3 recycling/reuse suggestions separated by semicolons>"
}"""

    import PIL.Image
    img = PIL.Image.open(io.BytesIO(image_bytes))
    response = model.generate_content([prompt, img])

    import json, re as _re
    text = response.text.strip()
    # strip accidental markdown code fences
    text = _re.sub(r"^```[a-zA-Z]*\n?", "", text)
    text = _re.sub(r"\n?```$", "", text)
    return json.loads(text)

@app.route("/api/ai/identify", methods=["POST"])
@optional_token
def ai_identify():
    """
    Accepts a multipart/form-data upload with field 'image'.
    Returns waste classification from Gemini (or mock if no key).
    """
    if "image" not in request.files:
        return err("No image file provided")

    file = request.files["image"]
    if file.filename == "":
        return err("Empty filename")

    allowed = {"image/jpeg", "image/png", "image/webp", "image/gif"}
    mime = file.content_type or "image/jpeg"
    if mime not in allowed:
        return err("Unsupported image type. Use JPEG, PNG, WebP or GIF.")

    try:
        img_bytes = file.read()
        if len(img_bytes) > 10 * 1024 * 1024:
            return err("Image too large. Maximum 10 MB.")

        result = _call_gemini(img_bytes, mime)

        # save a copy to uploads/ and record the filename
        filename  = f"{uuid.uuid4().hex}.jpg"
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        with open(save_path, "wb") as fh:
            fh.write(img_bytes)
        image_url = f"/uploads/{filename}"

        # persist to ai_history
        uid = request.current_user["user_id"] if request.current_user else None
        conn = cur = None
        try:
            conn = get_db_connection()
            cur  = conn.cursor()
            cur.execute("""
                INSERT INTO ai_history
                    (user_id, image_url, waste_type, category, explanation, disposal, suggestions)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                RETURNING history_id
            """, (uid, image_url,
                  result.get("waste_type"), result.get("category"),
                  result.get("explanation"), result.get("disposal"),
                  result.get("suggestions")))
            history_id = cur.fetchone()["history_id"]
            conn.commit()
            result["history_id"] = history_id
            result["image_url"]  = image_url
        except Exception:
            pass
        finally:
            close_connection(conn, cur)

        return ok(result)

    except Exception as e:
        return err(f"AI identification failed: {str(e)}", 500)

# ── serve uploaded images ──────────────────────────────────────────────

from flask import send_from_directory

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ── Gemini key config (sidebar endpoint) ─────────────────────────────────

@app.route("/api/ai/config", methods=["GET"])
def ai_config():
    """Returns whether a Gemini key is currently configured."""
    has_key = bool(os.getenv("GEMINI_API_KEY", "").strip())
    return ok({"gemini_configured": has_key,
               "model": "gemini-1.5-flash" if has_key else "mock"})

@app.route("/api/ai/config", methods=["POST"])
def set_ai_config():
    """
    Accepts { "api_key": "AIza..." } and writes it to the process
    environment so Gemini calls work immediately without a server restart.
    The key is NOT persisted to disk here — the user should also add it
    to their .env file for persistence across restarts.
    """
    data = request.get_json(silent=True) or {}
    key  = (data.get("api_key") or "").strip()
    if not key:
        return err("api_key is required")
    os.environ["GEMINI_API_KEY"] = key
    return ok({"gemini_configured": True}, "Gemini API key set for this session")

# ═════════════════════════════════════════════════════════════════════════
# AI HISTORY  (per-user scan log)
# ═════════════════════════════════════════════════════════════════════════

@app.route("/api/ai/history", methods=["GET"])
@token_required
def ai_history():
    uid = request.current_user["user_id"]
    conn = cur = None
    try:
        conn = get_db_connection()
        cur  = conn.cursor()
        cur.execute("""
            SELECT history_id, image_url, waste_type, category, created_at
            FROM ai_history WHERE user_id=%s
            ORDER BY created_at DESC LIMIT 20
        """, (uid,))
        return ok(rows(cur))
    except psycopg2.Error as e:
        return err(f"Database error: {e}", 500)
    finally:
        close_connection(conn, cur)

# ═════════════════════════════════════════════════════════════════════════
# GLOBAL ERROR HANDLERS
# ═════════════════════════════════════════════════════════════════════════

@app.errorhandler(404)
def not_found(e):
    return err("Endpoint not found", 404)

@app.errorhandler(405)
def method_not_allowed(e):
    return err("Method not allowed", 405)

@app.errorhandler(500)
def server_error(e):
    return err("Internal server error", 500)

# ── run ──────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "True").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
