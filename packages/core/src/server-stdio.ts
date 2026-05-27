
// MCP stdio requires stdout to remain pristine JSON-RPC output only.
// This must happen BEFORE any other imports to prevent protocol corruption.
function redirectProtocolUnsafeConsoleMethods(): void {
    const stderr = console.error.bind(console);
    console.log = stderr;
    console.info = stderr;
    console.warn = stderr;
    console.debug = stderr;
    console.trace = stderr;
    console.time = ((label?: string) => { /* no-op */ }) as typeof console.time;
    console.timeEnd = ((label?: string) => { /* no-op */ }) as typeof console.timeEnd;
    console.dir = ((...args: unknown[]) => stderr(...args)) as typeof console.dir;
}
redirectProtocolUnsafeConsoleMethods();

import './debug_marker.js';
import { MCPServer } from './MCPServer.js';

async function main() {
    process.on('unhandledRejection', (reason) => {
        console.error('[Hypercode Core] Unhandled promise rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
        console.error('[Hypercode Core] Uncaught exception:', error);
        process.exit(1);
    });

    try {
        const mcp = new MCPServer({ skipWebsocket: true, skipRepoGraph: true, minimal: true });
        await mcp.start();
        console.error("[Hypercode Core] MCP Server Stdio Entry Point Started.");
    } catch (err) {
        console.error("Failed to start MCP server:", err);
        process.exit(1);
    }
}

main();
