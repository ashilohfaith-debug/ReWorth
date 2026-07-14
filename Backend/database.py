"""
=========================================================================
 database.py
 ------------------------------------------------------------------------
 ReCircle Hub - Circular Economy Marketplace
 ------------------------------------------------------------------------
 Handles all PostgreSQL database connection logic for the application.
 Uses psycopg2 (no ORM) with parameterized queries to keep every route
 SQL-injection safe. Connection details are read from environment
 variables (see .env.example) via python-dotenv.
=========================================================================
"""

import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

# -------------------------------------------------------------------------
# Load environment variables from a .env file (if present)
# -------------------------------------------------------------------------
load_dotenv()

# -------------------------------------------------------------------------
# Database configuration (falls back to sensible local defaults)
# -------------------------------------------------------------------------
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432"),
    "dbname": os.getenv("DB_NAME", "reworth"),       # matches tables.sql
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", ""),         # set in .env
}


def get_db_connection():
    """
    Creates and returns a new PostgreSQL connection.

    Returns:
        psycopg2.extensions.connection: An open DB connection whose
        cursors return rows as dictionaries (RealDictCursor), which makes
        it trivial to convert query results directly into JSON.

    Raises:
        psycopg2.OperationalError: if the connection cannot be established.
        This is intentionally NOT swallowed here -- callers (routes) are
        responsible for catching it and returning a proper JSON/HTTP
        error response.
    """
    conn = psycopg2.connect(
        host=DB_CONFIG["host"],
        port=DB_CONFIG["port"],
        dbname=DB_CONFIG["dbname"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        cursor_factory=psycopg2.extras.RealDictCursor,
    )
    return conn


def close_connection(conn=None, cursor=None):
    """
    Safely closes an open cursor and connection, ignoring cases where
    either object is None or already closed.

    Args:
        conn: an open psycopg2 connection (or None)
        cursor: an open psycopg2 cursor (or None)
    """
    try:
        if cursor is not None:
            cursor.close()
    except Exception:
        pass
    finally:
        try:
            if conn is not None:
                conn.close()
        except Exception:
            pass


def test_connection():
    """
    Simple utility to verify DB connectivity at startup.
    Returns True if the connection succeeds, False otherwise.
    """
    conn = None
    try:
        conn = get_db_connection()
        return True
    except Exception as error:
        print(f"[DATABASE] Connection test failed: {error}")
        return False
    finally:
        close_connection(conn)