// Coherence Scoring Utilities for HC Platform - V2 Scoring System

export interface MoodEntry {
    mood: string;
    timestamp: Date;
    cat: { c: number; a: number; t: number };
}

export interface CATProfile {
    clarity: number;
    agency: number;
    trust: number;
    composite: number;
    stability: number;
    dominantDimension: 'C' | 'A' | 'T';
    gapDimension: 'C' | 'A' | 'T';
}

export type StabilityLevel = 'Stable' | 'Variable' | 'Volatile';

// 36 moods organized by quadrant
export const MOOD_CATEGORIES = {
    highPositive: [
        'Focused', 'Confident', 'Energized',
        'Motivated', 'Excited', 'Passionate',
        'Inspired', 'Determined', 'Empowered'
    ],
    lowPositive: [
        'Calm', 'Content', 'Peaceful',
        'Relaxed', 'Grateful', 'Serene',
        'Grounded', 'Centered', 'Thoughtful'
    ],
    highNegative: [
        'Stressed', 'Anxious', 'Overwhelmed',
        'Frustrated', 'Irritated', 'Pressured',
        'Nervous', 'Worried', 'Restless'
    ],
    lowNegative: [
        'Drained', 'Tired', 'Numb',
        'Disconnected', 'Lonely', 'Lost',
        'Sad', 'Depleted', 'Uncertain'
    ]
} as const;

// CAT contribution mappings for each mood
export const MOOD_CAT_MAP: Record<string, { c: number; a: number; t: number }> = {
    // High Energy + Positive
    'Focused': { c: 2, a: 1, t: 0 },
    'Confident': { c: 1, a: 2, t: 1 },
    'Energized': { c: 1, a: 2, t: 0 },
    'Motivated': { c: 1, a: 2, t: 1 },
    'Excited': { c: 0, a: 2, t: 1 },
    'Passionate': { c: 0, a: 1, t: 2 },
    'Inspired': { c: 2, a: 1, t: 1 },
    'Determined': { c: 1, a: 2, t: 0 },
    'Empowered': { c: 1, a: 2, t: 1 },
    // Low Energy + Positive
    'Calm': { c: 1, a: 0, t: 2 },
    'Content': { c: 1, a: 1, t: 2 },
    'Peaceful': { c: 1, a: 0, t: 2 },
    'Relaxed': { c: 0, a: 0, t: 2 },
    'Grateful': { c: 1, a: 0, t: 2 },
    'Serene': { c: 1, a: 0, t: 2 },
    'Grounded': { c: 2, a: 1, t: 1 },
    'Centered': { c: 2, a: 1, t: 1 },
    'Thoughtful': { c: 2, a: 0, t: 1 },
    // High Energy - Negative
    'Stressed': { c: -1, a: 1, t: -1 },
    'Anxious': { c: -1, a: 0, t: -2 },
    'Overwhelmed': { c: -2, a: -1, t: -1 },
    'Frustrated': { c: 0, a: 1, t: -2 },
    'Irritated': { c: 0, a: 1, t: -2 },
    'Pressured': { c: -1, a: 0, t: -1 },
    'Nervous': { c: -1, a: -1, t: -1 },
    'Worried': { c: -1, a: -1, t: -1 },
    'Restless': { c: -1, a: 1, t: -1 },
    // Low Energy - Negative
    'Drained': { c: -1, a: -2, t: 0 },
    'Tired': { c: -1, a: -2, t: 0 },
    'Numb': { c: -2, a: -1, t: -1 },
    'Disconnected': { c: -1, a: -1, t: -2 },
    'Lonely': { c: 0, a: -1, t: -2 },
    'Lost': { c: -2, a: -2, t: -1 },
    'Sad': { c: 0, a: -1, t: -1 },
    'Depleted': { c: -1, a: -2, t: -1 },
    'Uncertain': { c: -2, a: -1, t: 0 },
};

// Temporal decay calculation
export function calculateDecayWeight(hoursAgo: number): number {
    const lambda = 0.1;
    return Math.exp(-lambda * hoursAgo);
}

// Convert CAT delta to percentage score (0-100)
export function catToPercentage(catValue: number): number {
    const coefficient = 3 + catValue;
    const score = coefficient * 16.67;
    return Math.min(100, Math.max(0, Math.round(score)));
}

// Calculate stability level from score
export function getStabilityLevel(stability: number): StabilityLevel {
    if (stability >= 80) return 'Stable';
    if (stability >= 60) return 'Variable';
    return 'Volatile';
}

// Calculate CAT profile from mood entries
export function calculateCAT(moods: MoodEntry[]): Omit<CATProfile, 'stability'> {
    if (moods.length === 0) {
        return {
            clarity: 50, agency: 50, trust: 50,
            composite: 50,
            dominantDimension: 'C',
            gapDimension: 'T'
        };
    }

    let cSum = 0, aSum = 0, tSum = 0, totalWeight = 0;
    const now = new Date();

    for (const entry of moods) {
        const hoursAgo = (now.getTime() - entry.timestamp.getTime()) / (1000 * 60 * 60);
        const weight = calculateDecayWeight(hoursAgo);
        cSum += entry.cat.c * weight;
        aSum += entry.cat.a * weight;
        tSum += entry.cat.t * weight;
        totalWeight += weight;
    }

    const cAvg = totalWeight > 0 ? cSum / totalWeight : 0;
    const aAvg = totalWeight > 0 ? aSum / totalWeight : 0;
    const tAvg = totalWeight > 0 ? tSum / totalWeight : 0;

    const clarity = catToPercentage(cAvg);
    const agency = catToPercentage(aAvg);
    const trust = catToPercentage(tAvg);
    const composite = Math.round((clarity + agency + trust) / 3);

    const scores = { C: clarity, A: agency, T: trust };
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return {
        clarity, agency, trust, composite,
        dominantDimension: sorted[0][0] as 'C' | 'A' | 'T',
        gapDimension: sorted[2][0] as 'C' | 'A' | 'T'
    };
}

// Calculate stability index
export function calculateStability(moods: MoodEntry[]): number {
    if (moods.length < 2) return 85;

    const composites = moods.map(m => {
        const c = catToPercentage(m.cat.c);
        const a = catToPercentage(m.cat.a);
        const t = catToPercentage(m.cat.t);
        return (c + a + t) / 3;
    });

    const mean = composites.reduce((a, b) => a + b, 0) / composites.length;
    const variance = composites.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / composites.length;
    const stdDev = Math.sqrt(variance);

    return Math.max(0, Math.min(100, Math.round(100 - stdDev * 2)));
}
