import { getLLMService } from '../../../lib/trpc-core.js';
import type { Supervisor, SupervisorConfig, Message } from './types.js';

<<<<<<<< HEAD:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
export class HyperNexusSupervisor implements Supervisor {
========
export class HyperNexusSupervisor implements Supervisor {
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
  name: string;
  provider: string;
  config: SupervisorConfig;

  constructor(config: SupervisorConfig) {
    this.name = config.name;
    this.provider = config.provider;
    this.config = config;
  }

  async isAvailable(): Promise<boolean> {
    const llm = getLLMService();
<<<<<<<< HEAD:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
    // In HyperNexus, availability is checked via ProviderTruth
========
    // In HyperNexus, availability is checked via ProviderTruth
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
    const quotaService = (llm.modelSelector as any)?.getQuotaService?.();
    const quota = quotaService?.getQuota?.(this.config.provider);
    return !!quota && quota.authTruth === 'VALID';
  }

  async chat(messages: Message[]): Promise<string> {
    const llm = getLLMService();
    
<<<<<<<< HEAD:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
    // Convert council messages to HyperNexus format if needed
    // (Assuming HyperNexus generate accepts prompt string or similar)
========
    // Convert council messages to HyperNexus format if needed
    // (Assuming HyperNexus generate accepts prompt string or similar)
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/orchestrator/council/supervisors/hypernexus.ts
    const prompt = messages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n');
    
    const response = await (llm as any).generateText(
      this.config.provider,
      this.config.model || 'default',
      '', // System prompt handled in council logic or here
      prompt,
      {
        temperature: this.config.temperature,
        taskComplexity: 'high',
      }
    );

    return response.content;
  }
}
