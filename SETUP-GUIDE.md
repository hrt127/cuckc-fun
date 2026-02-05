# CUCKC.FUN - Complete Setup Guide

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account (hrt127)
- Vercel account (linked to GitHub)

---

## Local Development Setup

### 1. Clone & Install

```bash
cd ~/dojo/projects
git clone https://github.com/hrt127/cuckc-fun.git
cd cuckc-fun

# Install dependencies
npm install
```

### 2. Run Local Dev Server

```bash
npm run dev
```

Opens at `http://localhost:3000`

Hot reload enabled - changes reflect instantly.

### 3. Build for Production

```bash
npm run build
```

Output in `/dist` folder (optimized, minified, ready to deploy).

---

## Deployment

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login with GitHub
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

**First deploy:**
- Project name: `cuckc-fun`
- Framework: Vite
- Build command: `vite build`
- Output directory: `dist`

**Subsequent deploys:**
```bash
git add .
git commit -m "feat: add new chair profiles"
git push origin main
# Auto-deploys to Vercel
```

### Option 2: Vercel GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Import `hrt127/cuckc-fun` repo
3. Auto-deploys on every push to `main`

---

## Domain Configuration

### Buy Domain

1. Go to [namecheap.com](https://namecheap.com)
2. Search: `cuckc.fun`
3. Buy (~$4/year)
4. Complete registration

### Connect to Vercel

**In Vercel Dashboard:**
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter `cuckc.fun`
4. Follow DNS instructions

**In Namecheap:**
1. Go to Domain List → Manage
2. Advanced DNS → Add Records:
   - Type: `CNAME`
   - Host: `@`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic

3. Add second record:
   - Type: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic

**Wait 5-60 minutes for DNS propagation.**

Verify at: `https://cuckc.fun`

---

## Project Structure

```
cuckc-fun/
├── index.html              # Current working app (v0.1)
├── package.json
├── vite.config.js
├── .gitignore
│
├── src/                    # Refactored React structure (v0.2+)
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── data/
│   ├── hooks/
│   └── utils/
│
├── public/
│   └── assets/
│
└── docs/
    ├── PITCH.md
    ├── ROADMAP.md
    └── TOKENOMICS.md
```

---

## Development Workflow

### Adding New Chair Profiles

1. Edit `src/data/chairs.js`
2. Add new chair object:
```javascript
{
  id: 12,
  type: 'fuckboy',
  name: "Brad",
  model: "Bar Stool Basic",
  age: 3,
  bio: "Just here for a good time. 🍻",
  hobbies: ["Pubs", "Sports", "Being Wobbly"],
  location: "Every Dive Bar",
  image: "https://images.unsplash.com/...",
  tags: ["#DTF"],
  vibe: "Casual, Low Effort, Forgettable"
}
```
3. Test locally: `npm run dev`
4. Commit: `git commit -m "feat: add Brad bar stool"`
5. Push: `git push` (auto-deploys)

### Adding Sound Effects

1. Edit `src/utils/sounds.js`
2. Add new sound function:
```javascript
export const playFart = (audioCtx) => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
};
```
3. Import in `App.jsx` and trigger on reject

---

## Testing

### Local Testing
```bash
npm run dev
# Test in browser
```

### Production Build Testing
```bash
npm run build
npm run preview
# Opens production build locally
```

### Mobile Testing
```bash
npm run dev
# Get local IP: ifconfig (Linux) or ipconfig (Windows)
# Access from phone: http://192.168.x.x:3000
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run preview          # Preview prod build locally

# Deployment
vercel                   # Deploy to staging
vercel --prod            # Deploy to production

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub (triggers deploy)

# Dependencies
npm install              # Install all deps
npm install [package]    # Add new package
npm update               # Update all packages
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Vercel Deploy Fails
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - Build command incorrect
# - Node version mismatch
```

### Domain Not Working
```bash
# Check DNS propagation
dig cuckc.fun

# Verify CNAME records in Namecheap
# Wait up to 24h (usually 5-60min)
```

---

## Environment Variables (Future)

When adding backend/token integration:

Create `.env` file:
```bash
VITE_API_URL=https://api.cuckc.fun
VITE_WALLET_CONNECT_ID=your_id
VITE_CHAIN_ID=8453  # Base mainnet
```

Add to `.gitignore`:
```
.env
.env.local
```

Add to Vercel:
Project Settings → Environment Variables

---

## Next Steps

1. ✅ Local dev working
2. ✅ Deployed to Vercel staging
3. ⏳ Buy cuckc.fun domain
4. ⏳ Connect domain to Vercel
5. ⏳ Share with friend for feedback
6. 🚧 Add 30 chair profiles
7. 🚧 Implement sound effects
8. 🚧 Design token economics

---

## Support

**Issues:** [github.com/hrt127/cuckc-fun/issues](https://github.com/hrt127/cuckc-fun/issues)

**Questions:** Comment in relevant file or create discussion

**Emergency:** Break something? Revert last commit:
```bash
git revert HEAD
git push
```

---

Built with chaos and chairs.  
🪑 cuckc.fun
