-- =========================================================================
--  sample_data.sql  –  ReWorth: Sample Test Data
-- =========================================================================
-- Optional: Load this after tables.sql for quick testing
-- Run:  psql -U postgres -d reworth -f sample_data.sql
-- =========================================================================

-- ── Sample Users ─────────────────────────────────────────────────────────
-- Password for all: "Test@123" (hashed)
INSERT INTO users (username, password) VALUES
('alice', 'pbkdf2:sha256:600000$testSalt$hashedPasswordHere'),
('bob', 'pbkdf2:sha256:600000$testSalt$hashedPasswordHere'),
('charlie', 'pbkdf2:sha256:600000$testSalt$hashedPasswordHere');

-- Note: These hashed passwords won't actually work. Create real users via /api/auth/register
-- This is just to show the structure. For testing, sign up through the frontend.

-- ── Sample Posts (ONLY if users exist) ───────────────────────────────────
-- Uncomment after you create real users via the app

-- INSERT INTO posts (user_id, content, image_url, likes) VALUES
-- (1, 'Just found a huge pile of plastic bottles near the beach. We should organize a cleanup!', 'https://images.pexels.com/photos/3735205/pexels-photo-3735205.jpeg', 5),
-- (2, 'Did you know? Glass can be recycled infinitely without losing quality!', NULL, 3),
-- (1, 'Our college conducted a waste segregation drive today. Proud of our team!', NULL, 8);

-- ── Sample Locations (ONLY if users exist) ───────────────────────────────
-- Uncomment after you create real users via the app

-- INSERT INTO locations (user_id, title, description, address, image_url) VALUES
-- (1, 'Plastic waste near riverbank', 'Large amount of plastic bottles and bags blocking the water flow.', 'Anna Nagar, Chennai', 'https://images.pexels.com/photos/6591163/pexels-photo-6591163.jpeg'),
-- (2, 'E-waste dumped in vacant lot', 'Old monitors, keyboards, and cables. Needs proper e-waste disposal.', 'T Nagar, Chennai', NULL);

-- =========================================================================
-- For actual testing, just sign up via the frontend and create content!
-- =========================================================================
