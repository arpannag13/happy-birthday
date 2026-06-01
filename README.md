# Happy Birthday Joyita 🎉

A warm, cheerful, celebration-themed single-page birthday website built with **React + Vite**, **Framer Motion**, and **React Icons**. Vibrant blue / gold / white palette with soft orange accents.

## ✨ Features

- **Hero** — full-screen festive gradient with an animated birthday cake, letter-by-letter animated title, subtitle, party streamers, rising balloons, and an "Open Your Surprise" button that fires confetti.
- **Photo Gallery** — celebration scrapbook of polaroid-style photo cards with playful rotations, hover lift, scroll fade-ins, and a full-screen lightbox (keyboard ◀ ▶ / Esc support).
- **Birthday Messages** — animated glassmorphism wish cards.
- **Special Letter** — handwritten-style letter with a typewriter effect triggered on scroll.
- **Animations** — balloons, streamers, sparkles around headings, scroll-triggered reveals, and confetti bursts on load.
- **Music** — fixed bottom-right play/pause player (`/public/music/birthday.mp3`).
- **Final Section** — big animated closing line with balloons + confetti + sparkle celebration.

## 🛠 Tech Stack

- React 18 + Vite 5
- Framer Motion (animations)
- React Icons
- CSS Modules + a small global stylesheet

## 🚀 Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

## 🖼 Add Your Own Content

1. **Photos** — drop `photo-1.jpg` … `photo-15.jpg` into `public/images/`.
   (Until then, tasteful placeholder images load automatically.)
2. **Music** — add `birthday.mp3` to `public/music/`.
3. **Text** — edit messages in `src/App.jsx` and the letter in `src/components/Letter.jsx`.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx
│   ├── Gallery.jsx
│   ├── MessageCard.jsx
│   ├── Letter.jsx
│   ├── MusicPlayer.jsx
│   ├── Balloons.jsx
│   ├── Streamers.jsx
│   ├── Cake.jsx
│   ├── FinalSection.jsx
│   ├── Confetti.jsx
│   └── Sparkles.jsx
├── data/
│   └── photos.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## 🚢 Deploy to GitHub Pages

Live URL: **https://arpannag13.github.io/happy-birthday/**

This repo is configured for GitHub Pages with `base: '/happy-birthday/'` in `vite.config.js`,
and all runtime asset paths use `import.meta.env.BASE_URL` so images and music resolve correctly.

**Option A — Automatic (GitHub Actions, recommended)**

1. In the repo on GitHub, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` builds with Node 20 and deploys `dist/` automatically.

**Option B — Manual (gh-pages branch)**

```bash
npm run deploy   # runs predeploy (build) then publishes dist/ to the gh-pages branch
```

If using Option B, set **Settings → Pages → Source** to the `gh-pages` branch.
