# 🌸 Blooming Journal

A beautiful, creative journaling app. Write freely, customize your page, then receive a personalized flower and quote that reflects your entry — powered by Claude AI.

## ✨ Features

- **10 paper styles** — lined, dotted, grid, vintage, rose, forest, midnight, kraft, watercolor, blank
- **11 fonts** — Satisfy, Dancing Script, Caveat, Kalam, Playfair, Lora, Crimson, DM Serif, Special Elite, Courier Prime, Patrick Hand
- **14 text colors** with bold, italic, and alignment controls
- **32 draggable stickers** — emoji you can drop and move anywhere on the page
- **Photo uploads** — add and resize your own images on the journal page
- **AI flower match** — Claude reads your entry and picks a flower (rose, sunflower, lotus, lavender, daisy, cherry blossom) with a resonant quote and personal reflection
- **Email your bloom** — optionally receive your flower and quote by email

## 🚀 Getting started

```bash
git clone https://github.com/your-username/blooming-journal.git
cd blooming-journal
npm install
npm run dev
```

App runs at `http://localhost:5173`.

> The AI features use the Anthropic API. Inside Claude.ai the proxy is automatic. For standalone deployment, see below.

## 🌐 Standalone deployment

Add your Anthropic API key to `src/utils/api.js`:

```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_API_KEY',
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true', // dev only
}
```

For production, route requests through a backend proxy instead of exposing the key.

### Deploy to Vercel / Netlify

```bash
npm run build
# connect your repo or upload dist/
```

## 📁 Structure

```
src/
  components/
    BloomResult.jsx      — Result screen: flower, quote, email
    FlowerSVG.jsx        — SVG flower illustrations
    PaperBackground.jsx  — Paper textures + line/dot/grid overlays
    PaperSelector.jsx    — Paper type picker
    StickerOverlay.jsx   — Draggable sticker system
    Toolbar.jsx          — Font, size, color, formatting controls
  data/
    journalData.js       — All config: papers, fonts, colors, stickers, flowers
  utils/
    api.js               — Claude API call
  App.jsx                — Main editor
```

## 🔧 Customizing

- **More flowers:** Add to `FLOWER_DATA` in `journalData.js` + `FlowerSVG.jsx`
- **More stickers:** Add to `STICKERS` array in `journalData.js`
- **More fonts:** Add to `FONTS` + load the font in `index.html`
- **More paper types:** Add to `PAPER_TYPES` in `journalData.js`

---

Built with React + Vite + Claude AI 🌸
