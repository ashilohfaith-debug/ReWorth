# ReWorth — Waste to Wealth

**An AI-powered waste management platform for the Science Competition.**

Transform waste identification and recycling through Google Gemini AI, community collaboration, and real-time data sharing.

---

## 🎯 Features

### ✅ Fully Implemented

- **🤖 AI Waste Detector** — Upload or capture images; Gemini Vision identifies waste type, category, disposal instructions, and recycling suggestions
- **👤 User Authentication** — Username + password registration/login with JWT tokens
- **💬 Community Posts** — Share tips, cleanup drives, discoveries; like and delete your own posts
- **📍 Waste Location Reports** — Report areas needing cleanup with images and addresses
- **📖 Recycling Guide** — 10 waste categories with detailed how-to steps and reuse ideas
- **📊 Dashboard** — Personal stats, recent scans, community activity
- **🎨 Modern UI** — Blue/Black/Purple theme, smooth animations, fully responsive
- **🌙 Dark Mode** — Toggle light/dark themes
- **⚙ Gemini Config Sidebar** — Add your API key live without restarting

---

## 🏗 Tech Stack

### Backend
- **Flask** — REST API
- **PostgreSQL** — Database (psycopg2, no ORM)
- **JWT** — Authentication via PyJWT
- **Google Gemini 1.5 Flash** — AI Vision for waste detection
- **Pillow** — Image processing
- **Flask-CORS** — Frontend integration

### Frontend
- **Vanilla JavaScript** — No frameworks, dependency-free
- **CSS3** — Custom design system, animations, gradients
- **HTML5** — Semantic, accessible structure

---

## 🚀 Setup Instructions

### Prerequisites
- **Python 3.9+**
- **PostgreSQL 13+**
- **Google AI Studio API Key** (free at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey))

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd "recircle_hub/recircle_hub backend"
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file:**
   ```bash
   copy env.example .env
   ```

5. **Edit `.env` and fill in your values:**
   ```
   DB_NAME=reworth
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_random_secret
   GEMINI_API_KEY=your_gemini_key_here
   ```

6. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE reworth;
   ```

7. **Run SQL schema:**
   ```bash
   psql -U postgres -d reworth -f tables.sql
   ```

8. **Start the server:**
   ```bash
   python app.py
   ```

Backend runs at **http://localhost:5000**

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Open `index.html` in a browser** or use a local server:
   ```bash
   npx serve .
   ```

Frontend runs at **http://localhost:3000** (or just open `index.html`)

---

## 📐 Project Structure

```
.
├── recircle_hub/recircle_hub backend/
│   ├── app.py              # Main Flask API
│   ├── database.py         # PostgreSQL connection
│   ├── tables.sql          # Database schema
│   ├── requirements.txt    # Python dependencies
│   ├── env.example         # Environment template
│   └── uploads/            # AI-uploaded images (auto-created)
│
└── Frontend/
    ├── index.html          # Main page
    ├── css/
    │   └── style.css       # Complete design system
    └── js/
        ├── icons.js        # Icon placeholder
        └── script.js       # All interactivity
```

---

## 🤖 Gemini AI Integration

### How It Works

1. **Upload/capture an image** via the AI Detector
2. **Frontend sends** image to `/api/ai/identify`
3. **Backend calls** Gemini 1.5 Flash Vision with the image
4. **Gemini returns** structured JSON:
   - `waste_type`: "Plastic Bottle"
   - `category`: "Recyclable Plastic"
   - `explanation`: Description
   - `disposal`: Instructions
   - `suggestions`: Reuse ideas
5. **Backend stores** result in `ai_history` table
6. **Frontend displays** result in beautiful card UI

### Mock Mode

If no API key is set, the backend returns mock results so you can test the full pipeline without a Gemini key.

### Adding Your Key

**Option 1 — `.env` file (persistent):**
```
GEMINI_API_KEY=AIza...
```

**Option 2 — Sidebar (live, session-only):**
- Click the 🤖 FAB button (bottom-right)
- Paste your key
- Click Save
- Works immediately, no restart needed

---

## 🎨 UI Theme

- **Primary Color:** Blue (#1651B9, #2B6BE0)
- **Secondary Colors:** Black (#0E1E36), Purple (#7C3FCB)
- **Design Philosophy:** Clean, modern, premium — not overly colorful
- **Components:** Cards, gradients, rounded corners, smooth shadows, animations
- **Responsive:** Works on desktop, tablet, mobile

---

## 📊 Database Schema

### `users`
- `user_id`, `username` (unique), `password` (hashed), `created_at`

### `posts`
- `post_id`, `user_id` (FK), `content`, `image_url`, `likes`, `created_at`

### `post_likes`
- `like_id`, `post_id` (FK), `user_id` (FK), unique constraint

### `locations`
- `location_id`, `user_id` (FK), `title`, `description`, `address`, `image_url`, `created_at`

### `ai_history`
- `history_id`, `user_id` (FK), `image_url`, `waste_type`, `category`, `explanation`, `disposal`, `suggestions`, `created_at`

---

## 🔐 Authentication

- **Registration:** Username (unique, 3+ chars) + Password (6+ chars)
- **Login:** Returns JWT token valid for 7 days
- **Protected routes:** Use `Authorization: Bearer <token>` header
- **Frontend persistence:** JWT stored in `localStorage`

---

## 📜 API Endpoints

### Auth
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Sign in
- `GET /api/auth/me` — Get current user (protected)

### Posts
- `GET /api/posts` — List all posts (optional auth for "liked_by_me")
- `POST /api/posts` — Create post (protected)
- `DELETE /api/posts/:id` — Delete own post (protected)
- `POST /api/posts/:id/like` — Toggle like (protected)

### Locations
- `GET /api/locations` — List all locations
- `POST /api/locations` — Report location (protected)
- `DELETE /api/locations/:id` — Delete own location (protected)

### AI
- `POST /api/ai/identify` — Upload image, get waste classification
- `GET /api/ai/history` — My scan history (protected)
- `GET /api/ai/config` — Check if Gemini key is configured
- `POST /api/ai/config` — Set Gemini key (live, session-only)

### Dashboard
- `GET /api/dashboard` — User stats + recent activity (protected)

### Health
- `GET /api/health` — Health check

---

## 🧪 Testing

### Quick Test Workflow

1. **Start backend:** `python app.py`
2. **Open frontend:** `index.html`
3. **Sign up:** Create a username + password
4. **AI Detector:** Upload any image → see mock or real Gemini result
5. **Community:** Create a post, like posts, delete your own
6. **Locations:** Report a waste location
7. **Dashboard:** View your stats

### Without Gemini Key

The system works fully — mock results are returned for AI detection so you can test the complete pipeline.

### With Gemini Key

Real AI waste identification powered by Google Gemini 1.5 Flash.

---

## 🌟 Science Competition Highlights

✅ **Addresses a real problem:** Waste mismanagement and lack of recycling education  
✅ **AI-powered:** Uses cutting-edge Google Gemini Vision  
✅ **Community-driven:** Users collaborate to solve local waste issues  
✅ **Data-driven:** Tracks user activity, scans, and community impact  
✅ **Scalable:** Clean architecture, REST API, modular frontend  
✅ **Professional:** Production-quality code, secure auth, modern UI  
✅ **Complete:** Every feature works end-to-end, frontend ↔ backend fully synced  

---

## 🛠 Development Notes

- **No ORM:** Raw SQL for full control and transparency
- **No frontend framework:** Vanilla JS for simplicity and speed
- **JWT authentication:** Stateless, scalable
- **Mock-first:** Works without external API keys for testing
- **Modular:** Easy to extend, maintain, or refactor

---

## 📝 License

Built for educational / competition purposes. Free to use and modify.

---

## 👥 Contact

For questions, ideas, or partnerships:
- **Email:** hello@reworth.eco
- **Phone:** +91 98765 43210
- **Location:** Chennai, Tamil Nadu, India

---

**ReWorth — Turn Today's Waste into Tomorrow's Wealth** ♻
