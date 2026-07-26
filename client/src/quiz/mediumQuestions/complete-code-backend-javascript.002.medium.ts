const data = [
  {
    id: 'medium-complete-code-backend-javascript-002-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Retry With Backoff Loop Case JB2201)\\n\\nChoose the missing line that doubles delay after each failed attempt.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function retryWithBackoff(run: () => Promise<void>, maxAttempts: number): Promise<void> {\\n  let delayMs = 50\\n  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {\\n    try {\\n      await run()\\n      return\\n    } catch (error) {\\n      if (attempt === maxAttempts) throw error\\n      await new Promise((resolve) => setTimeout(resolve, delayMs))\\n      // __BLANK__\\n    }\\n  }\\n}\\n```\\n\\nQuestion seed: JB2201',
    options: [
      'delayMs *= 2',
      'delayMs += 1',
      'delayMs = 50',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Exponential backoff multiplies wait time between retries to reduce pressure.',
  },
  {
    id: 'medium-complete-code-backend-javascript-002-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Stream Chunk Aggregation Case JB2202)\\n\\nChoose the missing line that assembles UTF-8 text from streamed chunks.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function readAll(stream: AsyncIterable<Buffer>): Promise<string> {\\n  const chunks: Buffer[] = []\\n  for await (const chunk of stream) {\\n    chunks.push(chunk)\\n  }\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JB2202',
    options: [
      'return Buffer.concat(chunks).toString("utf8")',
      'return chunks.join("")',
      'return String(chunks.length)',
      'return JSON.stringify(chunks)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Concatenate buffers first, then decode bytes once with the correct encoding.',
  },
  {
    id: 'medium-complete-code-backend-javascript-002-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Token Bucket Refill Math Case JB2203)\\n\\nChoose the missing line that refills tokens based on elapsed time and caps capacity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction refill(state: { tokens: number; lastMs: number }, nowMs: number, ratePerSec: number, capacity: number): void {\\n  const elapsedSec = Math.max(0, (nowMs - state.lastMs) / 1000)\\n  const refillAmount = elapsedSec * ratePerSec\\n  // __BLANK__\\n  state.lastMs = nowMs\\n}\\n```\\n\\nQuestion seed: JB2203',
    options: [
      'state.tokens = Math.min(capacity, state.tokens + refillAmount)',
      'state.tokens = state.tokens - refillAmount',
      'state.tokens = capacity + refillAmount',
      'state.tokens = 0',
    ],
    correctIndex: 0,
    correctExplanation:
      'Token buckets accumulate over time but must never exceed configured capacity.',
  },
]

export default data
