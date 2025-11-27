# GenZmart - Production Ready Setup

## Project Structure

```
/
├── backend/                    # Hono + Chanfana + D1 API
│   ├── src/
│   │   ├── endpoints/
│   │   │   ├── admin/         # Admin CRUD operations
│   │   │   │   ├── products.ts
│   │   │   │   ├── orders.ts
│   │   │   │   └── users.ts
│   │   │   ├── auth/          # Authentication
│   │   │   │   ├── login.ts
│   │   │   │   └── register.ts
│   │   │   ├── tasks/         # Sample endpoints
│   │   │   └── dummyEndpoint.ts
│   │   └── index.ts           # Main app entry
│   ├── migrations/            # D1 Database migrations
│   ├── wrangler.jsonc         # Cloudflare Workers config
│   └── package.json
│
├── frontend/                   # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/        # Admin panel pages
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── services/
│   │   │   └── api.ts        # API client
│   │   ├── contexts/         # Auth & Cart context
│   │   └── App.tsx
│   ├── .env.development      # Local development
│   ├── .env.production       # Production config
│   └── package.json
│
└── README.md
```

## Backend API Endpoints

### Authentication
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - Login user

### Admin Products
- **GET** `/admin/products` - List products
- **POST** `/admin/products` - Create product
- **PUT** `/admin/products/:id` - Update product
- **DELETE** `/admin/products/:id` - Delete product

### Admin Orders
- **GET** `/admin/orders` - List orders
- **DELETE** `/admin/orders/:id` - Delete order

### Admin Users
- **GET** `/admin/users` - List users
- **DELETE** `/admin/users/:id` - Delete user

## Local Development

### Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend will start at: `http://localhost:8787`
API Docs at: `http://localhost:8787/`

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at: `http://localhost:8080`

## Production Deployment

### Deploy Backend to Cloudflare Workers

```bash
cd backend
npm run deploy
```

This will:
1. Deploy to Cloudflare Workers
2. Create production D1 database
3. Apply migrations automatically

### Deploy Frontend to Cloudflare Pages or Vercel

```bash
cd frontend
npm run build
npm run preview
```

Then deploy the `dist/` folder to your hosting provider.

## Environment Configuration

### Frontend (.env files)

**Development (.env.development):**
```
VITE_API_BASE=http://localhost:8787
```

**Production (.env.production):**
```
VITE_API_BASE=https://your-production-backend-url.com
```

### Backend (wrangler.jsonc)

Configure your Cloudflare D1 database:
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "openapi-template-db",
      "database_id": "YOUR_DATABASE_ID"
    }
  ]
}
```

## Database Migrations

Migrations are automatically applied on deployment. Create new migrations:

```bash
cd backend
wrangler d1 migrations create DB add_new_table
```

Edit migration file in `backend/migrations/` then run:

```bash
# Local testing
wrangler d1 migrations apply DB --local

# Production
npm run predeploy
```

## Key Features

✅ User Authentication (Login/Register)
✅ Admin Panel with Product/Order/User Management
✅ OpenAPI Documentation
✅ TypeScript Support
✅ D1 Database (Cloudflare)
✅ Production Ready
✅ API Client with centralized endpoints
✅ Environment configuration

## API Client Usage (Frontend)

```typescript
import { apiClient } from "@/services/api";

// Auth
await apiClient.auth.register({ name, email, password });
await apiClient.auth.login({ email, password });

// Products
await apiClient.products.list();
await apiClient.products.create(productData);
await apiClient.products.update(id, productData);
await apiClient.products.delete(id);

// Orders
await apiClient.orders.list();
await apiClient.orders.delete(id);

// Users
await apiClient.users.list();
await apiClient.users.delete(id);
```

## Troubleshooting

### CORS Issues
If you get CORS errors, add CORS middleware to backend `src/index.ts`:

```typescript
import { cors } from "hono/cors";
app.use(cors());
```

### Database Errors
Check D1 binding in `wrangler.jsonc` matches your actual database ID.

### API Not Found
Ensure frontend `.env` has correct `VITE_API_BASE` URL pointing to backend.

## Support

For issues or questions, check:
- Backend API docs: `http://localhost:8787/`
- Frontend logs: Browser console
- Wrangler logs: `/home/codespace/.config/.wrangler/logs/`
