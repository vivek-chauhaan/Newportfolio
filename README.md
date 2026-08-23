# Portfolio Management System — Full Stack

A complete portfolio website with a React (Vite) frontend and a Node.js /
Express / MongoDB backend, including a JWT-protected admin panel for
managing every section of the site.

```
Newportfolio/
├── backend/          Node.js + Express + MongoDB API
├── src/               React frontend (existing UI, unchanged)
└── .env               Frontend environment file (VITE_API_BASE_URL)
```

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT access + refresh tokens, bcrypt password hashing
- **Uploads:** Multer (disk storage, type/size validated), served from `/uploads`
- **Security:** Helmet, CORS allow-list, rate limiting, mongo-sanitize, input validation

## Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - **Local:** install MongoDB Community Server and run `mongod` (default `mongodb://127.0.0.1:27017`), or
  - **Atlas:** create a free cluster at https://www.mongodb.com/atlas and copy its connection string

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `8080`) |
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Long random strings — generate with `openssl rand -hex 32` |
| `JWT_ACCESS_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | Token lifetimes (default `15m` / `7d`) |
| `CLIENT_ORIGIN` | Frontend origin(s) allowed by CORS, comma-separated |
| `ADMIN_DEFAULT_NAME/EMAIL/PASSWORD` | Seeded on first run if no admin exists yet |
| `MAX_UPLOAD_MB` | Max upload file size (default `5`) |
| `SERVER_PUBLIC_URL` | Base URL prefixed onto uploaded file paths returned by the API |

Run it:

```bash
npm run dev      # nodemon, auto-restart
# or
npm start        # plain node
```

On first boot with an empty database, the server automatically creates the
default admin account (`ADMIN_DEFAULT_EMAIL` / `ADMIN_DEFAULT_PASSWORD`,
defaults to `admin@portfolio.com` / `Admin@123`) and empty `About` /
`Settings` singleton documents. You can also run this explicitly:

```bash
npm run seed
```

**Change the default admin password immediately after first login in production.**

The API is now live at `http://localhost:8080/api` (health check: `GET /api/health`).

## 2. Frontend setup

```bash
# from the project root
npm install
cp .env.example .env   # already points to http://localhost:8080/api
npm run dev
```

App runs at `http://localhost:5173`. Log in to the admin panel at
`/admin/login` with the seeded credentials above, then manage every section
(About, Skills, Projects, Experience, Education, Certifications, Reviews,
Blog, Social Links, Settings, Contact Messages) from `/admin/dashboard`.

## API overview

All responses follow `{ success, message, data }`. List endpoints for
Projects, Blogs, and Contact Messages are paginated
(`{ content, totalElements, totalPages, page, size }`); everything else
returns a plain array or object. Mutating endpoints (`POST`/`PUT`/`PATCH`/
`DELETE`), except `POST /api/contact`, require `Authorization: Bearer
<accessToken>`.

| Resource | Public | Admin (JWT) |
|---|---|---|
| `/api/auth/login`, `/api/auth/refresh` | ✅ | — |
| `/api/about` | `GET` | `PUT` |
| `/api/settings` | `GET` | `PUT` |
| `/api/skills`, `/api/skill-categories` | `GET` | `POST` `PUT` `DELETE` |
| `/api/projects`, `/api/projects/:slug` | `GET` | `POST` `PUT` `DELETE`, `POST /:id/images` |
| `/api/experience`, `/api/education`, `/api/certifications` | `GET` | `POST` `PUT` `DELETE` |
| `/api/reviews` (approved only) | `GET` | `GET /admin/all`, `POST` `PUT` `DELETE` |
| `/api/blogs`, `/api/blogs/:slug`, `/api/blogs/categories/all` | `GET` (published only) | `GET` (incl. drafts), `POST` `PUT` `DELETE` |
| `/api/social-links` | `GET` | `POST` `PUT` `DELETE` |
| `/api/contact` | `POST` | — |
| `/api/admin/contact-messages` | — | `GET`, `PATCH /:id/read`, `DELETE /:id` |
| `/api/admin/dashboard/stats` | — | `GET` |
| `/api/stats` | `GET` | — |
| `/api/upload/:type` | — | `POST` (multipart field `file`; types: `profile`, `resume`, `projects`, `blogs`, `reviews`, `certifications`, `misc`) |

## Deployment notes

- **Backend:** deploy to any Node host (Render, Railway, Fly.io, a VPS, etc.).
  Set all `.env` variables as real environment variables — never commit
  `.env`. Point `MONGO_URI` at your production MongoDB (Atlas recommended).
  Uploaded files are stored on local disk under `backend/uploads/`; for a
  multi-instance/ephemeral-disk deployment, mount a persistent volume or
  switch the storage layer to an object store (S3, etc.).
- **Frontend:** `npm run build` produces a static `dist/` folder — deploy it
  to any static host (Vercel, Netlify, S3+CloudFront). Set
  `VITE_API_BASE_URL` to your deployed backend's public `/api` URL at build
  time.
- **CORS:** set `CLIENT_ORIGIN` on the backend to your deployed frontend's
  origin(s) (comma-separated for multiple).
- Always rotate `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` and the default
  admin password before going to production.

## Notes

- The frontend UI/design is untouched — only its already-existing
  Axios service layer (`src/services/*`) is used, which was written against
  this exact API contract.
- Blog "categories" are derived from the distinct `category` values already
  in use across posts (there's no separate category-management screen in
  the frontend), keeping `/api/blogs/categories/all` accurate without extra
  unused admin UI.
