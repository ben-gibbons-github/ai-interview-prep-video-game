const data = [
  {
    id: 'medium-complete-code-backend-framework-001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Express Async Error Propagation Case B2101)\\n\\nChoose the missing line so async handler errors reach error middleware.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { Request, Response, NextFunction } from "express"\n\nasync function handler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    await Promise.resolve()\n    throw new Error("boom")\n  } catch (error) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: B2101',
    options: [
      'next(error)',
      'res.status(200).json({ ok: true })',
      'throw error',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Calling next(error) forwards the failure to centralized Express error middleware.',
  },
  {
    id: 'medium-complete-code-backend-framework-001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend Framework | NestJS Guard Authorization Check Case B2102)\\n\\nChoose the missing line so only admin users pass the guard.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { CanActivate, ExecutionContext } from "@nestjs/common"\n\nclass AdminGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    const request = context.switchToHttp().getRequest<{ user?: { role?: string } }>()\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: B2102',
    options: [
      'return request.user?.role === "admin"',
      'return Boolean(request.user)',
      'return true',
      'return request.user?.role !== "admin"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Guard should explicitly check required role and reject all other cases.',
  },
  {
    id: 'medium-complete-code-backend-framework-001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Fastify PreHandler API Key Check Case B2103)\\n\\nChoose the missing line so requests without x-api-key are rejected.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { FastifyReply, FastifyRequest } from "fastify"\n\nfunction requireKey(req: FastifyRequest, reply: FastifyReply): void {\n  const apiKey = req.headers["x-api-key"]\n  if (!apiKey) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: B2103',
    options: [
      'void reply.code(401).send({ error: "missing_api_key" })',
      'void reply.code(200).send({ ok: true })',
      'throw new Error("unauthorized")',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Pre-handler should terminate request with 401 when credentials are absent.',
  },
]

export default data
