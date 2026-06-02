import { Installer } from '../dist/installer.js';

async function install() {
<<<<<<<< HEAD:packages/hypernexus-supervisor/scripts/install_to_antigravity.js
    console.log("Installing HyperNexus Supervisor to Antigravity...");
========
    console.log("Installing Hypercode Supervisor to Antigravity...");
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/hypercode-supervisor/scripts/install_to_antigravity.js
    // Default path is already set in Installer class to:
    // C:\Users\hyper\AppData\Roaming\Antigravity\User\mcp.json
    const installer = new Installer();

    try {
        const result = await installer.install();
        console.log(result);
    } catch (err) {
        console.error("Installation failed:", err);
        process.exit(1);
    }
}

install();
