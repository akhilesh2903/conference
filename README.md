# IC-MEMS 2027 frontend

The public conference website for the International Conference on Materials, Energy and Management for Sustainability, organised by Alva's Institute of Engineering and Technology.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify before hosting

```bash
npm run lint
npm run build
```

## Deploy on Vercel

1. Import the repository into Vercel.
2. Set the project root to `icmems-frontend`.
3. Keep the framework preset as **Next.js**.
4. Deploy with the default build command, `npm run build`.

The backend is a separate Express service in `../icmems-backend`. Set its deployed URL in the frontend API calls when registration and submission endpoints are connected.
