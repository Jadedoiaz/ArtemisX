# 🚀 ArtemisX Deployment Guide

Use these steps to get ArtemisX running on the web and for commercial release.

---

## 🛠 Prerequisites

- Node.js 18+
- Git
- GitHub account with a repo created (https://github.com/Jadedoiaz/ArtemisX)

---

## 🧱 1. Upload Project to GitHub

1. Unzip `artemisx-full-project.zip` on your desktop
2. Go to https://github.com/Jadedoiaz/ArtemisX
3. Click “Add file → Upload files”
4. Drag all files/folders into the GitHub upload box
5. Click “Commit changes”

---

## 🌍 2. Deploy to Vercel

1. Visit https://vercel.com/import
2. Import your GitHub repo: `Jadedoiaz/ArtemisX`
3. Click “Deploy”

Your app will be live in a few minutes.

---

## 🛒 3. Sell on Gumroad

1. Create an account at https://gumroad.com
2. Add a new product → Upload the `artemisx-full-project.zip`
3. Use content from `marketing.md` for the product description
4. Set a license key, price, and publish

---

## 🧪 4. Run Locally

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000`

---

## 🧠 Bump Scripts

- Solana: `lib/bump.ts`
- BSC: `lib/bump-bsc.ts`
- CLI: `bump-cli.ts`

---

## 📦 Folder Overview

```
├── pages/                  # App pages
├── components/             # Solana wallet wrapper
├── lib/                    # Bump logic
├── styles/                 # Tailwind CSS
├── bump-cli.ts             # Terminal fallback
├── Dockerfile              # Deployment container
├── package.json            # Dependencies
```

---

Happy bumping,
The ArtemisX Team
