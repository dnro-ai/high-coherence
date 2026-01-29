/**
 * Core Archetype Types
 * 
 * The 18-archetype system derived from cross-cultural mythology,
 * Pankseppian affects, and Active Inference theory.
 */

import type { PankseppianAffect } from './pankseppian';
import type { HexacoTrait } from './hexaco';
import type { CATProfile } from './cat';
import type { NudgeRecommendation } from './nudge';

// ============================================
// Core Enums & Types
// ============================================

/**
 * Archetype categories based on system function
 */
export type ArchetypeCategory =
    | 'STATIC'   // Container → Clarity → Stability & Safety
    | 'DYNAMIC'  // Engine → Agency → Movement & Growth
    | 'UPDATER'; // Pivot → Trust → Transformation & Resilience

/**
 * All 18 archetypes
 */
export type ArchetypeId =
    // STATIC: Container → Clarity → Stability & Safety
    | 'architect'   // Builds systems for the future
    | 'guardian'    // Protects boundaries, maintains safety
    | 'nurturer'    // Tends bonds, cares for others
    | 'steward'     // Preserves resources, maintains value
    | 'teacher'     // Transmits truth, clarifies understanding
    | 'tamer'       // Gentles through presence, calms chaos
    // DYNAMIC: Engine → Agency → Movement & Growth
    | 'pioneer'     // Explores unknown territory
    | 'strategist'  // Maps optimal paths, calculates routes
    | 'activist'    // Removes obstacles, fights for change
    | 'networker'   // Weaves connections, creates opportunity
    | 'trickster'   // Disrupts stagnation, injects chaos
    | 'lover'       // Bonds through desire, creates union
    // UPDATER: Pivot → Trust → Transformation & Resilience
    | 'alchemist'   // Transmutes loss into new form
    | 'mystic'      // Sees hidden patterns, holds paradox
    | 'sage'        // Holds long view, accepts endings
    | 'healer'      // Restores wholeness after crisis
    | 'artist'      // Expresses from depth, creates from wound
    | 'shapeshifter'; // Transforms self to adapt

/**
 * Coherence states representing integration level
 */
export type CoherenceState = 'HIGH' | 'BASE' | 'LOW';

/**
 * Meta-modes that modify archetype expression
 */
export type MetaMode = 'player' | 'witness';

// ============================================
// State & Content
// ============================================

/**
 * State-specific archetype content
 */
export interface ArchetypeState {
    /** State-specific name, e.g., "The Visionary Builder" */
    label: string;
    /** Full description of this state */
    description: string;
    /** Guidance for user in this state */
    guidance: string;
    /** Recommended nudges for this state */
    nudges: NudgeRecommendation[];
}

// ============================================
// Full Archetype Definition
// ============================================

/**
 * Complete archetype definition with all content and detection weights
 */
export interface ArchetypeDefinition {
    id: ArchetypeId;
    /** Display name, e.g., "The Architect" */
    name: string;
    category: ArchetypeCategory;
    /** Core function/purpose */
    function: string;
    /** Primary Pankseppian affects */
    primaryAffects: PankseppianAffect[];
    /** Icon path (relative to public/) */
    iconPath?: string;

    // State-specific content
    states: {
        HIGH: ArchetypeState;
        BASE: ArchetypeState;
        LOW: ArchetypeState;
    };

    // Detection weights (-1 to 1)
    hexacoCorrelates: Partial<Record<HexacoTrait, number>>;
    /** Typical CAT profile for this archetype */
    catProfile: CATProfile;

    // Cross-references (backend only, not user-facing)
    _tarotMapping?: string;
    _enneagramMapping?: string;
}

// ============================================
// Archetype Metadata
// ============================================

/**
 * Category metadata for grouping
 */
export const CATEGORY_META: Record<ArchetypeCategory, { label: string; focus: string }> = {
    STATIC: { label: 'Static', focus: 'Stability & Safety' },
    DYNAMIC: { label: 'Dynamic', focus: 'Movement & Growth' },
    UPDATER: { label: 'Updater', focus: 'Transformation & Resilience' }
};

/**
 * All archetype IDs organized by category
 */
export const ARCHETYPES_BY_CATEGORY: Record<ArchetypeCategory, ArchetypeId[]> = {
    STATIC: ['architect', 'guardian', 'nurturer', 'steward', 'teacher', 'tamer'],
    DYNAMIC: ['pioneer', 'strategist', 'activist', 'networker', 'trickster', 'lover'],
    UPDATER: ['alchemist', 'mystic', 'sage', 'healer', 'artist', 'shapeshifter']
};

/**
 * Get category for an archetype
 */
export function getArchetypeCategory(id: ArchetypeId): ArchetypeCategory {
    for (const [category, ids] of Object.entries(ARCHETYPES_BY_CATEGORY)) {
        if (ids.includes(id)) return category as ArchetypeCategory;
    }
    throw new Error(`Unknown archetype: ${id}`);
}
