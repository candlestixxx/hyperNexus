# Nexus Project Structure

The project follows a "Kernel + Control Plane" architecture:

- **/kernel/runtime**: Managed primarily in `go/internal/orchestration` and `packages/core/src/services`.
- **/kernel/memory**: Located in `packages/memory` and `packages/core/src/services/MemoryManager.ts`.
- **/kernel/router**: Located in `packages/core/src/Router.ts` and `go/internal/mcp/sync.go`.
- **/control-plane**: UI and observability, located in `apps/web` and `packages/ui`.
- **/labs**: Research and experimental archives, located in `archive/` and `research/`.

## Package Map
- `@borg/core`: The TS Control Plane bridge.
- `@borg/memory`: The Active Memory substrate.
- `@borg/ai`: Multi-provider LLM adapters.
- `@borg/tools`: First-class tool parity implementations.
