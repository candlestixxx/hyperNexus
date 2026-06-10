# Roadmap: AI HyperNexus (HyperNexus & HyperCode)

_Last updated: 2026-06-10, version 1.0.0-alpha.65_

## Status Legend

- **Stable** — Production-intended, tested, maintained
- **Beta** — Usable, still evolving
- **Experimental** — Active R&D, not dependable
- **Vision** — Directional only

## Completed (v1.0.0-alpha.62)

### 1. HyperNexus Kernel: Active Memory Substrate (STABLE)
- **Biological Tiered Memory**: L1 (Scratchpad), L2 (Vault), L3 (Archive) implementation in Go.
- **Heat Mechanics**: Implemented utility-based scoring and temporal decay for all memories.
- **Semantic Search**: Integrated `sqlite-vec` for hyper-fast, local-first context matching.

### 2. Default Harness & GUI Integrations (BETA)
- **Included Default Harnesses**: Integrated candlestixxx's **Pi-Mono** (`pi-cli`) and **Hermes Agent** as default included agent harnesses.
- **Graphical GUI Wrappers**: Formally integrated candlestixxx's **Tabby** (`tabby-go`) and **Warp GUI** as graphical CLI wrappers, enabling seamless interactive terminal routing.

### 3. Premium Enterprise Licensing landing (STABLE)
- **Compliance & Tiering Gateway**: Developed a gorgeous dark-themed product landing page at `/` detailing self-hosted Community (Free Personal Use BSL 1.1 / AGPLv3) and Commercial Enterprise Core options.
- **Offline Signature Generator**: Implemented an interactive client-side cryptographic license orchestrator that simulates RSA-4096 / Ed25519 YAML key generation in real-time.

### 4. Robust Testing Suite (STABLE)
- **100% Green Framework**:Hardened tRPC routers, added missing schema procedures (`removeProviderKey`), and eliminated microtask race conditions.
- **Vitest Suite**: Cleanly passes all 120 test files and 778 tests with zero failures.

## Active Sprint: Phase 6 - Enterprise Readiness & MCP Client Testing

### A. Universal Protocol & Attachment (BETA)
- [x] Implement `hypernexus://` protocol handlers for deep-linking.
- [ ] Browser Extension: Implement `hypernexus-attach` to link web-based AI chats directly to the local HyperNexus Kernel.
- [ ] Implement Global Command Hub (Cmd+K) for system-wide HyperCode access.

### B. Enterprise Wrapper Integration (EXPERIMENTAL)
- [ ] Separate the proprietary compliance module (SSO/OIDC, Role-Based Access Control, audit trail logger) from the open-source core.
- [ ] Implement signature validation of signed JSON/YAML enterprise tokens using public-key cryptography (Ed25519).

### C. Context Optimization (VISION)
- [ ] Implement decentralized P2P memory sync across local network hosts using gossip protocols.
- [ ] Context Compression: Integrate native TOON encoding directly into the Go-native `MemoryReactor`.

---
*Outstanding! Magnificent! Insanely Great! The collective grows.*
