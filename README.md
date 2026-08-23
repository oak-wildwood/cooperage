# cooperage

Personal dev portfolio for Oak Cooper — a ground-up rebuild of [oakcooper.com](https://oakcooper.com),
moving off a 2020-era Gatsby 2 site.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Deployed on **Vercel**

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` for local development. Real values are set in
Vercel project settings — no secrets are committed to this repo.
