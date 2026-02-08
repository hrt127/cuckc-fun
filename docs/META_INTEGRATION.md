# META_INTEGRATION – 2026 Solana / Meme / AI Flavor

Goal: Make Cuckc-Fun feel native to the 2026 Solana + meme + AI meta without overbuilding. Chairs become living meme-coin archetypes; swipes feel like a market poll.

## 1. Chair Data Changes

Update `src/data/chairs.json` to add meta-aware fields:

- `chain_meta`:
  - Example values:
    - "PUMPFUN_SPAWN"        # hyper-degen, 0 to 1e6 dreams.
    - "DOGE_BOOMER"          # old but still moves the market.
    - "SOL_NARRATIVE_RIDER"  # rides Solana rotation.
    - "AI_OVERFITTED"        # AI + meme mashup.
- `meme_tags`:
  - Short tags like ["wif", "bonk", "pepe", "elon", "pumpfun"].
- `market_archetype`:
  - Example: "whale", "grinder", "degen", "exit_liquidity".

Every chair doesn’t need all of these, but each should have at least `market_archetype` and 1–2 `meme_tags`.

## 2. UI Copy & Flavor

In `src/App.jsx` (or relevant components):

- Show 2–3 meta stats per chair:
  - Example UI line:
    - `Archetype: Degen • Chain: Pump.fun Spawn • Tags: wif, bonk`
- Add a small rotating one-liner bank keyed to the meta:
  - Examples:
    - "Launched at 3am on Pump.fun and still thinks it’s early."
    - "This chair has survived more rotations than DOGE threads."
    - "Built like a VC bag: overengineered, underperforming."
    - "Comfort 2/10, meme potential 10/10."

Keep all lines short enough to screenshot cleanly.

## 3. Swipe-as-Market Poll

Instrument (even if only in logs for now):

- After each swipe, record:
  - chair_id
  - verdict: "SOLID" or "WOBBLY"
  - timestamp
- Aggregate periodically (or on load):
  - % SOLID vs WOBBLY per chair.
  - Global SOLID/WOBBLY ratio.

Optional UI element:

- Tiny banner or stat:
  - "This week’s market: 68% of chairs judged WOBBLY → degen season energy."
  - "Top 3 SOLID chairs: [names]."

Implementation detail: you can log to a local JSON or NDJSON file later; for now, keep the aggregation in-memory but design the data shape.

## 4. AI Touch (Gemini) Without Overkill

Use Gemini to enhance flavor, not run the game:

- One-click “Roast / Shill this chair” button:
  - On click:
    - Send a small prompt with chair stats + tags.
    - Get back a 1–2 sentence roast or hype.
  - Cache the result for that chair in memory so repeated clicks don’t spam the API.
- Guardrails:
  - Only trigger on explicit user click (no auto-requests).
  - Handle no-key / error cases:
    - Show "Wing-Chair is offline (no API or rate limit)" and continue as normal.

## 5. Future Token Hook (Soft)

No chain work now, just framing:

- In UI, add a non-binding stat:
  - "Chair Taste Index" or "Cult Score (future $CUCKC alignment)."
- Copy examples:
  - "Your Chair Taste Index: 7.3 – might matter when sitting starts paying."
  - "Swipes now, dividends later (no promises, just vibes)."

All on-chain / token promises must stay in docs (TOKENOMICS.md) until actually built. UI should hint, not guarantee.

---

This file is a design guide only. Actual implementation will touch:

- `src/data/chairs.json`
- `src/App.jsx` (or internal components)
- Gemini integration module (wherever Wing-Chair is wired)
