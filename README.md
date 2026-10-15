# BookShelf Manager (MERN)

Manage a personal reading list. React + Tailwind frontend, Express + MongoDB backend.

## Run locally

### Backend
```
cd backend
npm install
cp .env.example .env     # set MONGO_URI (local or Atlas)
npm run seed             # optional: add sample books
npm run dev              # http://localhost:5000
```

### Frontend
```
cd frontend
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000
npm run dev              # http://localhost:5173
```

## MongoDB Atlas notes
- Add your IP under **Security → Network Access** (use `0.0.0.0/0` for testing/deployment).
- Put the database name in the URI: `...mongodb.net/bookshelf?retryWrites=true&w=majority`
- URL-encode special characters in the password (`@ # / :`).
- `TLSV1_ALERT_INTERNAL_ERROR` / SSL alert 80 usually means your IP is not allowed.

## API
| Method | Route | Purpose |
|---|---|---|
| POST | /books | Add book `{ title, author }` |
| GET | /books | Get all books |
| PUT | /books/:id | Mark as read |
| DELETE | /books/:id | Delete book |

Book JSON: `{ id, title, author, status, createdAt }`
Errors: `400` empty fields / invalid id, `404` not found, `500` server error.

## Deploy
1. **Database:** create a free MongoDB Atlas cluster, copy the connection string.
2. **Backend (Render):** New Web Service, root `backend`, build `npm install`, start `npm start`, env var `MONGO_URI`.
3. **Frontend (Vercel):** import repo, root `frontend`, env var `VITE_API_URL` = your Render URL.
4. Optional: restrict CORS in `server.js` to your Vercel URL.
5. Push everything to GitHub (never commit `.env`) and submit the repo link + live link.
