# Portfolio Management System — Frontend

React 19 + Vite + Tailwind CSS (utility classes only) + Framer Motion

## Setup

```bash
npm install
cp .env.example .env
# edit .env -> VITE_API_BASE_URL=http://localhost:8080/api
npm run dev
```

App runs at `http://localhost:5173`.

## Structure

- `src/pages` — public site pages (Home composes all sections from `src/pages/sections`)
- `src/admin` — admin panel (login, dashboard, CRUD pages under `admin/pages`, reusable `DataTable`/`FormModal` under `admin/components`)
- `src/services` — one Axios-based service module per backend REST module
- `src/context` — Theme (dark/light) and Auth (JWT) React Context providers
- `src/components` — shared UI (buttons, cards, common utilities, hero, timeline)

## Admin Login

Default seeded backend admin:
- Email: `admin@portfolio.com`
- Password: `Admin@123`

Visit `/admin/login` to sign in, then manage every section of the site from `/admin/dashboard`.

## Notes

- All content is fetched live from the Spring Boot backend — nothing is hardcoded.
- Dark mode is the default theme (matches the reference design); toggle via the navbar.
- File uploads (profile photo, resume, project/blog images) go through the backend's `/api/upload/{type}` endpoint via `FileUploader`.
