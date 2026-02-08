# High Coherence -- Scoring System

This document describes the complete scoring system used by the High Coherence platform, covering CAT coherence scoring, HEXACO-to-archetype detection, and coherence state determination.

**Source files:**
- `app/composables/useCoherenceScoring.ts` -- CAT scoring engine
- `app/services/archetype-detector.ts` -- Archetype detection and coherence state
- `app/types/cat.ts` -- CAT type definitions and normalization utilities
- `app/types/hexaco.ts` -- HEXACO personality framework types

---

## 1. CAT Coherence Scoring

CAT measures three dimensions of psychological coherence:

| Dimension   | Code | Description                              |
|-------------|------|------------------------------------------|
| **Clarity** | C    | Mental clarity and understanding         |
| **Agency**  | A    | Sense of control and self-efficacy       |
| **Trust**   | T    | Trust in self, others, and the process   |

Each dimension operates on a **-3 to +3 raw scale** that is normalized to **0--100** for display.

### 1.1 Mood Quadrants

36 moods are organized into four quadrants based on energy level and valence:

| Quadrant            | Energy | Valence  | Moods |
|---------------------|--------|----------|-------|
| **High Positive**   | High   | Positive | Focused, Confident, Energized, Motivated, Excited, Passionate, Inspired, Determined, Empowered |
| **Low Positive**    | Low    | Positive | Calm, Content, Peaceful, Relaxed, Grateful, Serene, Grounded, Centered, Thoughtful |
| **High Negative**   | High   | Negative | Stressed, Anxious, Overwhelmed, Frustrated, Irritated, Pressured, Nervous, Worried, Restless |
| **Low Negative**    | Low    | Negative | Drained, Tired, Numb, Disconnected, Lonely, Lost, Sad, Depleted, Uncertain |

### 1.2 Mood-to-CAT Delta Map

Each mood selection produces a delta vector `{c, a, t}` with values ranging from **-2 to +2**.

#### High Positive Quadrant

| Mood        | C  | A  | T  | Pattern                       |
|-------------|----|----|----|-------------------------------|
| Focused     | +2 | +1 |  0 | Strong clarity, moderate agency |
| Confident   | +1 | +2 | +1 | Strong agency, balanced        |
| Energized   | +1 | +2 |  0 | Strong agency                  |
| Motivated   | +1 | +2 | +1 | Strong agency, balanced        |
| Excited     |  0 | +2 | +1 | Strong agency, some trust      |
| Passionate  |  0 | +1 | +2 | Strong trust, moderate agency  |
| Inspired    | +2 | +1 | +1 | Strong clarity, balanced       |
| Determined  | +1 | +2 |  0 | Strong agency                  |
| Empowered   | +1 | +2 | +1 | Strong agency, balanced        |

#### Low Positive Quadrant

| Mood        | C  | A  | T  | Pattern                        |
|-------------|----|----|----|--------------------------------|
| Calm        | +1 |  0 | +2 | Strong trust, some clarity     |
| Content     | +1 | +1 | +2 | Strong trust, balanced         |
| Peaceful    | +1 |  0 | +2 | Strong trust, some clarity     |
| Relaxed     |  0 |  0 | +2 | Pure trust                     |
| Grateful    | +1 |  0 | +2 | Strong trust, some clarity     |
| Serene      | +1 |  0 | +2 | Strong trust, some clarity     |
| Grounded    | +2 | +1 | +1 | Strong clarity, balanced       |
| Centered    | +2 | +1 | +1 | Strong clarity, balanced       |
| Thoughtful  | +2 |  0 | +1 | Strong clarity, some trust     |

#### High Negative Quadrant

| Mood        | C  | A  | T  | Pattern                          |
|-------------|----|----|----|----------------------------------|
| Stressed    | -1 | +1 | -1 | Agency preserved, C/T eroded     |
| Anxious     | -1 |  0 | -2 | Strong trust loss                |
| Overwhelmed | -2 | -1 | -1 | All dimensions degraded          |
| Frustrated  |  0 | +1 | -2 | Agency preserved, trust collapsed|
| Irritated   |  0 | +1 | -2 | Agency preserved, trust collapsed|
| Pressured   | -1 |  0 | -1 | Mild across-the-board erosion    |
| Nervous     | -1 | -1 | -1 | Uniform mild degradation         |
| Worried     | -1 | -1 | -1 | Uniform mild degradation         |
| Restless    | -1 | +1 | -1 | Agency preserved, C/T eroded     |

#### Low Negative Quadrant

| Mood          | C  | A  | T  | Pattern                         |
|---------------|----|----|----|----------------------------------|
| Drained       | -1 | -2 |  0 | Strong agency loss               |
| Tired         | -1 | -2 |  0 | Strong agency loss               |
| Numb          | -2 | -1 | -1 | Strong clarity loss              |
| Disconnected  | -1 | -1 | -2 | Strong trust loss                |
| Lonely        |  0 | -1 | -2 | Strong trust loss                |
| Lost          | -2 | -2 | -1 | Severe across-the-board loss     |
| Sad           |  0 | -1 | -1 | Mild agency/trust erosion        |
| Depleted      | -1 | -2 | -1 | Strong agency loss, all degraded |
| Uncertain     | -2 | -1 |  0 | Strong clarity loss              |

### 1.3 Temporal Decay

Recent mood entries carry more weight than older ones. Decay follows an **exponential curve**:

```
weight = e^(-lambda * hoursAgo)
```

Where:
- `lambda = 0.1` (decay constant)
- `hoursAgo` = hours elapsed since the mood entry

| Hours Ago | Weight |
|-----------|--------|
| 0         | 1.000  |
| 1         | 0.905  |
| 5         | 0.607  |
| 10        | 0.368  |
| 24        | 0.091  |
| 48        | 0.008  |

This means a mood check-in from 24 hours ago contributes only ~9% of its original weight, while a check-in from 5 hours ago still contributes ~61%.

### 1.4 CAT Calculation Pipeline

1. **Collect mood entries** -- each entry has a mood label, timestamp, and `{c, a, t}` deltas.
2. **Apply temporal decay** -- for each entry, compute `weight = e^(-0.1 * hoursAgo)`.
3. **Weighted average** -- compute the weighted average for each dimension:
   ```
   cAvg = sum(c_i * weight_i) / sum(weight_i)
   aAvg = sum(a_i * weight_i) / sum(weight_i)
   tAvg = sum(t_i * weight_i) / sum(weight_i)
   ```
4. **Convert to percentage** (0--100):
   ```
   score = (3 + catValue) * 16.67
   clamped to [0, 100], rounded
   ```
   This maps the -3 to +3 scale onto 0--100:

   | CAT Value | Percentage |
   |-----------|------------|
   | -3        | 0          |
   | -2        | 17         |
   | -1        | 33         |
   |  0        | 50         |
   | +1        | 67         |
   | +2        | 83         |
   | +3        | 100        |

5. **Composite score** -- average of Clarity, Agency, and Trust percentages:
   ```
   composite = round((clarity + agency + trust) / 3)
   ```
6. **Dominant & gap dimensions** -- dimensions are ranked by score. The highest is the dominant dimension; the lowest is the gap dimension.
7. **Default profile** (no mood entries): all dimensions default to 50 (neutral), dominant = C, gap = T.

### 1.5 Stability Index

Stability measures how consistent the user's coherence has been across mood entries.

1. For each mood entry, compute a per-entry composite:
   ```
   entryComposite = (catToPercentage(c) + catToPercentage(a) + catToPercentage(t)) / 3
   ```
2. Compute the **standard deviation** of all entry composites.
3. Stability score:
   ```
   stability = 100 - (stdDev * 2)
   clamped to [0, 100], rounded
   ```
4. If fewer than 2 mood entries exist, stability defaults to **85**.

#### Stability Levels

| Level        | Score Range | Meaning                              |
|--------------|-------------|--------------------------------------|
| **Stable**   | 80--100     | Consistent coherence across entries  |
| **Variable** | 60--79      | Some fluctuation in coherence        |
| **Volatile** | 0--59       | Significant swings in coherence      |

---

## 2. HEXACO-to-Archetype Detection

The archetype detector scores each of the 18 archetypes against a user's HEXACO personality profile, optionally refined by current emotional state.

### 2.1 HEXACO Personality Traits

The HEXACO model uses six factors, each scored 0--100:

| Trait               | Code | Facets                                               |
|---------------------|------|------------------------------------------------------|
| Honesty-Humility    | H    | Sincerity, fairness, greed avoidance, modesty        |
| Emotionality        | E    | Fearfulness, anxiety, dependence, sentimentality     |
| Extraversion        | X    | Social self-esteem, social boldness, sociability     |
| Agreeableness       | A    | Forgiveness, gentleness, flexibility, patience       |
| Conscientiousness   | C    | Organization, diligence, perfectionism, prudence     |
| Openness            | O    | Aesthetic appreciation, inquisitiveness, creativity  |

Trait levels: **high** >= 65, **low** <= 35, **neutral** = 36--64.

### 2.2 Scoring Algorithm

Each archetype defines `hexacoCorrelates` -- a partial map of HEXACO traits to weights in the range **-1 to +1**. The scoring process:

1. **Normalize the profile** -- convert each 0--100 trait score to -1/+1:
   ```
   normalizedProfile = (profileScore - 50) / 50
   ```
   Examples: score of 80 becomes +0.6, score of 20 becomes -0.6, score of 50 becomes 0.

2. **Weighted scoring** -- for each trait with a defined correlate weight:
   ```
   totalScore += weight * normalizedProfile
   weightSum  += abs(weight)
   ```
   Only traits listed in the archetype's correlates participate in scoring.

3. **Scale to 0--100**:
   ```
   finalScore = ((totalScore / weightSum) + 1) * 50
   ```
   This maps the weighted average from [-1, +1] back to [0, 100].

4. If no correlates are defined (`weightSum = 0`), the score defaults to **50**.

### 2.3 Emotional State Refinement

After base HEXACO scoring, scores can be boosted by current emotional state alignment:

| Condition                                                   | Boost  |
|-------------------------------------------------------------|--------|
| Current affect matches archetype's **primary** affect (index 0) | **+10** |
| Current affect matches any **secondary** affect             | **+5** |
| No affect match                                             | 0      |

The current affect is taken from `EmotionalState.primary.affect` (a Pankseppian affect type).

### 2.4 Confidence Calculation

Confidence is derived directly from the final score, clamped to 0--100:

```
confidence = clamp(score, 0, 100)
```

### 2.5 Detection Output

The full detection pipeline returns:

| Field            | Description                                            |
|------------------|--------------------------------------------------------|
| `primary`        | Highest-scoring archetype (ID, score, confidence)      |
| `secondary`      | Next 3 highest-scoring archetypes                      |
| `coherenceState` | Current coherence state (HIGH / BASE / LOW)            |
| `timestamp`      | When detection was performed                           |

---

## 3. Coherence State Determination

Coherence state is determined from **raw CAT scores** on the -3 to +3 scale:

### Rules

```
HIGH:  average(C, A, T) >= 1.5  AND  C > 0  AND  A > 0  AND  T > 0
LOW:   average(C, A, T) <= -1   OR   C <= -2  OR  A <= -2  OR  T <= -2
BASE:  everything else
```

| State    | Criteria                                            | Meaning                                   |
|----------|-----------------------------------------------------|-------------------------------------------|
| **HIGH** | Average >= 1.5 AND all three dimensions positive    | Integrated, high-functioning coherence    |
| **LOW**  | Average <= -1 OR any single dimension <= -2         | Degraded coherence, needs attention       |
| **BASE** | Neither HIGH nor LOW conditions met                 | Normal operating range                    |

Key observations:
- **HIGH** requires both a strong average AND no negative dimensions -- it demands balanced elevation.
- **LOW** can be triggered by a single severely degraded dimension (any one at -2 or below), even if the average is acceptable. This catches cases where one area has collapsed.
- **BASE** is the default catch-all for normal functioning.

If no CAT scores are available, the coherence state defaults to **BASE**.

---

## 4. Pankseppian Affect System

The emotional framework is based on Jaak Panksepp's seven primary emotional systems, extended with PEACE:

| Affect      | Valence  | Description                               |
|-------------|----------|-------------------------------------------|
| **SEEKING** | Positive | Curiosity, exploration, anticipation      |
| **RAGE**    | Negative | Anger, frustration, boundary violation    |
| **FEAR**    | Negative | Anxiety, apprehension, threat response    |
| **LUST**    | Positive | Desire, passion, attraction               |
| **CARE**    | Positive | Nurturing, attachment, empathy            |
| **PANIC**   | Negative | Separation distress, grief, loss          |
| **PLAY**    | Positive | Joy, social engagement, lightness         |
| **PEACE**   | Positive | Contentment, equanimity, groundedness     |

An `EmotionalState` has a primary affect (required) and optional secondary affect, each with an intensity (0--100). Overall emotional intensity blends primary and secondary:

```
intensity = (primary.intensity + secondary.intensity * 0.5) / 1.5
```

A state is considered predominantly positive unless the primary affect is negative, or the secondary affect is negative with intensity above 50.

---

## 5. Normalization Utilities

### CAT Score Normalization (cat.ts)

For converting between the raw -3/+3 scale and the 0--100 normalized scale:

```
normalize:   score_100 = round(((rawScore + 3) / 6) * 100)
denormalize: rawScore  = (score_100 / 100) * 6 - 3
```

| Raw Score | Normalized |
|-----------|------------|
| -3        | 0          |
| -1.5      | 25         |
|  0        | 50         |
| +1.5      | 75         |
| +3        | 100        |

Note: The `useCoherenceScoring.ts` composable uses a slightly different conversion formula (`(3 + value) * 16.67`), which produces the same mapping but with rounding differences at edge values. Both approaches map -3 to 0 and +3 to 100.
