# High Coherence - Claude Instructions

## Context7 Usage
Always use context7 when I need code generation, setup or configuration steps, or
library/API documentation. This means you should automatically use the Context7 MCP
tools to resolve library id and get library docs without me having to explicitly ask.

## Project Overview
- **Framework:** Nuxt 4 (Vue 3) with Nitro backend
- **UI:** @nuxt/ui with Lucide icons
- **Dev Server:** http://localhost:3000/
- **Related Draft:** `crate-cohere-app(draft)` folder has React/Vite prototype with UI designs

## Troubleshooting

### Nuxt dev server hangs silently (no output after "nuxt dev")
**Symptoms:** Running `npm run dev` shows `> nuxt dev` but nothing happens—no server URL, no errors.

**Cause:** Interactive prompts (like Nuxt telemetry) blocking in non-TTY environment.

**Fix:**
```bash
# Option 1: Clear cache and run with CI flag
rm -rf .nuxt node_modules && npm install
CI=true npm run dev

# Option 2: Just run with CI flag (if already installed)
CI=true npm run dev
```

**Prevention:** Add `NUXT_TELEMETRY_DISABLED=1` to your environment or run with `CI=true`.