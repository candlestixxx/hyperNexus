
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
        const { ensureBackgroundCoreRunning } = await import('./backgroundCoreBootstrap.js');
        void ensureBackgroundCoreRunning({
            waitForReady: false,
            log: (message, ...optionalParams) => console.error(message, ...optionalParams),
        }).then((result) => {
            if (result.status === 'spawned') {
                console.error(`[HyperNexus Core] Background control-plane bootstrap requested (PID: ${result.pid ?? 'unknown'}).`);
            }
        }).catch((error) => {
            console.error('[HyperNexus Core] Background control-plane bootstrap failed:', error);
        });

        const { MCPServer } = await import('./MCPServer.js');
        const mcp = new MCPServer({ skipWebsocket: true });
        await mcp.start();
        console.error("[HyperNexus Core] MCP Server Stdio Entry Point Started.");
    } catch (err) {
        console.error("Failed to start MCP server:", err);
        process.exit(1);
    }
}

main();
