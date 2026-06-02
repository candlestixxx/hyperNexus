# Memory

> **CRITICAL**: Read `docs/UNIVERSAL_LLM_INSTRUCTIONS.md` first.

## Ongoing Observations & Codebase Knowledge

### 1. The Great Config Split (Fixed in 1.0.0-alpha.1)
**Observation**: Historically, `mcp.jsonc` in the user directory was intended to act as the sole source of truth. However, as SQLite was introduced, a destructive cycle emerged where `McpConfigService.syncWithDatabase()` would wipe out DB tools (and their `always_on` status) if `mcp.jsonc` lacked `_meta.tools`.
**Resolution**: We completely decoupled the manual config from the database. The system now exports a unified `.hypernexus/mcp-cache.json` which the lightweight `stdioLoader` reads. DB tools are no longer destroyed by an empty JSON configuration.

### 2. The `always_on` Advertising Filter
**Observation**: `getDirectModeTools()` in `MCPServer.ts` enforces an "ULTRA-STREAMLINED ADVERTISING" filter. It ONLY returns tools marked `always_on`. If no tools have this flag, it defaults to returning *only* the internal meta-tools (`search_tools`, `load_tool`, etc.).
**Implication**: This is intended behavior to keep LLM context clean. Models are expected to use `search_tools` and `load_tool` to dynamically fetch what they need.

### 3. Config Directory Resolution
**Observation**: `getHyperNexusConfigDir()` historically hardcoded `os.homedir() + '/.hypernexus'`. 
**Resolution**: It now dynamically respects `process.env.HYPERCODE_CONFIG_DIR`, and falls back to checking `process.cwd()/mcp.jsonc` before defaulting to the user's home directory. This allows local repository configurations to be authoritative during development.

### 4. Binary Extraction Strategy
**Observation**: The project has aggressive plans to split into distinct daemons (`hypernexusd`, `hypernexusmcpd`, etc.).
**Implication**: DO NOT split these prematurely. Follow the modular-monolith-first rule defined in `UNIVERSAL_LLM_INSTRUCTIONS.md`. Treat the Go workspaces as experimental bridges for now.

### 5. better-sqlite3 and Node 24 (Fixed 2026-04-08)
**Observation**: `better-sqlite3@12.6.2` requires native `.node` bindings compiled for the exact Node version. Node v24.10.0 broke compatibility.
**Resolution**: `pnpm rebuild better-sqlite3` works (uses prebuild-install). `node-gyp rebuild` does NOT work on Node 24.
**Implication**: After any `pnpm install`, you MUST run `pnpm rebuild better-sqlite3` on Node 24. Add this to startup checks.

### 6. Gemini Model Names Change Frequently (Updated 2026-04-08)
**Observation**: `gemini-2.0-flash` was deprecated and returns 404. The current free-tier model is `gemini-2.5-flash`.
**Implication**: When adding Gemini models, verify current availability at https://ai.google.dev/gemini-api/docs/models. The ProviderRegistry should be updated whenever Google renames models.

### 7. Dashboard Polling Creates Noise
**Observation**: The Next.js dashboard polls multiple endpoints every 5 seconds, generating a constant stream of HTTP requests. If any endpoint returns 404 (like `/api/scripts`), it creates log spam and wasted cycles.
**Resolution**: Added REST API bridge routes in `orchestrator.ts` that serve the same data as the tRPC router, so the dashboard's native-control-plane fetch path works cleanly.

### 8. Worktree Complexity
**Observation**: The project uses git worktrees with the submodule structure at `.git/modules/hypernexus`. The actual working directory (`hypernexus-push`) can become detached from `main`.
**Resolution**: Manually update the worktree HEAD file to point to `refs/heads/main`. Don't try to use `git checkout main` across worktrees.

### 9. Go Sidecar Version Injection (Updated 2026-05-25)
**Observation**: The Go binary versioning is now managed by a topological sync across the monorepo.
**Resolution**: `go/internal/buildinfo/buildinfo.go` uses `var Version` injected at build time. Always use `scripts/build-go.sh` or the ldflags pattern to build the Go binary.

### 10. Submodule Stash Pop Conflicts (Added 2026-04-08)
**Observation**: When updating submodules with `git merge origin/main` followed by `git stash pop`, merge conflicts appear in stash-applied files. Using `git checkout --ours` resolves to the merged main version, which is typically correct for our local changes.
**Implication**: When submodules have both upstream updates and local stashed changes, merge upstream first, then pop stash, then resolve conflicts keeping HEAD (the merged result).

### 11. Meta-Tool Decision System is Already Implemented (Added 2026-04-08)
**Observation**: The MCP meta-tool decision system was listed as TODO but is actually fully implemented in `packages/core/src/mcp/`.
**Implication**: Do NOT re-implement. Focus on improving ranking quality, adding more profiles, and verifying the dashboard inspector shows all this data.

### 12. Package.json Sync Script Pattern (Updated 2026-05-25)
**Observation**: There are 40+ package.json files across the monorepo that all need version syncing. The Node.js script pattern (`scripts/sync-versions.js`) is more reliable than PowerShell subexpressions for this.
**Implication**: Every version bump should sync all files using the Node.js helper to avoid security blocks on shell commands.

### 13. Multi-Model Pair Programming Pattern (Added 2026-04-08)
**Observation**: For complex tasks, a single model often hallucinates or misses edge cases. A multi-model squad with rotating roles (Planner, Implementer, Tester) provides much higher reliability.
**Resolution**: Implemented `PairOrchestrator` which coordinates Claude, GPT, and Gemini in a shared chat history.

### 14. Preemptive Tool Advertisement (Added 2026-04-08)
**Observation**: Models waste tokens and latency searching for tools.
**Resolution**: Implemented `ToolPredictor` which uses a fast LLM turn to predict needed capabilities and preloads them into the working set before the main agent turn.

### 15. Go Native Tool Execution Pattern (Added 2026-04-08)
**Observation**: Relying on the Node control plane for every tool call creates a single point of failure and higher latency.
**Resolution**: Ported core standard library and parity tools (read, write, bash, edit) to native Go in `go/internal/tools/`.

### 16. Package Build Dependency in Monorepo (Added 2026-04-08)
**Observation**: Adding new files and exports to sub-packages requires an explicit build before consumers can see changes.
**Resolution**: Run `pnpm build` in the affected sub-packages before building the consumer.

### 17. Multi-Model Swarm Pattern (Added 2026-04-08)
**Observation**: For complex, multi-stage projects, a fixed implementation loop is sometimes too rigid.
**Resolution**: Implemented `SwarmController` which manages a team of models and evaluates progress using a "Critic" model turn.

### 18. A2A Communication Broker (Added 2026-04-08)
**Observation**: Decentralized agents need a structured way to hand off tasks and share state.
**Resolution**: Implemented `A2ABroker` (TS and Go) that routes typed messages based on agent IDs.

### 19. Session Archiving Strategy (Added 2026-04-08)
**Observation**: Long-term retention of raw JSON sessions is noisy and inefficient.
**Resolution**: Implemented `MemoryArchiver` to convert sessions to clean plaintext, extract key facts via LLM, and store them in a compressed ZIP archive.

### 20. A2A WebSocket Integration (Added 2026-04-08)
**Observation**: The `A2ABroker` needs to reach beyond the Node process to dashboard components and remote agents.
**Resolution**: Implemented a WebSocket listener for `A2A_SIGNAL` types.

### 21. A2A Liveness and Pruning (Added 2026-04-08)
**Observation**: Decentralized agents can crash or become unreachable, leaving stale entries in the broker pool.
**Resolution**: Implemented a heartbeat mechanism in `A2ABroker`.

### 22. Deep Link Insight (Added 2026-04-08)
**Observation**: Basic webpage crawling is insufficient for automated control-plane growth.
**Resolution**: Enhanced the Go Link Crawler with an LLM turn that explicitly looks for MCP servers, skills, and APIs.

### 23. A2A Request-Response Pattern (Added 2026-04-08)
**Observation**: Simple broadcast signals are insufficient for negotiation or state lookups between agents.
**Resolution**: Implemented the `query` pattern in `A2ABroker`.

### 24. A2A Auditability (Added 2026-04-08)
**Observation**: Decentralized signaling makes it hard to understand why a swarm decision was made.
**Resolution**: Implemented `A2ALogger` in TS and Go.

### 25. Standard Tool Visibility Fix (Added 2026-04-08)
**Observation**: The "Ultra-Streamlined Advertising" filter was too aggressive.
**Resolution**: Modified `getDirectModeTools` to treat standard library and tool parity aliases as `alwaysOn` by default.

### 26. Directory Clutter Reduction (Added 2026-04-08)
**Observation**: Hash-based directory structure for session archives was creating thousands of subdirectories.
**Resolution**: Flattened the archive structure in `ImportedSessionStore`.

### 27. Multi-Turn Agent Coordination (Added 2026-04-08)
**Observation**: Simple broadcast signaling is not enough for complex handoffs.
**Resolution**: Implemented the `query` pattern in `A2ABroker` (TS and Go).

### 28. Native Go Auditing (Added 2026-04-08)
**Observation**: Without a native logger in Go, signal traffic through the sidecar was invisible.
**Resolution**: Ported `A2ALogger` to Go.

### 29. Go Native Skill Management (Added 2026-04-08)
**Observation**: The Go sidecar previously relied on the Node server to list and save skills.
**Resolution**: Implemented `SkillStore` in Go.

### 30. Monorepo Build Sequencing (Added 2026-04-08)
**Observation**: Changes to foundational packages often fail to propagate to consumers due to missing builds.
**Resolution**: Ensure a full topological build when introducing new protocol members.

### 31. Swarm Transcript Observability (Added 2026-04-08)
**Observation**: High-level swarm coordination was previously a "black box" in the dashboard.
**Resolution**: Implemented the `getSwarmTranscript` tRPC endpoint and "Neural Transcript" tab.

### 32. Native Go Configuration Management (Added 2026-04-08)
**Observation**: Go sidecar dependency on Node server for reading `mcp.jsonc` limited its utility.
**Resolution**: Implemented `ConfigManager` in Go.

### 33. Specialized Swarm Personas (Added 2026-04-08)
**Observation**: Generic system prompts for swarm participants lead to role confusion.
**Resolution**: Implemented specialized system prompts for `Planner`, `Implementer`, `Tester`, and `Critic` roles.

### 34. Free-Tier Fallback Resilience (Added 2026-04-08)
**Observation**: Frequent quota exhaustion on frontier models makes the system unreliable.
**Resolution**: Expanded the fallback chain to include multiple new free-tier options.

### 35. Automated Browser Memory Ingestion (Added 2026-04-08)
**Observation**: Manually clicking "Sync to Memory" is a friction point.
**Resolution**: Implemented a `MutationObserver` in the extension's `MemoryCaptureService`.

### 36. Persistent A2A Audit Logs (Added 2026-04-08)
**Observation**: Live A2A traffic in the dashboard is transient.
**Resolution**: Created a dedicated dashboard page that reads the `a2a_traffic.jsonl` log file from disk.

### 37. Runtime Dependency Hygiene (Added 2026-04-08)
**Observation**: Adding TypeScript dev-dependencies is insufficient for runtime features.
**Resolution**: Always verify implementation libraries are in the `dependencies` block.

### 38. Cross-Runtime Handshake Parity (Added 2026-04-08)
**Observation**: Agents in Go sidecar were previously unable to participate in task-bidding.
**Resolution**: Implemented the native Go Handshake logic, matching the TS protocol.

### 39. Go Namespace Conflict Management (Added 2026-04-08)
**Observation**: Go's package-based shadowing rules can cause built-in packages to become "undefined".
**Resolution**: Added an explicit import alias when importing internal packages that collide with standard library names.

### 40. Unified Knowledge Base Persistence (Added 2026-04-08)
**Observation**: The system previously had a "split brain" knowledge base.
**Resolution**: Fully integrated the Go native `SkillStore` with the `HighValueIngestor`.

### 41. Bidding Process Visibility (Added 2026-04-08)
**Observation**: Task negotiation between agents was an invisible internal state.
**Resolution**: Implemented negotiation tracking in `A2ABroker` and dashboard.

### 42. Truthful Sidecar Status (Added 2026-04-08)
**Observation**: Go sidecar's status endpoint returned hardcoded values.
**Resolution**: Updated Go server to check actual state of native components.

### 43. Automated Tool Integration (Added 2026-04-08)
**Observation**: Discovered tools and skills from Link Crawler were previously stagnant.
**Resolution**: Updated `HighValueIngestor` to automatically promote analyzed technical resources.

### 44. Native Go Context Harvesting (Added 2026-04-08)
**Observation**: Go sidecar's lack of a context harvester meant its memory view was out of sync.
**Resolution**: Implemented `MemoryReactor` in Go for autonomous semantic chunking.

### 45. Healer Service & L2 Vault Bridge (Added 2026-05-25)
**Observation**: Bridged the TypeScript `healerRouter.ts` to the Go-native `HealerService` and `VectorStore`. Established a pattern for mapping Go's snake_case JSON output to the PascalCase expected by the TS UI. This ensures the Go kernel remains the ground truth for system health while maintaining UI compatibility.
**Resolution**: Added a `totalCount` metric to the vault queries to fix inaccurate UI counters.

### 46. Go Sidecar JSON Serialization (Added 2026-05-25)
**Observation**: Learned that script-based code updates can inadvertently double-escape `fmt.Sprintf` tokens (`%%s`) in Go source code. Always perform a manual truth-pass or automated sed correction after bulk file writes.
**Resolution**: Established the pattern of using the `controlplane.MemoryVault` interface to decouple kernel services from the persistence implementation.

### 47. TypeScript Compile Security & Telemetry Alignment (Added 2026-05-25)
**Observation**: The environment-telemetry model updates introduced compile discrepancies in `NormalizedQuotaService.ts` due to missing properties on core `types.ts` interfaces (`ProviderAuthState`, `ProviderQuotaSnapshot`).
**Resolution**: Formally defined `ProviderAuthTruth` and added the missing telemetry properties (`authTruth`, `quotaConfidence`, `quotaRefreshedAt`) to `packages/core/src/providers/types.ts`. Eliminated all redundant `@ts-expect-error` directives, achieving a 100% clean build.

*Update this file whenever a major systemic pattern, recurring bug, or deep architectural quirk is discovered.*
<<<<<<< HEAD

### 9. tRPC Type Recursion Limit (Discovered 2026-04-29)
**Observation**: The appRouter has 67+ procedures. When `@trpc/react-query` tries to infer `AppRouter` types for the React client, TypeScript hits its internal type recursion depth limit and collapses to error strings like `"The property 'useContext' in your router collides with a built-in method"`.
**Resolution**: Use `createTRPCReact<any>()` instead of `createTRPCReact<AppRouter>()`. Type safety comes from the server-side router definition. A dynamic `require('@trpc/react-query')` is needed because pnpm strict isolation means `@trpc/react-query` isn't accessible from `packages/ui/node_modules`.

### 10. Turbo v2 Requires `extends` in All Package turbo.json (Discovered 2026-04-29)
**Observation**: Turbo v2.8.x requires `"extends": ["//"]` in every non-root `turbo.json`. Without it, the build fails with "add extends key here".
**Resolution**: Add `"extends": ["//"]` to all package-level turbo.json files.

### 11. Duplicate VS Code Extension Package (Discovered 2026-04-29)
**Observation**: `apps/vscode` and `packages/vscode` had the same package name (`hypernexus-vscode-extension`), causing Turbo workspace collision.
**Resolution**: Removed `packages/vscode` (stale, alpha.34). `apps/vscode` is canonical (alpha.36+).

### 12. CLI Version Read Path (Discovered 2026-04-29)
**Observation**: The CLI `getVersion()` tried to read `VERSION.md` from `../../../..VERSION.md` relative to `__dirname` in compiled output. The compiled output is at `packages/cli/dist/cli/src/index.js`, so the path resolved to `packages/cli/VERSION` (wrong).
**Resolution**: Changed to `../../../../../VERSION` (5 levels up) and filename to `VERSION` (not `VERSION.md`).

### 13. @hypernexus/* Stub Package Architecture (Discovered 2026-04-29)
**Observation**: The core package imports from 8 `@hypernexus/*` packages that don't have real implementations. TypeScript compilation and Node runtime both fail without them.
**Resolution**: Created stub packages in `packages/` with three layers:
  - `src/index.ts` — TS type stubs (for `tsc --noEmit` via `exports.types` condition)
  - `dist/index.js` — ESM runtime stubs (for Node via `exports.import` condition)
  - `dist/index.d.ts` — Type declarations (fallback resolution)
  Key insight: `@hypernexus/types` must export real zod schemas (tRPC `.input()` calls `'~standard' in schema`). `@hypernexus/ai` must export real classes for `extends` (NormalizedQuotaService extends QuotaService). All others can be `undefined` stubs.
  The `exports` field in package.json must have both `import` and `types` conditions pointing to the correct files. Without `exports`, tsc resolves incorrectly (230 errors).
**Implication**: As real implementations are built, each stub can be replaced incrementally. The zod schemas in `@hypernexus/types` are already functional and used by tRPC routers.

### 14. Dashboard Utility Stubs Must Match Usage Patterns (Discovered 2026-04-29)
**Observation**: Auto-generated stubs returning `(() => ({})) as any` crash Next.js build when pages call `.map()` on the result or access properties like `.topTools`.
**Resolution**: Utility functions must return the correct base type: arrays for anything used with `.map()`, objects for property access, strings for display, numbers for timestamps. The heuristic: function names containing "rows/records/sections/items/list/groups" → `[]`, "label/title/hint/message" → `''`, everything else → `{}`.
**Implication**: When replacing stubs with real implementations, the return type contracts are already implicitly defined by page usage.

### 15. Next.js useSearchParams Requires Suspense Boundary (Discovered 2026-04-29)
**Observation**: Pages using `useSearchParams()` from `next/navigation` fail during static prerendering with "useSearchParams() should be wrapped in a suspense boundary".
**Resolution**: Wrap the default export in a `<Suspense>` boundary. Pattern: `export default function PageWrapper() { return <Suspense fallback={...}><Page /></Suspense>; }` then rename the original to `function Page()`.

### 16. tRPC Service Dependency Chain (Discovered 2026-04-29)
**Observation**: 8 tRPC routers crash with `Cannot read properties of undefined` when MCP services aren't initialized. Root cause: `getMcpServer()` returns `{}` when server isn't ready, then getters like `getSuggestionService()` return `undefined`, and calling methods on `undefined` crashes.
**Resolution**: Wrap service calls in try/catch with safe defaults: `try { return getService()?.method() ?? []; } catch { return []; }`
**Implication**: When running with `--no-mcp`, all routers should return empty/safe defaults instead of 500 errors.

### 17. Server Startup Takes ~45 Seconds (Discovered 2026-04-29)
**Observation**: `hypernexus start --no-mcp` takes ~45 seconds to fully bind port 4000. The MCPServer imports 53+ phases before Express starts listening.
**Implication**: CLI health checks and tests must wait at least 50 seconds before testing endpoints. The `hypernexus status` command uses `AbortSignal.timeout(3000)` which may not be enough during startup.

### 18. Commander.js Global --json Doesn't Merge to Subcommands (Discovered 2026-04-29)
**Observation**: When `--json` is registered as a global option on the program AND as a subcommand option, the subcommand `opts` object is empty `{}`. The global option consumes the flag.
**Resolution**: Use `cmd.optsWithGlobals()` in the action handler: `async (opts, cmd) => { const allOpts = cmd ? cmd.optsWithGlobals() : opts; const isJson = allOpts.json === true; }`

### 19. Turbopack Cache Corruption (Discovered 2026-04-29)
**Observation**: Next.js 16 Turbopack crashes with `range start index 1607525553 out of range for slice of length 468465` in static_sorted_file.rs. The `.next/` cache gets corrupted.
**Resolution**: Delete `apps/web/.next/` and rebuild. Set `turbopack.root` in `next.config.js` to the monorepo root.
**Implication**: If the dashboard fails to start, first try clearing `.next/`.

### 20. Dashboard tRPC Proxy Port Mismatch (Discovered 2026-04-30)
**Observation**: The Next.js dashboard's tRPC API route (`apps/web/src/app/api/trpc/[trpc]/route.ts`) defaulted to `http://127.0.0.1:3001/trpc` (MCP WebSocket port) instead of `http://127.0.0.1:4000/trpc` (tRPC server). All dashboard data queries returned 502 errors.
**Resolution**: Changed `DEFAULT_UPSTREAM_TRPC_URL` from port 3001 to 4000. Can also be overridden via `HYPERNEXUS_TRPC_UPSTREAM` env var.
**Implication**: This was the root cause of empty dashboard data. The proxy is the only way the dashboard reaches the TS server.

### 21. Lightweight MCP Init Without Full Discovery (Discovered 2026-04-30)
**Observation**: When `--no-mcp` is used, `global.mcpServerInstance` is never set, causing ALL tRPC routers to return empty objects from `getMcpServer()`. Session supervisor, memory manager, and other services are unavailable.
**Resolution**: Added a lightweight init path that creates MCPServer with `skipAutoDrive: true, skipStdio: true` and sets `global.mcpServerInstance`. This gives routers their dependencies without the 45-second discovery phase.
**Implication**: Next server restart with `--no-mcp` will have functional tRPC routers (sessions, memory, agents) even without MCP tool discovery.

### 22. MCP Inventory Known When Persisted Data Exists (Discovered 2026-04-30)
**Observation**: `startupStatus` showed `inventoryReady: false` even though the database had 135 persisted servers and 1302 tools. The `inventoryKnown` check required `aggregatorStatus.initialized` which is only set during full MCP startup.
**Resolution**: Added `|| persistedServerCount > 0` to the `inventoryKnown` condition in `startupStatus.ts`.
**Implication**: `hypernexus health` will now correctly report inventory as ready when data exists in the database.

### 23. CLI Provider Auto-Detection (Discovered 2026-04-30)
**Observation**: 8 API keys were available in environment variables (OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY, GEMINI_API_KEY, XAI_API_KEY, DEEPSEEK_API_KEY, MISTRAL_API_KEY, OPENROUTER_API_KEY) but `hypernexus provider list` showed "No providers configured".
**Resolution**: Added environment variable scanning as fallback when no providers are explicitly configured. Shows provider name, "● Available" status, and the env var source.
**Implication**: Users see their available providers immediately without explicit configuration.
### 24. ESM Console Redirection in MCP Stdio Servers (Discovered 2026-06-01)
**Observation**: In ES Modules (ESM), static `import` statements are hoisted and evaluated before any code statements in the module body run. This means inline console interception (e.g. `console.log = console.error`) in a stdio entrypoint file will execute *after* all imported modules (and their transitive dependencies) have loaded. If any imported module prints messages to stdout during load/instantiation (like `SessionManager` or database migrations), it corrupts the stdio protocol stream and causes the client's `initialize` handshake to fail (e.g. `invalid character 'D' looking for beginning of value`).
**Resolution**: Move the console redirection logic to a separate helper file (e.g., `packages/core/src/redirect.ts`) and import it statically as the absolute first line in the entrypoint file (`import './redirect.js';`). Since Node.js processes imports in declaration order, this ensures the redirection executes before any other module's evaluation runs.
**Implication**: Never put any import statement before `import './redirect.js';` in `server-stdio.ts` or other stdio entry points.

=======
>>>>>>> origin/jules-11468118918326359250-8f2d9620
