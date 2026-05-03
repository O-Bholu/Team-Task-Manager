# Team Task Manager Frontend

React + Vite frontend for the Team Task Manager app.

## Tech

- React (Vite)
- Axios
- React Router DOM
- Context API
- Tailwind CSS

## Folder Structure

src/
- components/
- pages/
- services/
- context/
- routes/
- utils/

## API Base URL

Configured in `src/services/api.js`:

- http://localhost:8080

## Run

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

## Auth Flow

- Login calls `/auth/login`
- Token is saved to localStorage
- Axios interceptor attaches token in `Authorization` header
- Role is decoded from JWT and stored in AuthContext

## Implemented Pages

- LoginPage
- SignupPage
- DashboardPage
- ProjectsPage
- TasksPage

## Notes

- Add-member UI calls `POST /projects/{id}/members`.
- If this endpoint is not yet implemented in backend, the page shows an informative error.
