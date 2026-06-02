import {
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
} from "@modelcontextprotocol/sdk/types.js";

// Base context for all handlers
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
export interface HyperNexusHandlerContext {
========
export interface BorgHandlerContext {
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
    namespaceUuid: string;
    sessionId: string;
    userId?: string; // User ID for access control and logging
}

// Handler function types
export type ListToolsHandler = (
    request: ListToolsRequest,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
    context: HyperNexusHandlerContext,
========
    context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
) => Promise<ListToolsResult>;

export type CallToolHandler = (
    request: CallToolRequest,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
    context: HyperNexusHandlerContext,
========
    context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
) => Promise<CallToolResult>;

// Middleware function types that can transform request/response
export type ListToolsMiddleware = (
    handler: ListToolsHandler,
) => ListToolsHandler;

export type CallToolMiddleware = (handler: CallToolHandler) => CallToolHandler;

// Request transformer type (for future use)
export type RequestTransformer<T> = (
    request: T,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
    context: HyperNexusHandlerContext,
========
    context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
) => Promise<T> | T;

// Response transformer type
export type ResponseTransformer<T> = (
    response: T,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
    context: HyperNexusHandlerContext,
========
    context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
) => Promise<T> | T;

/**
 * Creates a functional middleware that can transform requests and responses
 */
export function createFunctionalMiddleware<TRequest, TResponse>(options: {
    transformRequest?: RequestTransformer<TRequest>;
    transformResponse?: ResponseTransformer<TResponse>;
}) {
    return (
        handler: (
            request: TRequest,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
            context: HyperNexusHandlerContext,
========
            context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
        ) => Promise<TResponse>,
    ) => {
        return async (
            request: TRequest,
<<<<<<<< HEAD:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
            context: HyperNexusHandlerContext,
========
            context: BorgHandlerContext,
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:packages/core/src/services/hypernexus-middleware/functional-middleware.ts
        ): Promise<TResponse> => {
            // Transform request if transformer provided
            let transformedRequest = request;
            if (options.transformRequest) {
                transformedRequest = await Promise.resolve(
                    options.transformRequest(request, context),
                );
            }

            // Call the original handler
            let response = await handler(transformedRequest, context);

            // Transform response if transformer provided
            if (options.transformResponse) {
                response = await Promise.resolve(
                    options.transformResponse(response, context),
                );
            }

            return response;
        };
    };
}

/**
 * Compose multiple middleware functions together
 */
type Handler<TArgs extends unknown[], TResult> = (...args: TArgs) => TResult;

export function compose<TArgs extends unknown[], TResult>(
    ...middlewares: Array<
        (handler: Handler<TArgs, TResult>) => Handler<TArgs, TResult>
    >
): (handler: Handler<TArgs, TResult>) => Handler<TArgs, TResult> {
    return (handler: Handler<TArgs, TResult>) => {
        return middlewares.reduceRight(
            (wrapped, middleware) => middleware(wrapped),
            handler,
        );
    };
}
