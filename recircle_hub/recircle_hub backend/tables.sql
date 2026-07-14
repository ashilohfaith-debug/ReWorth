-- =========================================================================
--  tables.sql  –  ReWorth: Waste to Wealth
-- =========================================================================
-- Run:  psql -U postgres -d reworth -f tables.sql
-- =========================================================================

DROP TABLE IF EXISTS ai_history    CASCADE;
DROP TABLE IF EXISTS post_likes    CASCADE;
DROP TABLE IF EXISTS locations     CASCADE;
DROP TABLE IF EXISTS posts         CASCADE;
DROP TABLE IF EXISTS users         CASCADE;

-- ── users ────────────────────────────────────────────────────────────────
CREATE TABLE users (
    user_id     SERIAL PRIMARY KEY,
    username    VARCHAR(60)  NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_username ON users(username);

-- ── community posts ──────────────────────────────────────────────────────
CREATE TABLE posts (
    post_id     SERIAL PRIMARY KEY,
    user_id     INTEGER      NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content     TEXT         NOT NULL,
    image_url   VARCHAR(500),
    likes       INTEGER      NOT NULL DEFAULT 0,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_posts_user    ON posts(user_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- ── post likes (one per user per post) ───────────────────────────────────
CREATE TABLE post_likes (
    like_id   SERIAL  PRIMARY KEY,
    post_id   INTEGER NOT NULL REFERENCES posts(post_id)  ON DELETE CASCADE,
    user_id   INTEGER NOT NULL REFERENCES users(user_id)  ON DELETE CASCADE,
    UNIQUE(post_id, user_id)
);

-- ── waste-location reports ────────────────────────────────────────────────
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    user_id     INTEGER      NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    description TEXT,
    address     VARCHAR(300),
    image_url   VARCHAR(500),
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_locations_user    ON locations(user_id);
CREATE INDEX idx_locations_created ON locations(created_at DESC);

-- ── AI identification history ─────────────────────────────────────────────
CREATE TABLE ai_history (
    history_id   SERIAL PRIMARY KEY,
    user_id      INTEGER      REFERENCES users(user_id) ON DELETE SET NULL,
    image_url    VARCHAR(500),
    waste_type   VARCHAR(100),
    category     VARCHAR(100),
    explanation  TEXT,
    disposal     TEXT,
    suggestions  TEXT,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_ai_history_user ON ai_history(user_id);
