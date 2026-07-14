# ReCircle Hub – Circular Economy Marketplace

A production-ready **Flask + PostgreSQL** REST API backend that connects **Sellers** of recyclable/reusable waste material with **Buyers**, enabling a circular economy marketplace. Built with raw SQL (`psycopg2`, no ORM) for full control and transparency — ideal for a hackathon demo or as a learning reference.

---

## Features

- JWT-free, simple email/password authentication with hashed passwords (Werkzeug `pbkdf2:sha256`)
- Role-based users: **Buyer**, **Seller**, **Admin**
- Full CRUD for Users, Categories, Waste Listings, and Orders
- Search waste listings by category and/or location
- Automatic listing status management (`Available` / `Sold` / `Inactive`)
- Dashboard analytics: users, sellers, buyers, categories, listings, orders, revenue
- Parameterized SQL queries everywhere → SQL-injection safe
- Consistent JSON response format with proper HTTP status codes
- Centralized error handling (`try/except` on every route + global error handlers)

---

## Project Structure

```
ReCircleHub/
│
├── app.py                  # Main Flask application (all routes)
├── database.py              # PostgreSQL connection handling (psycopg2)
├── requirements.txt          # Python dependencies
├── tables.sql                # Database schema (DDL)
├── sample_data.sql           # Demo/sample data (DML)
├── .env.example               # Environment variable template
├── README.md                  # This file
└── postman_collection.json     # Postman collection for all APIs
```

---

## Prerequisites

- Python 3.9+
- PostgreSQL 13+ installed and running
- pip / virtualenv
- (Optional) Postman for API testing

---

## Setup Instructions (VS Code)

### 1. Clone / open the project folder in VS Code

```bash
cd ReCircleHub
code .
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and update it with your local PostgreSQL credentials:

```bash
cp .env.example .env
```

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=recirclehub
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
FLASK_DEBUG=True
```

### 5. Create the PostgreSQL database

```bash
# Open psql or any PostgreSQL client and run:
CREATE DATABASE recirclehub;
```

### 6. Create tables and load sample data

```bash
psql -U postgres -d recirclehub -f tables.sql
psql -U postgres -d recirclehub -f sample_data.sql
```

> On Windows, run these from the PostgreSQL `bin` directory or ensure `psql` is on your PATH. You can also run the `.sql` files using pgAdmin's Query Tool.

### 7. Run the Flask app

```bash
python app.py
```

The API will start at: **http://localhost:5000**

---

## Sample Login Credentials

All seeded users share the password: **`Test@123`**

| Email                         | Role   |
|--------------------------------|--------|
| arjun.seller@recirclehub.com   | Seller |
| priya.seller@recirclehub.com   | Seller |
| rahul.buyer@recirclehub.com    | Buyer  |
| sneha.buyer@recirclehub.com    | Buyer  |
| admin@recirclehub.com          | Admin  |

---

## API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/` | API health check |

### Authentication
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login with email + password |

### Users
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/users` | Get all users (optional `?role=Seller`) |
| GET | `/user/<id>` | Get a user profile (includes listings/orders) |
| PUT | `/update_user/<id>` | Update user details |
| DELETE | `/delete_user/<id>` | Delete a user |

### Categories
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/categories` | Get all categories |
| POST | `/add_category` | Add a new category |
| PUT | `/update_category/<id>` | Update a category |
| DELETE | `/delete_category/<id>` | Delete a category |

### Waste Listings
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/waste` | Get all waste listings |
| GET | `/waste/<id>` | Get a specific listing |
| POST | `/add_waste` | Create a new listing (Seller only) |
| PUT | `/update_waste/<id>` | Update a listing |
| DELETE | `/delete_waste/<id>` | Delete a listing |
| GET | `/search?category=&location=` | Search available listings |

### Orders
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/orders` | Get all orders |
| POST | `/order` | Place an order (Buyer only) |
| PUT | `/update_order/<id>` | Update order status |
| DELETE | `/delete_order/<id>` | Delete an order |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/dashboard` | Marketplace analytics summary |

---

## Example Requests

### Register
```http
POST /register
Content-Type: application/json

{
  "name": "Neha Kapoor",
  "email": "neha@example.com",
  "phone": "9999999999",
  "password": "Secure@123",
  "role": "Seller"
}
```

### Login
```http
POST /login
Content-Type: application/json

{
  "email": "arjun.seller@recirclehub.com",
  "password": "Test@123"
}
```

### Add Waste Listing
```http
POST /add_waste
Content-Type: application/json

{
  "seller_id": 1,
  "category_id": 1,
  "title": "Shredded Plastic Waste",
  "description": "Clean industrial plastic shred",
  "weight": 100,
  "unit": "kg",
  "price": 15.5,
  "location": "Chennai"
}
```

### Place Order
```http
POST /order
Content-Type: application/json

{
  "buyer_id": 3,
  "listing_id": 2,
  "quantity": 20
}
```

### Search
```http
GET /search?category=plastic&location=chennai
```

---

## Standard JSON Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Description of the error"
}
```

---

## Validation & Security Highlights

- Email format validated via regex
- Password requires min. 6 characters with at least one letter and one digit
- Duplicate email check on register/update
- Passwords hashed with `pbkdf2:sha256` (Werkzeug) — never stored/returned in plain text
- All SQL queries use parameterized placeholders (`%s`) — no string concatenation
- Role checks enforced (only Sellers can list, only Buyers can order)
- Foreign key constraints with `ON DELETE CASCADE` maintain referential integrity

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3 |
| Framework | Flask |
| Database | PostgreSQL |
| DB Driver | psycopg2-binary |
| Password Hashing | Werkzeug security |
| API Testing | Postman |

---

## Postman Collection

Import `postman_collection.json` into Postman to test all endpoints instantly. It includes a collection variable `base_url` (default `http://localhost:5000`) so you can switch environments easily.

---

## License

Built for educational / hackathon purposes. Free to use and modify.