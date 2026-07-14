# ReWorth — AI Waste Detector Website

A static, dependency-free site (plain HTML/CSS/JS) — no build step, so it deploys anywhere in minutes.

## Structure
```
reworth/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── icons.js      # self-contained inline SVG icons (no icon-font CDN)
│   └── script.js      # i18n (EN/TA), theme toggle, detector demo, auth modal, etc.
└── README.md
```

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
npx serve .
```

## Deploy on GitHub Pages
1. Push this folder to a GitHub repo (root, or a `/docs` folder).
2. Repo → **Settings → Pages** → set source to your branch / folder.
3. Your site is live at `https://<username>.github.io/<repo>/`.

## Deploy on Vercel
1. `npm i -g vercel` (or just use the Vercel dashboard → "Add New Project" → import the repo).
2. From the folder: `vercel` → accept defaults (it's a static site, no framework/build command needed).
3. `vercel --prod` to ship it.

## Features
- **Bilingual** — English ⇄ தமிழ் toggle in the navbar/footer, drives every string via `data-i18n` attributes in `script.js`.
- **Light / dark mode** — toggle button in the navbar, swaps a full CSS custom-property palette (`css/style.css`, look for `html[data-theme="dark"]`).
- **AI Waste Detector demo** — camera capture (`getUserMedia`) or file upload, with a simulated on-device "analysis" that returns one of 10 material categories with confidence, recycling steps, reuse ideas, and impact notes. Swap `runDetection()` in `js/script.js` for a real model/API call when you're ready.
- **Sign in / Sign up** — a client-side modal (no backend). Wire the two `<form>` submit handlers in `auth.init()` up to your real auth provider (Supabase, Firebase, Auth0, your own API, etc.) when you deploy.
- **Contact form** — currently just shows a success state client-side. Point it at Formspree, a serverless function, or your API.

## Notes for going further
- **Persistence**: theme/language/session are kept in memory only (reset on reload) so the file previews safely everywhere, including inside chat tools. Once deployed for real, you can persist them with `localStorage`, e.g.:
  ```js
  localStorage.setItem('reworth-theme', theme);
  const saved = localStorage.getItem('reworth-theme');
  ```
- **Images**: hero/gallery photography is pulled from Pexels (free to use, no attribution required, see pexels.com/license). Swap in your own product photography whenever you like — just replace the `<img src="...">` URLs.
- **Real AI model**: to wire up an actual vision model, replace the `runDetection()` function in `js/script.js` with a `fetch()` call to your inference endpoint (e.g. a Claude API call with an image input, or a custom-trained classifier).
