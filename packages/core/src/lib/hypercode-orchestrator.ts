import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

<<<<<<<< HEAD:packages/core/src/lib/hypernexus-orchestrator.ts
type HyperNexusLockRecord = {
========
type HyperNexusLockRecord = {
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/lib/hypernexus-orchestrator.ts
    port?: number;
    host?: string;
};

type OrchestratorEnv = Record<string, string | undefined>;

function normalizeBaseURL(value?: string): string | null {
    const trimmed = value?.trim();
    if (!trimmed) {
        return null;
    }

    const withoutTrailingSlash = trimmed.replace(/\/$/, '');
    return withoutTrailingSlash.endsWith('/trpc')
        ? withoutTrailingSlash.slice(0, -5)
        : withoutTrailingSlash;
}

function resolveBrowserHost(host: string): string {
    return host === '0.0.0.0' || host === '::' || host === '[::]'
        ? '127.0.0.1'
        : host;
}

<<<<<<<< HEAD:packages/core/src/lib/hypernexus-orchestrator.ts
export function resolveHyperNexusConfigDir(env: OrchestratorEnv = process.env): string {
    const configuredDir = env.HYPERNEXUS_CONFIG_DIR?.trim();
========
export function resolveHyperNexusConfigDir(env: OrchestratorEnv = process.env): string {
    const configuredDir = env.HYPERCODE_CONFIG_DIR?.trim();
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/lib/hypernexus-orchestrator.ts
    if (configuredDir) {
        return configuredDir;
    }

<<<<<<<< HEAD:packages/core/src/lib/hypernexus-orchestrator.ts
    return path.join(os.homedir(), '.hypernexus');
}

export function resolveHyperNexusLockPath(env: OrchestratorEnv = process.env): string {
    return path.join(resolveHyperNexusConfigDir(env), 'lock');
}

export function resolveLockedHyperNexusBase(env: OrchestratorEnv = process.env): string | null {
    const lockPath = resolveHyperNexusLockPath(env);
========
    return path.join(os.homedir(), '.hypernexus');
}

export function resolveHyperNexusLockPath(env: OrchestratorEnv = process.env): string {
    return path.join(resolveHyperNexusConfigDir(env), 'lock');
}

export function resolveLockedHyperNexusBase(env: OrchestratorEnv = process.env): string | null {
    const lockPath = resolveHyperNexusLockPath(env);
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/lib/hypernexus-orchestrator.ts
    if (!existsSync(lockPath)) {
        return null;
    }

    try {
<<<<<<<< HEAD:packages/core/src/lib/hypernexus-orchestrator.ts
        const parsed = JSON.parse(readFileSync(lockPath, 'utf8')) as HyperNexusLockRecord;
========
        const parsed = JSON.parse(readFileSync(lockPath, 'utf8')) as HyperNexusLockRecord;
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/lib/hypernexus-orchestrator.ts
        if (!parsed || typeof parsed.port !== 'number' || parsed.port <= 0) {
            return null;
        }

        const host = typeof parsed.host === 'string' && parsed.host.trim().length > 0
            ? resolveBrowserHost(parsed.host.trim())
            : '127.0.0.1';

        return `http://${host}:${parsed.port}`;
    } catch {
        return null;
    }
}

export function resolveOrchestratorBase(env: OrchestratorEnv = process.env): string | null {
<<<<<<<< HEAD:packages/core/src/lib/hypernexus-orchestrator.ts
    return normalizeBaseURL(env.HYPERNEXUS_ORCHESTRATOR_URL)
        ?? normalizeBaseURL(env.HYPERNEXUS_TRPC_UPSTREAM)
        ?? resolveLockedHyperNexusBase(env)
        ?? normalizeBaseURL(env.NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL)
========
    return normalizeBaseURL(env.HYPERCODE_ORCHESTRATOR_URL)
        ?? normalizeBaseURL(env.HYPERCODE_TRPC_UPSTREAM)
        ?? resolveLockedHyperNexusBase(env)
        ?? normalizeBaseURL(env.NEXT_PUBLIC_HYPERCODE_ORCHESTRATOR_URL)
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/lib/hypernexus-orchestrator.ts
        ?? normalizeBaseURL(env.NEXT_PUBLIC_AUTOPILOT_URL);
}
