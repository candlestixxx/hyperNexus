/**
 * @file mcp-import.ts
 * @description Logic for parsing and preparing bulk MCP server imports from JSON/JSONC config strings.
 */

export type BulkImportResult = {
    servers: Array<{
        name: string;
        type: 'STDIO' | 'SSE' | 'STREAMABLE_HTTP';
        command?: string | null;
        args?: string[];
        env?: Record<string, string>;
        url?: string | null;
        bearerToken?: string | null;
        headers?: Record<string, string>;
    }>;
    importedNames: string[];
};

/**
 * Parses a JSON/JSONC string and returns a list of prepared MCP server definitions for bulk import.
 * Supports standard mcpServers object format or a raw object where keys are server names.
 */
export function buildBulkImportServers(json: string): BulkImportResult {
    if (!json || !json.trim()) {
        return { servers: [], importedNames: [] };
    }

    try {
        // Simple comment stripping for basic JSONC support
        const cleanedJson = json.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        const parsed = JSON.parse(cleanedJson);
        
        let config = parsed;
        
        // Handle common formats: { mcpServers: { ... } } or { ... } (direct map)
        if (parsed && typeof parsed === 'object' && parsed.mcpServers) {
            config = parsed.mcpServers;
        }

        if (!config || typeof config !== 'object' || Array.isArray(config)) {
            return { servers: [], importedNames: [] };
        }

        const servers: BulkImportResult['servers'] = [];
        const importedNames: string[] = [];

        for (const [name, cfg] of Object.entries(config)) {
            if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) continue;
            
            const serverCfg = cfg as any;
            
            // Detect type or default to STDIO
            const type: BulkImportResult['servers'][0]['type'] = 
                serverCfg.type === 'SSE' || serverCfg.type === 'STREAMABLE_HTTP' || serverCfg.type === 'STDIO'
                    ? serverCfg.type
                    : (serverCfg.url ? 'SSE' : 'STDIO');

            servers.push({
                name,
                type,
                command: serverCfg.command || (type === 'STDIO' ? 'npx' : null),
                args: Array.isArray(serverCfg.args) ? serverCfg.args : [],
                env: (serverCfg.env && typeof serverCfg.env === 'object') ? serverCfg.env : {},
                url: serverCfg.url || null,
                bearerToken: serverCfg.bearerToken || null,
                headers: (serverCfg.headers && typeof serverCfg.headers === 'object') ? serverCfg.headers : {},
            });
            importedNames.push(name);
        }

        return { servers, importedNames };
    } catch (error) {
        throw new Error(`Failed to parse MCP config: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
    }
}
