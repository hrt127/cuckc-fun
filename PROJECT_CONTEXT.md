# CUCKC / SIT OR SWIPE - Project Context

## What
"Sit or Swipe" is a 32-chair deck sports/fun UI hooked into Heart's world.
It serves as the meme-economy game for the $CUCKC token and the Chair Cult.

## Truth Locations (Dojo Spec)
Conceptual structure and game rules live in the Dojo Knowledge Vault:

- **Game Design**: `~/dojo/knowledge/threads/cuckc_fun_structure.txt`
- **Development Log**: `~/dojo/knowledge/threads/cuckc_fun_dev_log.txt`
- **App Dev Log**: `~/dojo/knowledge/threads/app_dev_log.txt`

## Policy
1. **View Only**: This React app is a *view* of the concepts defined in the threads above. It can be rebuilt or replaced as long as it adheres to those specs.
2. **No Business Logic Silos**: Core game rules (economics, drop rates) should be documented in the threads, not buried solely in React components.

## Node / npm Policy (Cuckc-Fun)
This project may freely use `npm install` locally in `~/dojo/projects/cuckc-fun` to populate `node_modules` and update `package-lock.json`.

**Constraints**:
- **Global Installs**: Global `npm install -g` and Node version changes must follow `~/dojo/system/SYSTEM_STATE.md` and are not to be done ad-hoc.
- **Dependency Issues**: If npm registry errors occur (ETIMEDOUT):
  1. Retry with higher timeouts.
  2. Prefer code changes (e.g., inline SVGs instead of icons packages).
  3. Log decisions in `~/dojo/knowledge/threads/cuckc_fun_dev_log.txt`.

## Meta Integration (Feb 2026)
- **Data**: Chairs now have `market_archetype` (whale, degen, etc), `chain_meta`, and `meme_tags` fields in `chairs.json`.
- **UI**: Displays meta stats (Archetype, Chain, Tags) and a "Taste Index" (session-based SOLID % score).
- **AI**: Wing-Chair feature is now "Roast/Shill" (optional, free-tier) using Gemini.
- **Instrumentation**: Swipe data (SOLID vs WOBBLY) is tracked in-memory for session stats.
