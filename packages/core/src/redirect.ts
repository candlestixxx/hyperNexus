// MCP stdio requires stdout to remain pristine JSON-RPC output only.
// This file must be imported at the very top of the entry point to prevent protocol corruption during ESM import evaluation.

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
console.error("[HyperNexus Core] Stdio redirection active.");
