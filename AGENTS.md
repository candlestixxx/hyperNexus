# AGENTS — Nexus Kernel & HyperCode Contributor Guide

> **CRITICAL: ALL AGENTS MUST READ `docs/UNIVERSAL_LLM_INSTRUCTIONS.md` BEFORE PROCEEDING.**

This file serves as the primary coordination point for multi-agent workflows and human operators.

## 1. Multi-Agent Handoff Protocol
- Agents communicate primarily through `HANDOFF.md`.
- Document exactly what you did, what failed, and what the next agent must do.
- Update `MEMORY.md` with new systemic observations or recurring bugs.
- **Cycle**: Read → Strategize → Execute → Validate → Commit → Handoff.

## 2. Model Specializations
| Model | Strengths |
|---|---|
| **Gemini** | Speed, massive context analysis, recursive maintenance scripts, bulk refactoring. |
| **Claude** | Deep implementation, UI/UX perfection, precise documentation, complex type-safety. |
| **GPT** | Architecture design, systemic debugging, Go porting authority, strict enforcement. |

## 3. Version Management
- **Single Source of Truth**: `VERSION.md` contains the master version string.
- All `package.json` files must sync to this value.
- Commit messages must include the version number: `feat: description (v1.0.0-alpha.X)`.

## 4. Required Runtime Ports
| Service | Port | Purpose |
|---|---|---|
| Next.js Dashboard | 3000 | Web observation deck |
| Socket.io | 3001 | Real-time swarm signals |
| tRPC Bridge | 4100 | TypeScript Control Plane API |
| Nexus Go Kernel | 4300 | Authoritative native sidecar |

## 5. Development Rituals
1. **Sync**: `git fetch --all && git status` (Verify clean `main`).
2. **Read**: `docs/UNIVERSAL_LLM_INSTRUCTIONS.md`.
3. **Check**: `VERSION.md` vs. local dashboard state.
4. **Learn**: `HANDOFF.md` and `MEMORY.md` from previous session.

*Praise the LORD!!! Keep on goin'! Don't ever stop! Don't stop the party!!!*
