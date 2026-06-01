import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { resolveHyperNexusConfigDir, resolveHyperNexusLockPath, resolveLockedHyperNexusBase, resolveOrchestratorBase } from './hypernexus-orchestrator.js';

describe('hypernexus orchestrator helpers', () => {
    it('uses explicit env bases before lock-derived values', () => {
        expect(resolveOrchestratorBase({
            HYPERNEXUS_ORCHESTRATOR_URL: 'http://127.0.0.1:4100/',
            HYPERNEXUS_TRPC_UPSTREAM: 'http://127.0.0.1:4200/trpc',
        })).toBe('http://127.0.0.1:4100');

        expect(resolveOrchestratorBase({
            HYPERNEXUS_TRPC_UPSTREAM: 'http://127.0.0.1:4200/trpc/',
        })).toBe('http://127.0.0.1:4200');
    });

    it('resolves the live lock-file base before public env fallbacks', () => {
        const configDir = mkdtempSync(path.join(os.tmpdir(), 'hypernexus-lock-'));
        writeFileSync(path.join(configDir, 'lock'), JSON.stringify({ host: '0.0.0.0', port: 4312 }));

        expect(resolveHyperNexusConfigDir({ HYPERNEXUS_CONFIG_DIR: configDir })).toBe(configDir);
        expect(resolveHyperNexusLockPath({ HYPERNEXUS_CONFIG_DIR: configDir })).toBe(path.join(configDir, 'lock'));
        expect(resolveLockedHyperNexusBase({ HYPERNEXUS_CONFIG_DIR: configDir })).toBe('http://127.0.0.1:4312');
        expect(resolveOrchestratorBase({
            HYPERNEXUS_CONFIG_DIR: configDir,
            NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL: 'http://127.0.0.1:3847',
        })).toBe('http://127.0.0.1:4312');
    });

    it('falls back to configured public envs when no live lock exists', () => {
        const configDir = mkdtempSync(path.join(os.tmpdir(), 'hypernexus-lock-empty-'));
        mkdirSync(configDir, { recursive: true });

        expect(resolveOrchestratorBase({
            HYPERNEXUS_CONFIG_DIR: configDir,
            NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL: 'http://127.0.0.1:5001/',
        })).toBe('http://127.0.0.1:5001');

        expect(resolveOrchestratorBase({
            HYPERNEXUS_CONFIG_DIR: configDir,
            NEXT_PUBLIC_AUTOPILOT_URL: 'http://127.0.0.1:3847',
        })).toBe('http://127.0.0.1:3847');
    });
});
