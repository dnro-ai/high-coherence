/**
 * User Archetype Profile Types
 * 
 * Represents a user's archetype assessment results,
 * current coherence state, and state history.
 */

import type { ArchetypeId, CoherenceState, MetaMode } from './archetype';
import type { HexacoProfile } from './hexaco';
import type { CATProfile } from './cat';
import type { EmotionalState } from './pankseppian';

/**
 * Secondary archetype tendency
 */
export interface SecondaryArchetype {
    archetype: ArchetypeId;
    /** Strength/confidence score 0-100 */
    strength: number;
}

/**
 * Entry in state change history
 */
export interface StateHistoryEntry {
    state: CoherenceState;
    timestamp: Date;
    /** What triggered the state change */
    trigger?: 'assessment' | 'check-in' | 'goal-completion' | 'manual' | 'system';
    /** CAT scores at time of state change */
    catScores?: CATProfile;
    /** Emotional state at time of change */
    emotionalState?: EmotionalState;
}

/**
 * Complete user archetype profile
 */
export interface UserArchetypeProfile {
    /** User ID reference */
    userId: string;

    // Core archetype (determined from assessment)
    /** Primary archetype ID */
    primaryArchetype: ArchetypeId;
    /** Confidence/strength of primary archetype match (0-100) */
    primaryStrength: number;

    // Secondary tendencies (ranked)
    secondaryArchetypes: SecondaryArchetype[];

    // Current state
    /** Current coherence state */
    currentState: CoherenceState;
    /** Active meta-mode if any */
    activeMetaMode?: MetaMode;

    // History
    stateHistory: StateHistoryEntry[];

    // Source data
    /** HEXACO profile if available */
    hexacoProfile?: HexacoProfile;
    /** When archetype was assessed */
    assessedAt?: Date;
    /** When profile was last updated */
    updatedAt: Date;
}

/**
 * Create a new user archetype profile
 */
export function createUserArchetypeProfile(
    userId: string,
    primaryArchetype: ArchetypeId,
    primaryStrength: number,
    initialState: CoherenceState = 'BASE'
): UserArchetypeProfile {
    const now = new Date();
    return {
        userId,
        primaryArchetype,
        primaryStrength,
        secondaryArchetypes: [],
        currentState: initialState,
        stateHistory: [{
            state: initialState,
            timestamp: now,
            trigger: 'assessment'
        }],
        assessedAt: now,
        updatedAt: now
    };
}

/**
 * Update user's coherence state and add to history
 */
export function updateUserState(
    profile: UserArchetypeProfile,
    newState: CoherenceState,
    trigger: StateHistoryEntry['trigger'] = 'system',
    catScores?: CATProfile
): UserArchetypeProfile {
    // Don't add duplicate states
    if (profile.currentState === newState) {
        return profile;
    }

    const entry: StateHistoryEntry = {
        state: newState,
        timestamp: new Date(),
        trigger,
        catScores
    };

    return {
        ...profile,
        currentState: newState,
        stateHistory: [...profile.stateHistory, entry],
        updatedAt: new Date()
    };
}

/**
 * Get time spent in each state (useful for analytics)
 */
export function getStateDistribution(
    history: StateHistoryEntry[]
): Record<CoherenceState, number> {
    const distribution: Record<CoherenceState, number> = {
        HIGH: 0,
        BASE: 0,
        LOW: 0
    };

    for (let i = 0; i < history.length; i++) {
        const current = history[i];
        const next = history[i + 1];
        const duration = next
            ? next.timestamp.getTime() - current.timestamp.getTime()
            : Date.now() - current.timestamp.getTime();

        distribution[current.state] += duration;
    }

    return distribution;
}
