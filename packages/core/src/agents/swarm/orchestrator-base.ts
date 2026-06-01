import { resolveOrchestratorBase } from '../../lib/hypernexus-orchestrator.js';

export function resolveSwarmOrchestratorBase(explicitBase?: string): string | null {
    const explicit = explicitBase?.trim();
    if (explicit) {
        return explicit.replace(/\/$/, '');
    }

    return resolveOrchestratorBase();
}
