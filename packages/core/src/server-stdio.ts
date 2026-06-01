
import './redirect.js';
import './debug_marker.js';
import { MCPServer } from './MCPServer.js';

async function main() {
    process.on('unhandledRejection', (reason) => {
        console.error('[HyperNexus Core] Unhandled promise rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
        console.error('[HyperNexus Core] Uncaught exception:', error);
        process.exit(1);
    });

    try {
        const mcp = new MCPServer({ skipWebsocket: true, skipRepoGraph: true, minimal: true });
        await mcp.start();
        console.error("[HyperNexus Core] MCP Server Stdio Entry Point Started.");
    } catch (err) {
        console.error("Failed to start MCP server:", err);
        process.exit(1);
    }
}

main();
