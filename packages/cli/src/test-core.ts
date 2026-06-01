console.log("DEBUG: Starting import test...");
const start = Date.now();
try {
    console.log("DEBUG: Importing @hypernexus/core...");
    const core = await import('@hypernexus/core');
    console.log("DEBUG: @hypernexus/core loaded successfully in " + (Date.now() - start) + "ms");
    console.log("Exports:", Object.keys(core));
} catch (e) {
    console.error("DEBUG: Failed to import @hypernexus/core", e);
}
