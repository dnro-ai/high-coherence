# Changelog

## 2026-01-29 - Logo Updates & Modal Light Mode

### Logo & Branding
- **New Logo:** Replaced with `HighCoherence_logo.svg` in sidebar and login
- **Collapsed State:** Added `HC_Squares_logomark.svg` when sidebar is collapsed
- **Alignment:** Logo now left-aligned with navigation icons, sized to 63%

### Typography
- **Dashboard Greeting:** Changed "Good Morning, Alex" to Saol Display Semibold font
- **Header Icons:** Reduced stroke width to 1.5pt for thinner appearance

### Light Mode Enhancements
- **Background:** Increased contrast with darker gray gradient (`#d5d8dc` range)
- **Modals (GoalDetailModal, NewGoalModal, PulseCheck):**
  - Now fully theme-aware with white backgrounds in light mode
  - Updated text, inputs, buttons, and mood pills for proper contrast
  - Added scrolling support with `max-h-[85vh] overflow-y-auto`

### Fonts
- Added Saol Display font family (Semibold, Medium, Regular Italic)

---

## 2026-01-28 - Light Mode Refinements

### Visual Updates
- **Light Mode Background:**
  - Updated gradient to a subtler light gray approach: `start: #f1f2f5`, `mid: #f4f5f7`, `end: #eef0f3`.
- **Glass Transparency:**
  - Fixed issue where light mode panels appeared solid white.
  - Removed aggressive `bg-white/X` overrides in light mode.
  - Reduced utility opacity (`bg-white/10` -> `0.1 opacity`) for a cleaner, frosted look.
- **Typography:**
  - Swapped `PP Valve` for `Fabriga Medium` on all main headings (`h1`, `h2`, `h3`).

### Layout & UI
- **Header Positioning:**
  - Moved sidebar toggle and theme toggle icons to the top-left of the main content area (above "Good Morning").
  - Nudged the entire main content area up by ~10px matching the new icon placement.
  - Sidebar header is now cleaner in collapsed state (simple 'C' icon).

### Fixes
- Resolved issue with missing `high-coherence-icon.png` in collapsed sidebar state.
