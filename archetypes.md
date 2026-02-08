# High Coherence -- Archetype System

This document describes all 18 archetypes in the High Coherence platform, organized by category. The archetype system is derived from cross-cultural mythology, Pankseppian affective neuroscience, and Active Inference theory.

**Source files:**
- `app/data/archetypes.ts` -- Complete archetype definitions
- `app/types/archetype.ts` -- Type definitions and category metadata
- `app/services/archetype-detector.ts` -- Detection and scoring logic

---

## Overview

### Categories

Each archetype belongs to one of three categories that map to a system function and a CAT dimension:

| Category    | System Role | CAT Dimension | Focus                          |
|-------------|-------------|---------------|--------------------------------|
| **STATIC**  | Container   | Clarity       | Stability and Safety           |
| **DYNAMIC** | Engine      | Agency        | Movement and Growth            |
| **UPDATER** | Pivot       | Trust         | Transformation and Resilience  |

### Coherence States

Every archetype expresses differently depending on the user's coherence state:

| State    | Expression                                                     |
|----------|----------------------------------------------------------------|
| **HIGH** | Integrated, highest expression -- archetype's gifts fully realized |
| **BASE** | Functional, everyday expression -- competent and reliable      |
| **LOW**  | Shadow expression -- archetype's distortion or dysfunction     |

### Reading the Entries

Each archetype entry below includes:
- **Name** and **function** -- what the archetype does
- **Primary affects** -- Pankseppian emotional systems that drive this archetype
- **Three states** -- HIGH, BASE, and LOW expressions with labels and descriptions
- **HEXACO correlates** -- personality trait weights used for detection (range: -1 to +1)

---

## STATIC Category -- Container / Clarity / Stability and Safety

The six STATIC archetypes provide structure, boundaries, and safety. They are the containers that hold things together.

---

### 1. The Architect

| | |
|---|---|
| **ID** | `architect` |
| **Function** | Builds systems for the future |
| **Primary Affects** | CARE, SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Visionary Builder | Creates elegant, lasting systems that serve others and stand the test of time. Balances perfection with pragmatism. Builds cathedrals. |
| **BASE** | The Systems Thinker | Competent organizer who designs structures and processes. Reliable planner. Gets things built. |
| **LOW** | The Perfectionist | Analysis paralysis. Never ships. Rigid controller who mistakes the map for the territory. Builds prisons. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Conscientiousness | +0.8 |
| Openness | +0.8 |
| Honesty-Humility | +0.5 |

---

### 2. The Guardian

| | |
|---|---|
| **ID** | `guardian` |
| **Function** | Protects boundaries and maintains safety |
| **Primary Affects** | RAGE, FEAR |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Wise Protector | Knows what's worth defending and what to let go. Holds boundaries with strength and discernment. Shields without smothering. |
| **BASE** | The Watchkeeper | Reliable defender of people and principles. Maintains safety. Holds the line when needed. |
| **LOW** | The Paranoid | Sees threats everywhere. Walls everyone out. Controlling. Mistakes vigilance for wisdom. Builds fortresses against imaginary enemies. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Conscientiousness | +0.8 |
| Honesty-Humility | +0.5 |
| Agreeableness | -0.6 |

---

### 3. The Nurturer

| | |
|---|---|
| **ID** | `nurturer` |
| **Function** | Tends bonds and cares for others |
| **Primary Affects** | CARE |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Empowering Caregiver | Gives in ways that strengthen others' autonomy. Nurtures growth, not dependency. Loves without losing self. |
| **BASE** | The Warm Presence | Supportive, attentive to others' needs. Creates comfort and belonging. Takes care of people. |
| **LOW** | The Martyr | Codependent. Gives to control or to be needed. Resentful when unreciprocated. Loses self in others' needs. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Agreeableness | +0.8 |
| Honesty-Humility | +0.5 |

---

### 4. The Steward

| | |
|---|---|
| **ID** | `steward` |
| **Function** | Preserves resources and maintains value |
| **Primary Affects** | CARE, FEAR |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Wise Keeper | Ensures sustainability for all. Manages resources with long-term vision. Preserves what matters, releases what doesn't. |
| **BASE** | The Responsible Manager | Reliable custodian of resources, systems, and assets. Maintains what's been built. Keeps the lights on. |
| **LOW** | The Hoarder | Scarcity mindset. Hoards resources. Penny-wise, pound-foolish. Blocks investment out of fear. Confuses frugality with wisdom. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Honesty-Humility | +0.8 |
| Conscientiousness | +0.8 |
| Emotionality | +0.5 |

---

### 5. The Teacher

| | |
|---|---|
| **ID** | `teacher` |
| **Function** | Transmits truth and clarifies understanding |
| **Primary Affects** | CARE, SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Illuminator | Empowers others to think for themselves. Transmits wisdom that transforms. Makes the complex clear and alive. |
| **BASE** | The Clear Explainer | Patient instructor. Shares knowledge effectively. Helps others understand and grow. |
| **LOW** | The Indoctrinator | Dogmatic. Preachy. "I know better than you." Confuses teaching with controlling. Creates followers, not thinkers. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Conscientiousness | +0.8 |
| Openness | +0.8 |
| Honesty-Humility | +0.5 |
| Agreeableness | +0.5 |

---

### 6. The Tamer

| | |
|---|---|
| **ID** | `tamer` |
| **Function** | Gentles through presence, calms chaos |
| **Primary Affects** | CARE, PLAY |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Peaceful Warrior | Powerful stillness that transforms tension without force. Courage through patience. Tames lions with presence, not dominance. |
| **BASE** | The Calm Presence | De-escalates naturally. Brings groundedness to chaotic situations. Steady in the storm. |
| **LOW** | The Doormat | Passive. Conflict-avoidant at all costs. Peace-at-any-price. Enables dysfunction by refusing to engage. Mistakes numbness for serenity. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Agreeableness | +0.8 |
| Honesty-Humility | +0.5 |
| Openness | +0.5 |
| Emotionality | -0.6 |

---

## DYNAMIC Category -- Engine / Agency / Movement and Growth

The six DYNAMIC archetypes drive action, exploration, and change. They are the engines that create forward movement.

---

### 7. The Pioneer

| | |
|---|---|
| **ID** | `pioneer` |
| **Function** | Explores unknown territory, breaks new ground |
| **Primary Affects** | SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Trailblazer | Courageous explorer who opens frontiers for others to follow. Breaks new ground with purpose. Adventure in service of discovery. |
| **BASE** | The Adventurer | Pushes into new territory. Comfortable with uncertainty. Keeps things moving forward. |
| **LOW** | The Escapist | Can't commit. Always chasing the next horizon. Abandons what's built. Mistakes running from for running toward. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Extraversion | +0.8 |
| Openness | +0.8 |
| Emotionality | -0.6 |

---

### 8. The Strategist

| | |
|---|---|
| **ID** | `strategist` |
| **Function** | Maps optimal paths and calculates routes |
| **Primary Affects** | SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Master Navigator | Finds the path no one else sees. Brilliant tactical and strategic mind in service of meaningful goals. |
| **BASE** | The Effective Planner | Calculates routes. Weighs options. Finds efficient paths forward. Gets from A to B. |
| **LOW** | The Manipulator | Over-plans, never acts. Uses strategy as defense against uncertainty. Chess-player who treats people as pieces. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Conscientiousness | +0.8 |
| Openness | +0.8 |
| Extraversion | +0.5 |

---

### 9. The Activist

| | |
|---|---|
| **ID** | `activist` |
| **Function** | Removes obstacles and fights for change |
| **Primary Affects** | RAGE |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Righteous Warrior | Channels anger into justice. Fights the right battles for the right reasons. Removes real obstacles. Changes what needs changing. |
| **BASE** | The Determined Fighter | Pushes through resistance. Advocates for what matters. Doesn't back down easily. |
| **LOW** | The Destroyer | Angry at everything. Burns bridges indiscriminately. Can't distinguish worthy battles from destructive impulses. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Honesty-Humility | +0.8 |
| Conscientiousness | +0.8 |
| Openness | +0.5 |
| Agreeableness | -0.6 |

---

### 10. The Networker

| | |
|---|---|
| **ID** | `networker` |
| **Function** | Weaves connections and creates opportunity |
| **Primary Affects** | CARE, SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Generous Connector | Creates value by bringing the right people together. Builds bridges that benefit everyone. Weaves communities. |
| **BASE** | The Social Weaver | Naturally connects people and opportunities. Builds and maintains relationships. Knows who to call. |
| **LOW** | The Collector | Transactional. Collects people as assets. Superficial relationships. Can't go deep. Confuses contacts for connections. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Extraversion | +0.8 |
| Agreeableness | +0.8 |
| Openness | +0.8 |

---

### 11. The Trickster

| | |
|---|---|
| **ID** | `trickster` |
| **Function** | Disrupts stagnation and injects necessary chaos |
| **Primary Affects** | SEEKING, PLAY |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Sacred Fool | Speaks truth through humor. Breaks necessary rules for liberation. Disrupts stagnation in service of growth. The holy jester. |
| **BASE** | The Playful Disruptor | Questions assumptions. Pokes holes in certainty. Keeps things from getting too rigid. Makes people laugh. |
| **LOW** | The Chaos Agent | Destroys without purpose. Cruel humor. Can't be serious when it matters. Mistakes destruction for freedom. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Openness | +0.8 |
| Extraversion | +0.5 |
| Honesty-Humility | -0.6 |
| Conscientiousness | -0.6 |

---

### 12. The Lover

| | |
|---|---|
| **ID** | `lover` |
| **Function** | Bonds through desire, creates union |
| **Primary Affects** | CARE, LUST |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Sacred Partner | Creates profound union that transforms both parties. Loves without losing self. Bonding as mutual awakening. |
| **BASE** | The Passionate Connector | Builds intimacy. Draws people close. Creates warmth and attraction. Bonds deeply. |
| **LOW** | The Obsessive | Possessive. Loses self in other. Seductive manipulation. Confuses intensity for intimacy. Love as consumption. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Extraversion | +0.8 |
| Agreeableness | +0.8 |
| Openness | +0.8 |

---

## UPDATER Category -- Pivot / Trust / Transformation and Resilience

The six UPDATER archetypes facilitate change, healing, and adaptation. They are the pivots that enable transformation.

---

### 13. The Alchemist

| | |
|---|---|
| **ID** | `alchemist` |
| **Function** | Transmutes loss into new form |
| **Primary Affects** | SEEKING, PANIC, GRIEF |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Transmuter | Transforms suffering into wisdom and growth for self and others. Finds gold in the ashes. The wound becomes the gift. |
| **BASE** | The Processor | Metabolizes loss and difficulty. Finds meaning in pain. Moves through rather than around. |
| **LOW** | The Wound Dweller | Wallows in pain. Addicted to crisis. Manufactures suffering to feel alive. Identity fused with trauma. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Openness | +0.8 |
| Agreeableness | +0.5 |

---

### 14. The Mystic

| | |
|---|---|
| **ID** | `mystic` |
| **Function** | Sees hidden patterns and holds paradox |
| **Primary Affects** | SEEKING |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Seer | Sees through to truth and brings back insight that transforms. Holds paradox without collapse. Pattern recognition in service of wisdom. |
| **BASE** | The Pattern Seer | Perceives what others miss. Intuitive. Comfortable with mystery and ambiguity. Sees the code beneath. |
| **LOW** | The Lost One | Disconnected from reality. Cryptic. Paranoid pattern-matching. Sees patterns that aren't there. Wisdom as escape. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Openness | +0.8 |
| Conscientiousness | +0.5 |
| Extraversion | -0.6 |

---

### 15. The Sage

| | |
|---|---|
| **ID** | `sage` |
| **Function** | Holds the long view and accepts endings |
| **Primary Affects** | *(none)* |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Wise Elder | Helps others accept what is and see what truly matters. Holds perspective that transcends urgency. Wisdom in service of life. |
| **BASE** | The Long View Thinker | Patient perspective. Sees beyond the immediate. Knows what passes and what endures. |
| **LOW** | The Detached One | Uses wisdom as superiority. Checked out of life. Nihilistic. Mistakes withdrawal for transcendence. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Honesty-Humility | +0.8 |
| Openness | +0.8 |
| Conscientiousness | +0.5 |
| Emotionality | -0.6 |

---

### 16. The Healer

| | |
|---|---|
| **ID** | `healer` |
| **Function** | Restores wholeness after crisis |
| **Primary Affects** | CARE |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Restorer | Facilitates genuine healing through presence and skill. Restores wholeness without creating dependency. The wounded healer. |
| **BASE** | The Tender | Tends wounds -- physical, emotional, relational. Supports recovery. Creates conditions for healing. |
| **LOW** | The Fixer | Fixes people who don't want fixing. Needs others broken to feel useful. Creates dependency. Healing as control. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Agreeableness | +0.8 |
| Openness | +0.8 |

---

### 17. The Artist

| | |
|---|---|
| **ID** | `artist` |
| **Function** | Expresses from depth, creates from wound |
| **Primary Affects** | CARE, PANIC, GRIEF |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Authentic Creator | Transforms inner experience into work that awakens others. Creates truth, not performance. Art as transmission. |
| **BASE** | The Expressive One | Makes meaning through form. Channels feeling into creation. Gives shape to the ineffable. |
| **LOW** | The Performer | Self-indulgent. Creates for attention, not truth. Confuses drama for depth. Navel-gazing as art. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Emotionality | +0.8 |
| Openness | +0.8 |
| Conscientiousness | -0.6 |

---

### 18. The Shapeshifter

| | |
|---|---|
| **ID** | `shapeshifter` |
| **Function** | Transforms self to adapt to any situation |
| **Primary Affects** | SEEKING, PLAY |

#### States

| State | Label | Description |
|-------|-------|-------------|
| **HIGH** | The Fluid Master | Becomes what any situation needs without losing core. Adaptive genius. Water that fits any container yet remains water. |
| **BASE** | The Adapter | Flexible responder. Adjusts to context. Survives and thrives through change. Reads the room. |
| **LOW** | The Chameleon | No core self. Changes to please. Manipulates through mirroring. Can't be pinned down because there's nothing there. |

#### HEXACO Correlates

| Trait | Weight |
|-------|--------|
| Openness | +0.8 |
| Extraversion | +0.5 |
| Agreeableness | +0.5 |
| Conscientiousness | -0.6 |

---

## Quick Reference: All 18 Archetypes

| # | Archetype | Category | Function | Primary Affects | HIGH Label | LOW Label |
|---|-----------|----------|----------|-----------------|------------|-----------|
| 1 | Architect | STATIC | Builds systems for the future | CARE, SEEKING | The Visionary Builder | The Perfectionist |
| 2 | Guardian | STATIC | Protects boundaries and maintains safety | RAGE, FEAR | The Wise Protector | The Paranoid |
| 3 | Nurturer | STATIC | Tends bonds and cares for others | CARE | The Empowering Caregiver | The Martyr |
| 4 | Steward | STATIC | Preserves resources and maintains value | CARE, FEAR | The Wise Keeper | The Hoarder |
| 5 | Teacher | STATIC | Transmits truth and clarifies understanding | CARE, SEEKING | The Illuminator | The Indoctrinator |
| 6 | Tamer | STATIC | Gentles through presence, calms chaos | CARE, PLAY | The Peaceful Warrior | The Doormat |
| 7 | Pioneer | DYNAMIC | Explores unknown territory | SEEKING | The Trailblazer | The Escapist |
| 8 | Strategist | DYNAMIC | Maps optimal paths and calculates routes | SEEKING | The Master Navigator | The Manipulator |
| 9 | Activist | DYNAMIC | Removes obstacles and fights for change | RAGE | The Righteous Warrior | The Destroyer |
| 10 | Networker | DYNAMIC | Weaves connections and creates opportunity | CARE, SEEKING | The Generous Connector | The Collector |
| 11 | Trickster | DYNAMIC | Disrupts stagnation and injects chaos | SEEKING, PLAY | The Sacred Fool | The Chaos Agent |
| 12 | Lover | DYNAMIC | Bonds through desire, creates union | CARE, LUST | The Sacred Partner | The Obsessive |
| 13 | Alchemist | UPDATER | Transmutes loss into new form | SEEKING, PANIC, GRIEF | The Transmuter | The Wound Dweller |
| 14 | Mystic | UPDATER | Sees hidden patterns and holds paradox | SEEKING | The Seer | The Lost One |
| 15 | Sage | UPDATER | Holds the long view and accepts endings | *(none)* | The Wise Elder | The Detached One |
| 16 | Healer | UPDATER | Restores wholeness after crisis | CARE | The Restorer | The Fixer |
| 17 | Artist | UPDATER | Expresses from depth, creates from wound | CARE, PANIC, GRIEF | The Authentic Creator | The Performer |
| 18 | Shapeshifter | UPDATER | Transforms self to adapt | SEEKING, PLAY | The Fluid Master | The Chameleon |
