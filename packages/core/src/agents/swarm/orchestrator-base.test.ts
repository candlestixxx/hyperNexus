import { mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { resolveSwarmOrchestratorBase } from './orchestrator-base.js';

const originalEnv = {
    HYPERNEXUS_CONFIG_DIR: process.env.HYPERNEXUS_CONFIG_DIR,
    HYPERNEXUS_ORCHESTRATOR_URL: process.env.HYPERNEXUS_ORCHESTRATOR_URL,
    HYPERNEXUS_TRPC_UPSTREAM: process.env.HYPERNEXUS_TRPC_UPSTREAM,
    NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL: process.env.NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL,
    NEXT_PUBLIC_AUTOPILOT_URL: process.env.NEXT_PUBLIC_AUTOPILOT_URL,
};

afterEach(() => {
    for (const [key, value] of Object.entries(originalEnv)) {
        if (value === undefined) {
            delete process.env[key];
        } else {
            process.env[key] = value;
        }
    }
});

describe('resolveSwarmOrchestratorBase', () => {
    it('preserves an explicit swarm base override', () => {
        expect(resolveSwarmOrchestratorBase('http://127.0.0.1:5001/')).toBe('http://127.0.0.1:5001');
    });

    it('reuses the live hypernexus lock when no explicit override is supplied', () => {
        const configDir = mkdtempSync(path.join(os.tmpdir(), 'swarm-lock-'));
        process.env.HYPERNEXUS_CONFIG_DIR = configDir;
        writeFileSync(path.join(configDir, 'lock'), JSON.stringify({ host: '0.0.0.0', port: 4321 }));

        expect(resolveSwarmOrchestratorBase()).toBe('http://127.0.0.1:4321');
    });

    it('returns null when no orchestrator base is configured', () => {
        const configDir = mkdtempSync(path.join(os.tmpdir(), 'swarm-lock-empty-'));
        process.env.HYPERNEXUS_CONFIG_DIR = configDir;
        delete process.env.HYPERNEXUS_ORCHESTRATOR_URL;
        delete process.env.HYPERNEXUS_TRPC_UPSTREAM;
        delete process.env.NEXT_PUBLIC_HYPERNEXUS_ORCHESTRATOR_URL;
        delete process.env.NEXT_PUBLIC_AUTOPILOT_URL;

        expect(resolveSwarmOrchestratorBase()).toBeNull();
    });
});
