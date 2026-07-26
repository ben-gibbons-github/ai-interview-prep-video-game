import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ai-insanely-transformer-0001',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Full Attention Head)\n\nThis problem teaches the core math behind transformer attention.\n\nImplement `solve(input)` where `input = { Q: list[list[float]], K: list[list[float]], V: list[list[float]], scale: float }`.\n\nReturn the scaled dot-product attention output with shape `(len(Q), len(V[0]))`. Compute it in this order:\n1) `scores = (Q @ K^T) / scale`\n2) apply row-wise softmax to `scores`\n3) multiply the softmax weights by `V`\n\nUse a numerically stable softmax by subtracting the row maximum before exponentiation. Assume the matrices are dimensionally compatible.',
    correctExplanation:
      'Multi-head attention is the backbone of transformers. Compute attention scores via QK^T, scale, softmax, then apply to values. Time O(n^2*d), Space O(n^2). This is used in BERT, GPT, ViT, etc.',
    tests: [
      { input: [{ Q: [[1, 0]], K: [[1, 0], [0, 1]], V: [[1, 1], [2, 2]], scale: 1 }], expected: [[1.6310586277647257, 1.6310586277647257]] },
      { input: [{ Q: [[1, 1]], K: [[1, 1]], V: [[1, 1]], scale: 1.4142135623730951 }], expected: [[1, 1]] },
      { input: [{ Q: [[0, 0]], K: [[0, 0]], V: [[5, 5]], scale: 1 }], expected: [[5, 5]] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-gradient-clipping-0002',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Gradient Clipping)\n\nThis problem teaches a standard training-stability technique used to control exploding gradients.\n\nImplement `solve(input)` where `input = { gradients: list[float], max_norm: float }`.\n\nCompute the global L2 norm of the gradient vector. If the norm is already within the limit, return the original values unchanged. If the norm exceeds `max_norm`, scale every entry by `max_norm / ||gradients||_2`.\n\nReturn a new array and do not mutate the input.',
    correctExplanation:
      'Gradient clipping prevents exploding gradients in RNNs. Compute L2 norm, scale all gradients if it exceeds threshold. Time O(n), Space O(n). Critical for training stability in sequence models.',
    tests: [
      { input: [{ gradients: [3, 4], max_norm: 1 }], expected: [0.6, 0.8] },
      { input: [{ gradients: [0.1, 0.2], max_norm: 1 }], expected: [0.1, 0.2] },
      { input: [{ gradients: [1, 1, 1], max_norm: 1.5 }], expected: [0.5773502691896257, 0.5773502691896257, 0.5773502691896257] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-batch-matrix-mult-0003',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Batch Matrix Multiplication)\n\nThis problem teaches how deep-learning libraries vectorize work across many matrices at once.\n\nImplement `solve(input)` where `input = { batch1: list[list[list[float]]], batch2: list[list[list[float]]] }`.\n\nFor each batch index `i`, compute `batch1[i] @ batch2[i]` and return the list of products in the same order.\nYou can assume each pair has compatible dimensions.',
    correctExplanation:
      'Batched operations are critical for efficiency in neural networks. Multiply corresponding matrices in batch. Time O(b*n*m*p), Space O(b*n*p). Used throughout deep learning frameworks.',
    tests: [
      { input: [{ batch1: [[[1, 2], [3, 4]]], batch2: [[[5, 6], [7, 8]]] }], expected: [[[19, 22], [43, 50]]] },
      { input: [{ batch1: [[[1, 0]], [[0, 1]]], batch2: [[[2, 2]], [[3, 3]]] }], expected: [[[2, 2]], [[3, 3]]] },
      { input: [{ batch1: [[[1]]], batch2: [[[2]]] }], expected: [[[2]]] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-layer-norm-0004',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Layer Normalization)\n\nThis problem teaches how layer norm differs from batch norm: it normalizes across features within one example.\n\nImplement `solve(input)` where `input = { x: list[float], gamma: list[float], beta: list[float], epsilon: float }`.\n\nCompute the mean and variance of `x`, normalize each feature with `(x[i] - mean) / sqrt(var + epsilon)`, then apply the affine transform with `gamma` and `beta`.\nReturn a float list with the same length as `x`.',
    correctExplanation:
      'Layer normalization normalizes across features (unlike batch norm which normalizes across batch). Compute mean and variance, normalize, then apply learnable affine transformation. Time O(n), Space O(n). Used in transformers.',
    tests: [
      { input: [{ x: [1, 2, 3], gamma: [1, 1, 1], beta: [0, 0, 0], epsilon: 1e-7 }], expected: [-1.2247448713915892, 0, 1.2247448713915892] },
      { input: [{ x: [0, 0, 0], gamma: [2, 2, 2], beta: [1, 1, 1], epsilon: 1e-7 }], expected: [1, 1, 1] },
      { input: [{ x: [5], gamma: [2], beta: [3], epsilon: 1e-7 }], expected: [3] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-mixed-precision-0005',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Mixed Precision Training)\n\nThis problem teaches the basic idea behind loss scaling in mixed-precision training.\n\nImplement `solve(input)` where `input = { gradients: list[float], loss_scale: float, unscale: bool }`.\n\nWhen `unscale` is `true`, divide each gradient by `loss_scale`. When `unscale` is `false`, multiply each gradient by `loss_scale`.\nReturn the transformed gradients in the original order.',
    correctExplanation:
      'Mixed precision uses float16 for forward/backward to save memory/compute, float32 for weight updates. Gradients are scaled to prevent underflow in float16, then unscaled for updates. Time O(n), Space O(1). Enables training larger models.',
    tests: [
      { input: [{ gradients: [0.001, 0.002], loss_scale: 1024, unscale: true }], expected: [9.765625e-7, 1.953125e-6] },
      { input: [{ gradients: [0.1, 0.2], loss_scale: 1024, unscale: false }], expected: [102.4, 204.8] },
      { input: [{ gradients: [1], loss_scale: 1, unscale: true }], expected: [1] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-beam-search-0006',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Beam Search Decoding)\n\nThis problem teaches how beam search keeps only the most promising partial sequences during decoding.\n\nImplement `solve(input)` where `input = { logits: list[list[float]], beam_width: int }`.\nEach row in `logits[t]` is the probability distribution for time step `t`.\nReturn the top `beam_width` complete token sequences ranked by cumulative score, using log probabilities or any equivalent monotonic scoring.\n\nEach returned sequence should be a token-index array of length `T`.',
    correctExplanation:
      'Beam search is used in sequence-to-sequence models for finding high-probability outputs. At each step, keep top-k hypotheses, expand, re-rank. Time O(T*V*k*log(k)) for sequence length T, vocab size V, beam width k. Used in machine translation, summarization.',
    tests: [
      { input: [{ logits: [[0.7, 0.3], [0.4, 0.6]], beam_width: 2 }], expected: [[1, 1], [1, 0]] },
      { input: [{ logits: [[0.5, 0.5]], beam_width: 1 }], expected: [[0]] },
      { input: [{ logits: [[0.9, 0.1], [0.8, 0.2]], beam_width: 2 }], expected: [[0, 0], [0, 1]] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-viterbi-0007',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Viterbi Decoding)\n\nThis problem teaches hidden Markov model decoding with dynamic programming.\n\nImplement `solve(input)` where\n`input = { startProb: list[float], transProb: list[list[float]], emitProb: list[list[float]], observations: list[int] }`.\n\nReturn the most likely hidden-state path as a list of state indices, one per observation. Use dynamic programming with backpointers, and use log-space if that makes the implementation more stable.',
    correctExplanation:
      'Viterbi is dynamic programming for Hidden Markov Models, tracking best log-probability path per state and time step. Time O(T * S^2), Space O(T * S).',
    tests: [
      { input: [{ startProb: [0.6, 0.4], transProb: [[0.7, 0.3], [0.4, 0.6]], emitProb: [[0.5, 0.5], [0.1, 0.9]], observations: [0, 1, 1] }], expected: [0, 0, 0] },
      { input: [{ startProb: [0.5, 0.5], transProb: [[0.9, 0.1], [0.1, 0.9]], emitProb: [[0.9, 0.1], [0.1, 0.9]], observations: [1, 1] }], expected: [1, 1] },
      { input: [{ startProb: [1], transProb: [[1]], emitProb: [[1]], observations: [0, 0] }], expected: [0, 0] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-ctc-collapse-0008',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (CTC Decoding Collapse)\n\nThis problem teaches the standard post-processing step used by CTC decoders in speech and OCR systems.\n\nImplement `solve(input)` where `input = { sequence: list[int], blankId: int }`.\nApply the two collapse rules in order:\n1) merge consecutive duplicate labels\n2) remove all `blankId` tokens\n\nReturn the final token-index sequence after both steps.',
    correctExplanation:
      'Connectionist Temporal Classification decoding collapses repeats and strips blank symbols to produce final token sequence. Time O(n), Space O(n).',
    tests: [
      { input: [{ sequence: [1, 1, 0, 2, 2, 0, 2], blankId: 0 }], expected: [1, 2, 2] },
      { input: [{ sequence: [0, 0, 0], blankId: 0 }], expected: [] },
      { input: [{ sequence: [3, 3, 3], blankId: 0 }], expected: [3] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-nucleus-filter-0009',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (Top-p / Nucleus Filter)\n\nThis problem teaches nucleus sampling, where the candidate set adapts to probability mass instead of using a fixed top-k.\n\nImplement `solve(input)` where `input = { probs: list[float], p: float }`.\nSort token indices by probability descending, then keep the smallest prefix whose cumulative probability is `>= p`.\n\nReturn the kept token indices in the order they were selected from the sorted list.',
    correctExplanation:
      'Top-p sampling adapts candidate set size by probability mass and is widely used in LLM decoding. Sort by probability descending and accumulate until threshold reached. Time O(n log n), Space O(n).',
    tests: [
      { input: [{ probs: [0.4, 0.3, 0.2, 0.1], p: 0.75 }], expected: [0, 1, 2] },
      { input: [{ probs: [0.9, 0.1], p: 0.5 }], expected: [0] },
      { input: [{ probs: [0.25, 0.25, 0.25, 0.25], p: 1 }], expected: [0, 1, 2, 3] },
    ],
  },
  {
    id: 'raw-coding-ai-insanely-lora-merge-0010',
    difficulty: 'insanelyHard',
    prompt:
      'AI/ML Raw Coding (LoRA Weight Merge)\n\nThis problem teaches how low-rank adapters are merged into a base model for inference.\n\nImplement `solve(input)` where\n`input = { base: list[list[float]], A: list[list[float]], B: list[list[float]], alpha: float, rank: int }`.\n\nCompute `delta = (alpha / rank) * (A @ B)` and then add it to `base` to produce `W`.\nReturn `W` with the same shape as `base`.',
    correctExplanation:
      'LoRA fine-tuning injects low-rank adapters and can be merged into base weights for inference. Compute matrix product A@B, scale, then add to base. Time O(n*m*r), Space O(n*m).',
    tests: [
      { input: [{ base: [[1, 1], [1, 1]], A: [[1], [0]], B: [[2, 3]], alpha: 1, rank: 1 }], expected: [[3, 4], [1, 1]] },
      { input: [{ base: [[0]], A: [[2]], B: [[5]], alpha: 0.5, rank: 1 }], expected: [[5]] },
      { input: [{ base: [[1, 2]], A: [[0], [0]], B: [[1, 1]], alpha: 4, rank: 2 }], expected: [[1, 2]] },
    ],
  },
]

export default data
