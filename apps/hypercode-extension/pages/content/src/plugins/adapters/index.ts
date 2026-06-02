/**
 * Adapter Plugins Export Module
 *
<<<<<<<< HEAD:apps/hypernexus-extension/pages/content/src/plugins/adapters/index.ts
 * This file exports all available adapter plugins for the HyperNexus-Extension.
 * This file exports all available adapter plugins for the hypernexus-Extension.
========
 * This file exports all available adapter plugins for the Hypercode-Extension.
 * This file exports all available adapter plugins for the hypercode-Extension.
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:apps/hypercode-extension/pages/content/src/plugins/adapters/index.ts
 */

export { BaseAdapterPlugin } from './base.adapter';
export { DefaultAdapter } from './default.adapter';
export { ExampleForumAdapter } from './example-forum.adapter';
export { GeminiAdapter } from './gemini.adapter';
export { GrokAdapter } from './grok.adapter';
export { PerplexityAdapter } from './perplexity.adapter';
export { AIStudioAdapter } from './aistudio.adapter';
export { OpenRouterAdapter } from './openrouter.adapter';
export { DeepSeekAdapter } from './deepseek.adapter';
export { T3ChatAdapter } from './t3chat.adapter';
export { MistralAdapter } from './mistral.adapter';
export { GitHubCopilotAdapter } from './ghcopilot.adapter';

// Export types
export type {
  AdapterPlugin,
  AdapterConfig,
  PluginRegistration,
  AdapterCapability,
  PluginContext,
} from '../plugin-types';
