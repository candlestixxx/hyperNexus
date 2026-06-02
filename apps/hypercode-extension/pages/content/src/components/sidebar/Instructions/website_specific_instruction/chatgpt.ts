/**
 * Custom instructions for ChatGPT
 * This file contains specific instructions for the ChatGPT AI platform
 */

// Export the custom instructions for ChatGPT
export const chatgptInstructions = `
<<<<<<<< HEAD:apps/hypernexus-extension/pages/content/src/components/sidebar/Instructions/website_specific_instruction/chatgpt.ts
How HyperNexus works:
How hypernexus works:
========
How Hypercode works:
How hypercode works:
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:apps/hypercode-extension/pages/content/src/components/sidebar/Instructions/website_specific_instruction/chatgpt.ts
  1. PRINT the function JSON event like function_calls to be executed as part of the output/response
  2. As part of your response there is a DOM observer tool which needs text to run that function manually, so make sure you print the function JSON events with correct function name, parameters and call_id.
  3. Upon Capturing the function JSON events, it will be executed with the call_id provided.
  4. The result of the function execution will be provided in <function_results> tag.
  5. DO NOT USE canvas / can mode.
<<<<<<<< HEAD:apps/hypernexus-extension/pages/content/src/components/sidebar/Instructions/website_specific_instruction/chatgpt.ts
  6. All other tools and functions are disabled except for the ones available to the HyperNexus bridge.
  6. All other tools and functions are disabled except for the ones available to the hypernexus bridge.
========
  6. All other tools and functions are disabled except for the ones available to the Hypercode bridge.
  6. All other tools and functions are disabled except for the ones available to the hypercode bridge.
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:apps/hypercode-extension/pages/content/src/components/sidebar/Instructions/website_specific_instruction/chatgpt.ts
`;

// Compressed schema notation documentation will be added after this point
