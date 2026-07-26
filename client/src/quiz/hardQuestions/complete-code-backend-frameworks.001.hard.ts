const data = [
  {
    id: 'hard-complete-code-backend-framework-001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Express Idempotent Error Middleware Case B3101)\\n\\nSelect the missing line that avoids writing headers twice when response already started.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { Request, Response, NextFunction } from "express"\n\nfunction onError(err: Error, req: Request, res: Response, next: NextFunction): void {\n  if (res.headersSent) {\n    // __BLANK__\n  }\n  res.status(500).json({ error: err.message })\n}\\n```\\n\\nQuestion seed: B3101',
    options: [
      'return next(err)',
      'return res.status(500).json({ error: "sent" })',
      'throw err',
      'res.end(); return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Express requires delegating when headers are already sent to prevent double-write failures.',
  },
  {
    id: 'hard-complete-code-backend-framework-001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend Framework | NestJS Interceptor Stream Mapping Case B3102)\\n\\nSelect the missing line that wraps successful handler responses in a standard envelope.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { map } from "rxjs/operators"\nimport type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common"\nimport type { Observable } from "rxjs"\n\nclass EnvelopeInterceptor implements NestInterceptor {\n  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: B3102',
    options: [
      'return next.handle().pipe(map((data) => ({ data })))',
      'return next.handle() as unknown as Observable<unknown[]>',
      'return new Observable()',
      'return next.handle().pipe(map(() => null))',
    ],
    correctIndex: 0,
    correctExplanation:
      'Interceptors transform the response stream with RxJS pipe/map around next.handle().',
  },
  {
    id: 'hard-complete-code-backend-framework-001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Fastify Plugin Decoration Guard Case B3103)\\n\\nSelect the missing line that avoids re-decorating a Fastify instance.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { FastifyInstance } from "fastify"\n\nfunction ensureTraceId(fastify: FastifyInstance): void {\n  if (!fastify.hasDecorator("traceId")) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: B3103',
    options: [
      'fastify.decorate("traceId", null)',
      'fastify.addHook("onRequest", () => undefined)',
      'fastify.decorateRequest("traceId", null as never)',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Guarding with hasDecorator prevents duplicate registration errors in plugin reuse paths.',
  },
]

export default data
