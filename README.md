# Make My Wedding (Mumbai)

Full‑stack wedding venue directory for Mumbai with a WedMeGood‑style homepage: locality search, venue cards with pricing, and a one‑click caterers list.

## Tech

- `client/`: React + Vite + TypeScript + Tailwind
- `server/`: Node.js + Express + TypeScript + Swagger UI ("Inspect tools" for the backend)

## Run locally

### Backend

```bash
cd server
npm install
npm run dev
```

- API: `http://localhost:4000/api`
- Swagger UI: `http://localhost:4000/api/docs`
- Inspect endpoint: `http://localhost:4000/api/inspect`

### Frontend

```bash
cd client
npm install
npm run dev
```

Open: `http://localhost:5173`

## API quick reference

- `GET /api/localities`
- `GET /api/venues?locality=Andheri%20West&q=banquet&sort=price_asc`
- `GET /api/caterers?locality=Bandra%20West`
- `GET /api/inspect`

