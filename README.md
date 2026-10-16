# 0 → Shipped · resume parser

- `frontend/` — React + Vite landing page: upload a resume PDF, paste a job
  description, see the score + present/missing skills.
- `backend/` — Express + MongoDB API. Receives the PDF (`multipart/form-data`,
  field `resume`) and the JD (field `jd`), saves the review, returns the score.
- Scoring is a deterministic mock for now — the AI comparison comes later
  (see `DECISION.md`).

## Run

```bash
# 1) backend
cd backend
npm install
create .env with:  PORT=4000  and  MONGODB_URI=mongodb://127.0.0.1:27017/zero_shipper
npm run dev               # → API on http://localhost:4000

# 2) frontend (new terminal)
cd frontend
npm install
npm run dev               # → http://localhost:5173
```

Without MongoDB running the API still responds — reviews just aren't saved
(`saved: false`), and the frontend falls back to its local mock if the
backend isn't running at all.
