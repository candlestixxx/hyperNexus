import { z } from 'zod';
import fs from 'fs';
import path from 'path';

export const MCPServerConfigSchema = z.object({
    command: z.string(),
    args: z.array(z.string()).optional().default([]),
    env: z.record(z.string()).optional().default({}),
    enabled: z.boolean().optional().default(true)
});

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>;

<<<<<<<< HEAD:packages/core/src/config/HyperNexusConfig.ts
export const HyperNexusConfigSchema = z.object({
    mcpServers: z.record(MCPServerConfigSchema).default({})
});

export type HyperNexusConfig = z.infer<typeof HyperNexusConfigSchema>;

export class HyperNexusConfigLoader {
    private static getConfigPath(): string {
        // Look in current working directory (project root)
        return path.join(process.cwd(), 'hypernexus.config.json');
    }

    public static loadConfig(): HyperNexusConfig {
        const configPath = this.getConfigPath();
        if (!fs.existsSync(configPath)) {
            console.warn(`[HyperNexusConfig] No config found at ${configPath}. Using defaults.`);
========
export const HyperNexusConfigSchema = z.object({
    mcpServers: z.record(MCPServerConfigSchema).default({})
});

export type HyperNexusConfig = z.infer<typeof HyperNexusConfigSchema>;

export class HyperNexusConfigLoader {
    private static getConfigPath(): string {
        // Look in current working directory (project root)
        return path.join(process.cwd(), 'hypernexus.config.json');
    }

    public static loadConfig(): HyperNexusConfig {
        const configPath = this.getConfigPath();
        if (!fs.existsSync(configPath)) {
            console.warn(`[HyperNexusConfig] No config found at ${configPath}. Using defaults.`);
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/config/HyperNexusConfig.ts
            return { mcpServers: {} };
        }

        try {
            const raw = fs.readFileSync(configPath, 'utf-8');
            const json = JSON.parse(raw);
<<<<<<<< HEAD:packages/core/src/config/HyperNexusConfig.ts
            return HyperNexusConfigSchema.parse(json);
        } catch (error) {
            console.error(`[HyperNexusConfig] Failed to load config:`, error);
========
            return HyperNexusConfigSchema.parse(json);
        } catch (error) {
            console.error(`[HyperNexusConfig] Failed to load config:`, error);
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/config/HyperNexusConfig.ts
            return { mcpServers: {} };
        }
    }
}
