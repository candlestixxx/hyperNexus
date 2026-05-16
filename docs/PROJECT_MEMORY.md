[PROJECT_MEMORY]

## 1. Dynamic Tool Discovery & Registry (ToolRAG)
**The Problem:** The MCP ecosystem has over 25,000 tools. Static loading exhausts the LLM context window (imposing a 32% token overhead penalty).
**The Converging Solution:** "RAG but for tools." Embed tool names only and fetch full JSON schemas strictly on-demand.
*   **Borg Implementation:** Build `borg-tool-registry` to index all discovered MCP servers, embed schemas using SQLite Vector Search, and inject only the 3-5 most relevant tools per query.

### 3. Core Architectural Patterns
- **Kernel/Control Plane Split:**
    - **Kernel:** Deterministic execution, memory, and routing (being migrated toward `go/` and `@nexus/kernel`).
    - **Control Plane:** Dashboards, session management, and operator UI (`apps/web`, `packages/core`).
- **Active Memory Substrate:**
    - **Heat-Based Tiering:** Entries have a `heat_score` (0-100). Utility increases heat; time causes exponential decay (24h half-life).
    - **Feedback Loops:** Tool success/failure directly modifies the heat of the context used to achieve that outcome.
- **Provider Routing:**
    - Uses a waterfall fallback system. If one model/provider quota is exhausted, it automatically falls back to the next best available resource.
- **Progressive Disclosure:**
    - Tools and Skills are ranked and disclosure is limited to the most relevant entries based on the active goal.

### 4. Monorepo Structure & Module Roles
- **`packages/core`:** The central hub ("Brain") of the TypeScript control plane. It hosts tRPC routers, session logic, and bridges to the Go sidecar.
- **`packages/memory`:** The implementation layer for LanceDB and vector-based storage.
- **`go/`:** The Go Sidecar (Port 4300). Currently serves as a high-performance state authority and BM25 ranking engine, mirroring and bridging TypeScript services.
- **`apps/web`:** The primary operator dashboard for managing sessions and visualizing the knowledge graph.
- **`packages/tools`:** Contains functional tool implementations (Read, Write, Shell, etc.) shared across CLI and Web surfaces.

### 5. Technical Decisions & Constraints
- **Shell Hardening:** `child_process.exec` is strictly prohibited. All command execution must use `spawn` with tokenized argument arrays and `shell: false`.
- **Environment:** Standardized on Node 24 and Go 1.24.3. Port 443 is restricted; local caches/binaries must be used for dependency management.
- **Version Authority:** Versioning is synchronized globally. The current baseline is `1.0.0-alpha.57`.

### 6. Roadmap: The Autonomy Path
The next immediate milestones involve:
1.  **Autonomous Healer:** Multi-turn fix-verify-retry loop (Implemented).
2.  **Fleet Management:** Extending Nexus to manage multiple concurrent "HyperCode" sessions with shared organizational memory.
3.  **Assimilation:** Systematically migrating high-performance logic (ranking, sync, memory) from TypeScript into the native Go kernel.

### 1. Identity & Vision: The AI Hypervisor
The project has evolved from its origin as "Borg" into a dual-brand architectural vision:
- **Nexus:** The underlying coordination kernel or "AI Hypervisor." It manages active memory, tool routing, and orchestration.
- **HyperCode:** The flagship, autonomous developer-facing coding product powered by the Nexus kernel.

The "AI Hypervisor" model treats AI models as compute resources and tools as peripheral drivers, with Nexus acting as the management layer that optimizes model selection, context management, and execution loops.

### 2. Current State (v1.0.0-alpha.56)
The project is currently in the transition between **Phase 1 (Active Memory)** and **Phase 2 (Autonomy Loop)**.
- **Phase 1 Status:** Complete. The foundational memory substrate is production-ready.
- **Phase 2 Status:** Initiated. Focus has shifted to self-healing reactors and the "execute-fix-verify-retry" autonomous loop.

### 3. Core Architectural Patterns
- **Kernel/Control Plane Split:**
    - **Kernel:** Deterministic execution, memory, and routing (being migrated toward `go/` and `@nexus/kernel`).
    - **Control Plane:** Dashboards, session management, and operator UI (`apps/web`, `packages/core`).
- **Active Memory Substrate:**
    - **Heat-Based Tiering:** Entries have a `heat_score` (0-100). Utility increases heat; time causes exponential decay (24h half-life).
    - **Feedback Loops:** Tool success/failure directly modifies the heat of the context used to achieve that outcome.
- **Provider Routing:**
    - Uses a waterfall fallback system. If one model/provider quota is exhausted, it automatically falls back to the next best available resource.
- **Progressive Tool Disclosure:**
    - Instead of flooding context with all tools, Nexus uses semantic ranking to disclose only relevant tools based on the active goal.

### 4. Monorepo Structure & Module Roles
- **`packages/core`:** The central hub ("Brain") of the TypeScript control plane. It hosts tRPC routers, session logic, and bridges to the Go sidecar.
- **`packages/memory`:** The implementation layer for LanceDB and vector-based storage.
- **`go/`:** The Go Sidecar (Port 4300). Currently serves as a high-performance state authority and BM25 ranking engine, mirroring and bridging TypeScript services.
- **`apps/web`:** The primary operator dashboard for managing sessions and visualizing the knowledge graph.
- **`packages/tools`:** Contains functional tool implementations (Read, Write, Shell, etc.) shared across CLI and Web surfaces.

### 5. Technical Decisions & Constraints
- **Shell Hardening:** `child_process.exec` is strictly prohibited. All command execution must use `spawn` with tokenized argument arrays and `shell: false`.
- **Environment:** Standardized on Node 24 and Go 1.24.3. Port 443 is restricted; local caches/binaries must be used for dependency management.
- **Version Authority:** Versioning is synchronized globally. The current baseline is `1.0.0-alpha.56`.

### 6. Roadmap: The Autonomy Path
The next immediate milestones involve:
1.  **The Healer Loop:** Implementing the full `execute-fix-verify-retry` autonomous cycle within the `HealerReactor`.
2.  **Fleet Management:** Extending Nexus to manage multiple concurrent "HyperCode" sessions with shared organizational memory.
3.  **Assimilation:** Systematically migrating high-performance logic (ranking, sync, memory) from TypeScript into the native Go kernel.

### 7. Governance & Intelligence
- **Supervisor/Council Pattern:** The system is designed to run under the supervision of an "Architect" or "Council" of models that verify plans before implementation.
- **Passive Harvesting:** The system automatically extracts facts and patterns from agent traffic to populate its L2 "Vault" memory without manual operator intervention.

---
*Last updated: Session v1.0.0-alpha.56*
# AI Hypervisor (Nexus) - Comprehensive Architectural Memory

This document summarizes the foundational architecture, established patterns, and strategic decisions of the project as of version **1.0.0-alpha.56**.

## 1. Strategic Identity: Nexus & HyperCode
The project has successfully pivoted from "Borg" to a dual-brand infrastructure model:
*   **Nexus (The Kernel/Hypervisor):** The underlying coordination runtime and "AI Hypervisor." It treats LLMs as "guest operating systems" and manages the low-level memory, routing, and execution buses.
*   **HyperCode (The Product):** The user-facing, local-first autonomous coding environment powered by the Nexus kernel.

## 2. Active Tiered Memory Substrate (Implemented Phase 1)
*   **Heat Scoring (0-100):** Every memory entry tracks utility. Heat increases on access and decays exponentially (24-hour half-life).
*   **Tiered Hierarchy:** L1 (Working Memory, heat > 80) is promoted to context; L2 (Vault) is for semantic recall.
*   **Tool-Outcome Feedback:** `MemoryManager.recordToolOutcome()` boosts the heat of successful patterns and demotes failures.

## 3. "Kernel / Control Plane" Topology
*   **/kernel**: Deterministic brain (runtime, memory, router).
*   **/control-plane**: Observer layer (UI, Telemetry).

## 4. State Authority & The Sidecar Pattern
*   **Go Sidecar (Port 4300):** State authority and BM25 ranking.
*   **TS Bridge (Port 4100):** Primary control-plane bridge and tRPC host.

## 5. Intelligence Management: Progressive Disclosure
*   **Decision System:** Ranked discovery and LRU eviction ensures only 3-5 tools/skills are in the active working set.

## 6. Hardened Execution & Security
*   **Standard:** Tokenized argument arrays with `shell: false` for all command executions.
*   **Parity Principle:** 1:1 behavioral and schema parity for tools expected by proprietary models (e.g., Claude Code).

---
### Meta-Protocol for Future Sessions
1.  **Truth over Fiction:** Dashboards must reflect real state.
2.  **Autonomous Momentum:** Proceed through Phase 2 (Autonomy/Self-Healing).
3.  **Documentation Sync:** Every version bump syncs all meta files and manifests.
