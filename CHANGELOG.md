# Changelog

## [1.0.0-alpha.56] - 2026-05-15

### Added
- **Rebrand**: Transitioned the project toward the **Nexus (AI Hypervisor)** and **HyperCode** dual-brand identity.
- **Phase 1 Memory Foundation**: Implemented tiered memory with heat-based promotion and decay.
- **Heat Scoring**: Integrated `heat_score` and `last_accessed_at` into LanceDB and Memory stores.
- **Tool-Outcome Feedback**: `MemoryManager` now records success/failure to influence future retrieval ranking.
- **Restored @borg/memory**: Full restoration of functional vector store implementations from legacy archives.

### Changed
- Updated `VISION.md` and roadmap to reflect the kernel/router/memory substrate architecture.
- Synchronized all monorepo packages to v1.0.0-alpha.56.
