# GenZmart - Testing Guide

## Complete Workflow: Register → Login → Add Product → View in Admin Panel

### Prerequisites
- Backend running on `http://localhost:8787`
- Frontend running on `http://localhost:8081`

---

## Step 1: Register a New User

### Via Frontend (Recommended)
1. Go to `http://localhost:8081/register`
2. Fill in the form:
   - Name: `Admin User`
   - Email: `admin@genzmart.com`
   - Password: `admin123456`
3. Click "Register"
4. You'll be redirected to login page

### Via API (curl)
```bash
curl -X POST http://localhost:8787/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@genzmart.com",
    "password": "admin123456"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Step 2: Login

### Via Frontend
1. Go to `http://localhost:8081/login`
2. Enter email and password from Step 1
3. Click "Login"
4. User data will be stored in the browser

### Via API (curl)
```bash
curl -X POST http://localhost:8787/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@genzmart.com",
    "password": "admin123456"
  }'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@genzmart.com",
    "is_admin": 0
  }
}
```

---

## Step 3: Add Products to Database

### Via Frontend (Recommended)
1. After login, navigate to `/admin/products`
2. Click "Add Product" button
3. Fill in the product form:
   - Product Name: `iPhone 15 Pro`
   - Price: `79999`
   - Stock: `50`
   - Image URL: `https://example.com/iphone.jpg`
   - Description: `Latest iPhone with advanced camera`
4. Click "Add Product"
5. Product will appear in the table immediately

### Via API (curl)
```bash
curl -X POST http://localhost:8787/admin/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced camera",
    "price": 79999,
    "stock": 50,
    "image_url": "https://example.com/iphone.jpg"
  }'
```

**Response:**
```json
{
  "success": true
}
```

---

## Step 4: View Products in Admin Panel

### Via Frontend
1. Go to `http://localhost:8081/admin/products`
2. See all products added to the database:
   - ID
   - Name
   - Description
   - Price (₹)
   - Stock
   - Delete button

### Via API (curl)
```bash
curl http://localhost:8787/admin/products | jq
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced camera",
    "price": 79999,
    "stock": 50,
    "image_url": "https://example.com/iphone.jpg",
    "created_at": "2025-11-27 07:00:18",
    "updated_at": "2025-11-27 07:00:18"
  }
]
```

---

## Database Structure

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Backend API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Admin - Products
- `GET /admin/products` - List all products
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product

### Admin - Orders
- `GET /admin/orders` - List all orders
- `DELETE /admin/orders/:id` - Delete order

### Admin - Users
- `GET /admin/users` - List all users
- `DELETE /admin/users/:id` - Delete user

---

## OpenAPI Documentation

Access the full interactive API documentation at:
```
http://localhost:8787/
```

This shows all endpoints with their request/response schemas.

---

## What's Been Fixed

✅ **Dummy endpoint removed** - No more mock data endpoints
✅ **Database integration** - All data stored in Cloudflare D1
✅ **User registration** - Stores user data in database
✅ **User login** - Returns user info from database
✅ **Product creation** - Stores products in database
✅ **Admin panel** - Shows only real data from database
✅ **Frontend forms** - Add products through admin panel UI
✅ **API endpoints** - All connected between frontend and backend

---

## Test Checklist

- [ ] Register new user via frontend
- [ ] Login with registered credentials
- [ ] Add product via admin panel form
- [ ] See product in products list
- [ ] Delete product and verify removal
- [ ] Check OpenAPI docs for all endpoints
- [ ] Verify data persists in database

---

## Troubleshooting

### Products not showing in admin panel
1. Check if backend is running: `curl http://localhost:8787/admin/products`
2. Check if database has products: Backend should return array
3. Check browser console for errors (F12)
4. Click "Refresh" button in admin panel

### Registration fails with "User already exists"
- Email is already registered in database
- Use a different email address

### Login fails
- Check email and password are correct
- Verify user exists in database

### Add product button doesn't work
- Check backend is running
- Check console errors in browser (F12)
- Verify all required fields are filled

