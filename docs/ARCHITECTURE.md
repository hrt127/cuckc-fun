# SIT OR SWIPE – Architecture Overview

**Frontend**
- React (Vite) + Tailwind + lucide-react
- react-spring/web + use-gesture/react → drag/throw physics
- Web Audio API → whoosh/ding
- canvas-confetti → match burst
- LocalStorage → persist matches (phase 1)

**Data**
- Static array in src/data/chairs.js (32+ profiles)

**Future**
- Phase 2: Firebase / Supabase (persistent matches, leaderboards, user auth)
- Phase 3: WalletConnect + Solana/Base ($CUCKC integration)

**Deployment**
- Vercel (auto from GitHub main)

**Final folder layout reminder**

cuckc-fun/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── data/
│   │   └── chairs.js           ← paste all 32+ profiles here
│   ├── utils/
│   └── App.jsx
├── docs/
│   ├── MANIFESTO.md
│   ├── MASTER-OVERVIEW.md      ← the big one
│   ├── ROADMAP.md
│   ├── TOKENOMICS.md
│   ├── CHAIR-SUBMISSION.md
│   └── ARCHITECTURE.md
├── .github/workflows/
├── README.md
├── CONTRIBUTING.md
└── package.json
