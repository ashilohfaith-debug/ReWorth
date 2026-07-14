-- =========================================================================
--  sample_data.sql
--  -------------------------------------------------------------------
--  ReCircle Hub - Circular Economy Marketplace
--  -------------------------------------------------------------------
--  Populates the database with demo data for testing / demoing the API.
--  Run AFTER tables.sql.
--
--  NOTE: All sample users share the password:   Test@123
--  The value below is a pbkdf2:sha256 hash of "Test@123" generated with
--  werkzeug.security.generate_password_hash so it works out-of-the-box
--  with the /login route in app.py.
--
--  Usage:
--      psql -U postgres -d recirclehub -f sample_data.sql
-- =========================================================================

-- -------------------------------------------------------------------------
-- Sample Users (2 Sellers, 2 Buyers, 1 Admin)
-- Password for ALL users below is: Test@123
-- -------------------------------------------------------------------------
INSERT INTO users (name, email, phone, password, role) VALUES
('Arjun Mehta',   'arjun.seller@recirclehub.com', '9876543210',
 'pbkdf2:sha256:1000000$cVZg7n6o3yPmrzqF$dcd4ad1e586eb8dc517890d76f8fdfc55d7f6e72905e9307873a7c4e9e6db61f', 'Seller'),
('Priya Sharma',  'priya.seller@recirclehub.com', '9876543211',
 'pbkdf2:sha256:1000000$cVZg7n6o3yPmrzqF$dcd4ad1e586eb8dc517890d76f8fdfc55d7f6e72905e9307873a7c4e9e6db61f', 'Seller'),
('Rahul Verma',   'rahul.buyer@recirclehub.com', '9876543212',
 'pbkdf2:sha256:1000000$cVZg7n6o3yPmrzqF$dcd4ad1e586eb8dc517890d76f8fdfc55d7f6e72905e9307873a7c4e9e6db61f', 'Buyer'),
('Sneha Iyer',    'sneha.buyer@recirclehub.com', '9876543213',
 'pbkdf2:sha256:1000000$cVZg7n6o3yPmrzqF$dcd4ad1e586eb8dc517890d76f8fdfc55d7f6e72905e9307873a7c4e9e6db61f', 'Buyer'),
('Admin User',    'admin@recirclehub.com', '9876543214',
 'pbkdf2:sha256:1000000$cVZg7n6o3yPmrzqF$dcd4ad1e586eb8dc517890d76f8fdfc55d7f6e72905e9307873a7c4e9e6db61f', 'Admin');

-- -------------------------------------------------------------------------
-- Sample Categories
-- -------------------------------------------------------------------------
INSERT INTO categories (category_name) VALUES
('Plastic Waste'),
('Metal Scrap'),
('E-Waste'),
('Paper & Cardboard'),
('Textile Waste'),
('Organic Waste');

-- -------------------------------------------------------------------------
-- Sample Waste Listings
-- (seller_id 1 = Arjun, seller_id 2 = Priya)
-- -------------------------------------------------------------------------
INSERT INTO waste_listings (seller_id, category_id, title, description, weight, unit, price, location, status) VALUES
(1, 1, 'Mixed PET Bottles',        'Clean, sorted PET bottles ready for recycling.',        150.00, 'kg', 12.50, 'Chennai',   'Available'),
(1, 2, 'Aluminium Scrap Sheets',   'Off-cut aluminium sheets from fabrication unit.',        80.00,  'kg', 95.00, 'Chennai',   'Available'),
(2, 3, 'Old Laptops & Monitors',   'Non-working laptops and CRT monitors, e-waste grade.',   25.00,  'kg', 150.00,'Bengaluru', 'Available'),
(2, 4, 'Corrugated Cardboard',     'Used cardboard boxes, flattened and bundled.',           200.00, 'kg', 6.00,  'Bengaluru', 'Available'),
(1, 5, 'Cotton Fabric Off-cuts',   'Leftover cotton fabric from garment manufacturing.',     60.00,  'kg', 20.00, 'Vellore',   'Available'),
(2, 6, 'Kitchen Organic Waste',    'Compost-ready organic waste from a commercial kitchen.', 40.00,  'kg', 3.50,  'Vellore',   'Sold');

-- -------------------------------------------------------------------------
-- Sample Orders
-- (buyer_id 3 = Rahul, buyer_id 4 = Sneha)
-- -------------------------------------------------------------------------
INSERT INTO orders (buyer_id, listing_id, quantity, total_price, status) VALUES
(3, 1, 50.00,  625.00,  'Completed'),
(4, 3, 10.00,  1500.00, 'Confirmed'),
(3, 4, 100.00, 600.00,  'Pending'),
(4, 6, 40.00,  140.00,  'Completed');