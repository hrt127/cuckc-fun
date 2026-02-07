# SIT OR SWIPE / $CUCKC – Master Project Overview  
snowziesk(👧,⛄) – @SnowziesK – February 2026, NL

This is the single source of truth for the chair cult project.  
Everything from idea birth → Chairs 101 thread → savage swipe app → Grok/Elon profiles → $CUCKC economy game is here.

## 1. Vision & Vibe (the manifesto)

Chairs aren’t furniture.  
They’re personalities, power symbols, back murderers, cultural time capsules, meme fuel, and CT emotional states.

We turn sitting into a cult:  
- Laugh until snort → quiet attachment → weird community → mild financial chaos (in a good way)  
- Motto rotation: “Your ass deserves better storytelling” / “demens prorsus et mente vesanus – but make it merch”

Core feeling: late-night group chat with mates who are 40% too online, 60% too passionate about nonsense.  
Saffa heart visible (riempie resilience, braai stoep joy) but never gatekeep – invite the world to the jol.

## 2. App Vision – Chair Swipe (current MVP)

**Name variants**: Chair Swipe / SIT OR SWIPE / cuckc-fun  
**Live**: https://cuckc-fun.vercel.app (staging)  
**Core loop**: Tinder swipe on personified chairs → physics throw → "SOLID!" / "WOBBLY" stamps → confetti + ding on match → collect avatars

**Current deck** (32+ profiles, savage bios):  
- Global icons: Thonet No.14, Wishbone CH24, Barcelona, Panton, Eames Lounge, Tulip  
- Saffa heritage: Riempie, Haldane Hula outdoor, Adirondack chill  
- Cursed/toxic: Monobloc immortal ex, RGB degen bro, Karen manager-summoner  
- X/Twitter archetypes: RatioRex, QuoteTweetQueen, DoomScroller, ThreadSitter, ChairChair ironic  
- Elon parody: ElonThrone, TeslaSeat, SpaceX Stool, Neuralink Chair, DogeChair  
- Grok/xAI parody: GrokPrime truth throne, HitchGrok 42 armchair, RebelGrok uncensored stool, MemeGrok doge fusion, TruthSitter black-hole chair

**Tech stack**  
- React (Vite) + Tailwind + lucide-react  
- react-spring + use-gesture → realistic drag/throw physics  
- Web Audio API → whoosh/ding  
- canvas-confetti → dopamine  
- LocalStorage → persist matches (phase 1)

**Features live**  
- Swipe gestures (touch/mouse)  
- Preview stack (next 2–3 cards scaled)  
- Bio expand/collapse  
- End screen: “Out of Seats, bru!” + avatars + restart

**Planned game layer**  
- Unlock rares via streaks  
- Chair Confessions (user crime stories)  
- Leaderboards (matches, savage nopes)  
- Events (Braai Week, Elon Week, Grok Roast)  
- Token integration (match → micro airdrop)

## 3. Token Vision – $CUCKC Economy Game

**Narrative**: “We turned sitting into a cult. Now sitting pays dividends.”

**Chain**: Solana (fast, meme-native) or Base (degen L2) – decide Q2 2026

**High-level tokenomics** (research-backed, anti-whale/bot/gaming)  
- Supply: 1B  
- Allocation: 40% community/matches, 20% LP, 20% team/vest, 10% marketing/braai, 10% burn treasury  
- Anti-whale: max tx % cap (e.g. 1–2%), dynamic sell tax scaling with wallet size  
- Anti-bot/snipe: launch with fair curve / anti-bot liquidity lock  
- Anti-gaming: quadratic voting on burns, reputation-weighted airdrops (no whale dominance), time-locked staking rewards

**Economy pillars** (tied to research)  
- Chair classes with stats (Status, Comfort, Durability, Degen-ness)  
  - Throne → high status/low risk  
  - Riempie → high durability/resilience  
  - Monobloc → unbreakable but low comfort  
  - RGB Gamer → high degen/high volatility  
  - Cuck Chair → spectator mode (watch others earn for X turns)  
- Resources: $CUCKC (main), Hopium (risk fuel), Copium (loss shield), Comfort Points (back-pain buffer)  
- States: King (passive yield), Degen (high-risk pumps), Cuck (forced spectate after rekt), Builder (collect sets for bonuses)  
- Actions: Swipe (stat shift + earn/loss), Upgrade (spend $CUCKC), Stake (yield), Flex (X share for community votes), Spectate (earn copium)  
- Loops: Earn → upgrade → climb → more $CUCKC | Risk → pump/rekt → cuck → cope/recover  
- Mindfuck resistance: reputation decay on whale dumps, quadratic airdrops, cuck mode as soft punishment, community burns

## 4. Repo Structure (updated for collab)

cuckc-fun/
├── public/                     # memes, OG images, favicons
├── src/
│   ├── components/             # Card, SwipeButtons, MatchAvatar...
│   ├── hooks/                  # useChairSwipe, useConfetti...
│   ├── data/
│   │   └── chairs.js           # 32+ savage profiles
│   ├── utils/
│   │   └── sounds.js           # whoosh/ding
│   └── App.jsx
├── docs/
│   ├── MANIFESTO.md            # batshit fun plan
│   ├── MASTER-OVERVIEW.md      # this doc
│   ├── ROADMAP.md
│   ├── TOKENOMICS.md
│   ├── CHAIR-SUBMISSION.md     # PR template
│   └── ARCHITECTURE.md
├── .github/workflows/          # Vercel deploy
├── README.md
├── CONTRIBUTING.md
└── package.json



**README highlights** (copy from previous, add live link + collab invite)

**CONTRIBUTING.md**  
"Add chairs via PR to chairs.js. Use template in docs/CHAIR-SUBMISSION.md. Also welcome: animations, token ideas, X promo memes."

## 5. Roadmap (current, Liam Neeson edition)

I will find you.  
I will swipe on you.  
I will match you with the chair that defines your soul – or reks you into cuck mode – and then we will turn that into $CUCKC dividends.

**Q1 2026 (now)**  
- Chairs 101 Article live (native X)  
- MVP v0.1 live (32+ profiles)  
- First X promo thread + poll

**Q2 2026**  
- Firebase → persistent matches/leaderboards  
- Wallet stub → mock airdrops  
- Community submissions (Form/PR)  
- Event: Grok/Elon Week

**Q3–Q4 2026**  
- $CUCKC launch (Solana/Base)  
- NFT badges on match  
- Telegram/Discord bot

**2027+**  
- IRL braai pop-ups  
- Chair DAO  
- Merch (riempie bags, "SOLID!" hoodies)

## 6. Next Immediate Moves (prioritized by your pattern style)

1. Publish Chairs 101 Article (native X, no-click)  
2. Record 15-sec vertical demo video → X post  
3. Add 5–10 more profiles (want me to generate?)  
4. Deploy current code if not live → share link  
5. Finalize $CUCKC chain/name → draft Pump.fun plan  
6. Open PRs for community chairs  
7. Start Telegram/Discord for cult members

Everything is here.  
Vision, code, docs, roadmap, economy depth – all in one place for collabs.

