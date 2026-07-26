const data = [
  {
    id: 'easy-complete-code-backend-framework-001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Express JSON Body Guard Case B1101)\\n\\nComplete the missing line so invalid payloads return HTTP 400.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { Request, Response } from "express"\n\nfunction createUser(req: Request, res: Response): void {\n  const email = req.body?.email\n  if (typeof email !== "string") {\n    // __BLANK__\n  }\n  res.status(201).json({ ok: true })\n}\\n```\\n\\nQuestion seed: B1101',
    options: [
      'return res.status(400).json({ error: "invalid_email" })',
      'res.status(200).json({ email })',
      'throw new Error("bad")',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Validation failures should respond with 400 and stop handler execution.',
  },
  {
    id: 'easy-complete-code-backend-framework-001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend Framework | NestJS Pipe Transform Case B1102)\\n\\nComplete the missing line so route param is converted to a number.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { ParseIntPipe } from "@nestjs/common"\n\nfunction parseId(raw: string): number {\n  const pipe = new ParseIntPipe()\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: B1102',
    options: [
      'return pipe.transform(raw, { type: "param", metatype: Number, data: "id" }) as number',
      'return Number(raw) + 1',
      'return raw as unknown as number',
      'return parseFloat(raw)',
    ],
    correctIndex: 0,
    correctExplanation:
      'ParseIntPipe transform enforces numeric route-parameter semantics.',
  },
  {
    id: 'easy-complete-code-backend-framework-001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend Framework | Fastify Reply Status Case B1103)\\n\\nComplete the missing line so the endpoint returns created status.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport type { FastifyReply } from "fastify"\n\nfunction sendCreated(reply: FastifyReply): void {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: B1103',
    options: [
      'reply.code(201).send({ ok: true })',
      'reply.sendStatus(201)',
      'reply.status = 201 as unknown as never',
      'reply.send({ ok: true })',
    ],
    correctIndex: 0,
    correctExplanation:
      'Fastify uses reply.code(status).send(payload) for explicit status responses.',
  },
]

export default data
