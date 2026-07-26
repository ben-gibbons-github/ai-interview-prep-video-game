import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ai-veryhard-backprop-0001',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Backpropagation Step)\n\nImplement `solve(input)` where `input = { forward_pass: { x: float, w: float, b: float }, loss_gradient: float }`. Compute gradients dw and db for a single linear neuron.',
    correctExplanation:
      'Backpropagation computes gradients by chain rule. For y = wx + b and loss gradient dL/dy, compute dL/dw = dL/dy * x and dL/db = dL/dy. Time O(1), Space O(1). Fundamental to neural network training.',
    tests: [
      { input: [{ forward_pass: { x: 2, w: 3, b: 1 }, loss_gradient: 1 }], expected: { dw: 2, db: 1 } },
      { input: [{ forward_pass: { x: 1, w: 1, b: 0 }, loss_gradient: 2 }], expected: { dw: 2, db: 2 } },
      { input: [{ forward_pass: { x: 0, w: 5, b: 3 }, loss_gradient: 1 }], expected: { dw: 0, db: 1 } },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-attention-scores-0002',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Attention Mechanism)\n\nImplement `solve(input)` where `input = { queries: list[list[float]], keys: list[list[float]] }`. Return attention scores: softmax(QK^T / sqrt(d)) where d is dimension.',
    correctExplanation:
      'Attention mechanism is core to transformers. Compute dot products between queries and keys, scale by sqrt(dimension), apply softmax. Time O(n*m*d), Space O(n*m). Used in BERT, GPT, etc.',
    tests: [
      { input: [{ queries: [[1, 0]], keys: [[1, 0], [0, 1]] }], expected: [[0.7310585786300195, 0.2689414213699805]] },
      { input: [{ queries: [[1, 1]], keys: [[1, 1]] }], expected: [[1]] },
      { input: [{ queries: [[1, 0], [0, 1]], keys: [[1, 0], [0, 1]] }], expected: [[0.7310585786300195, 0.2689414213699805], [0.2689414213699805, 0.7310585786300195]] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-momentum-update-0003',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Momentum Optimizer Step)\n\nImplement `solve(input)` where `input = { weights: list[float], gradients: list[float], velocity: list[float], learning_rate: float, momentum: float }`. Update weights using momentum: v = momentum*v + grad, w = w - lr*v.',
    correctExplanation:
      'Momentum accelerates convergence and helps escape local minima. Accumulate velocity from previous gradients, use it to update weights. Time O(n), Space O(n). Beta typically 0.9.',
    tests: [
      { input: [{ weights: [1, 2], gradients: [0.1, 0.2], velocity: [0, 0], learning_rate: 0.01, momentum: 0.9 }], expected: { new_weights: [0.999, 1.998], new_velocity: [0.001, 0.002] } },
      { input: [{ weights: [0], gradients: [1], velocity: [0.1], learning_rate: 0.01, momentum: 0.9 }], expected: { new_weights: [-0.01], new_velocity: [0.091] } },
      { input: [{ weights: [1], gradients: [0], velocity: [0], learning_rate: 0.1, momentum: 0.9 }], expected: { new_weights: [1], new_velocity: [0] } },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-convolution-0004',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (2D Convolution)\n\nImplement `solve(input)` where `input = { image: list[list[float]], kernel: list[list[float]] }`. Return the 2D convolution (no padding, stride=1).',
    correctExplanation:
      'Convolution is the core operation in CNNs. Slide kernel over image, compute element-wise multiply and sum. Time O((n-k+1)*(m-k+1)*k^2), Space O((n-k+1)*(m-k+1)). Used for feature extraction.',
    tests: [
      { input: [{ image: [[1, 2], [3, 4]], kernel: [[1, 0], [0, 1]] }], expected: [[5]] },
      { input: [{ image: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], kernel: [[1, 0], [0, 1]] }], expected: [[5, 11], [17, 23]] },
      { input: [{ image: [[1]], kernel: [[1]] }], expected: [[1]] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-embedding-similarity-0005',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Embedding Similarity Matrix)\n\nImplement `solve(input)` where `input = { embeddings: list[list[float]] }`. Return the pairwise cosine similarity matrix.',
    correctExplanation:
      'Embedding similarity matrices are used in semantic search and clustering evaluation. Compute normalized embeddings, then dot product. Time O(n^2*d), Space O(n^2). Common in NLP tasks.',
    tests: [
      { input: [{ embeddings: [[1, 0], [0, 1]] }], expected: [[1, 0], [0, 1]] },
      { input: [{ embeddings: [[1, 1], [1, 1]] }], expected: [[1, 1], [1, 1]] },
      { input: [{ embeddings: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] }], expected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-dropout-mask-0006',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Dropout Mask Generation)\n\nImplement `solve(input)` where `input = { activations: list[float], dropout_rate: float, seed: int }`. Return activations scaled with dropout mask applied: mask from random Bernoulli(1 - dropout_rate), scale by 1/(1-dropout_rate).',
    correctExplanation:
      'Dropout prevents overfitting by randomly zeroing activations. Create binary mask, apply it, scale to maintain expected value. Time O(n), Space O(n). Inverted dropout is standard practice.',
    tests: [
      { input: [{ activations: [1, 2, 3, 4], dropout_rate: 0.5, seed: 42 }], expected: [0, 4, 0, 8] },
      { input: [{ activations: [1], dropout_rate: 0, seed: 0 }], expected: [1] },
      { input: [{ activations: [2], dropout_rate: 1, seed: 0 }], expected: [0] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-label-smoothing-0007',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Label Smoothing)\n\nImplement `solve(input)` where `input = { labels: list[int], numClasses: int, epsilon: float }`. Return smoothed target distributions for each label where true class gets `1 - epsilon + epsilon/numClasses` and others get `epsilon/numClasses`.',
    correctExplanation:
      'Label smoothing regularizes classifiers by preventing overconfident targets. Build dense probability targets from sparse class labels. Time O(n*c), Space O(n*c).',
    tests: [
      { input: [{ labels: [0, 2], numClasses: 3, epsilon: 0.1 }], expected: [[0.9333333333333333, 0.03333333333333333, 0.03333333333333333], [0.03333333333333333, 0.03333333333333333, 0.9333333333333333]] },
      { input: [{ labels: [1], numClasses: 2, epsilon: 0.2 }], expected: [[0.1, 0.9]] },
      { input: [{ labels: [], numClasses: 4, epsilon: 0.1 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-sequence-padding-0008',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Sequence Padding and Truncation)\n\nImplement `solve(input)` where `input = { sequences: list[list[int]], maxLen: int, padValue: int }`. Return sequences padded to maxLen or truncated from the end if longer.',
    correctExplanation:
      'Fixed-length tensors are required for batched model input. Truncate long sequences and append padding for short ones. Time O(total_tokens), Space O(batch * maxLen).',
    tests: [
      { input: [{ sequences: [[1, 2], [3, 4, 5, 6], []], maxLen: 3, padValue: 0 }], expected: [[1, 2, 0], [3, 4, 5], [0, 0, 0]] },
      { input: [{ sequences: [[9]], maxLen: 1, padValue: -1 }], expected: [[9]] },
      { input: [{ sequences: [[1, 2, 3]], maxLen: 2, padValue: 0 }], expected: [[1, 2]] },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-bleu1-0009',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (BLEU-1 Precision)\n\nImplement `solve(input)` where `input = { candidate: list[string], reference: list[string] }`. Return BLEU-1 style unigram precision with clipping and no brevity penalty.',
    correctExplanation:
      'BLEU-1 measures overlap of candidate tokens with reference tokens using clipped counts. Sum clipped matches divided by candidate length. Time O(n + m), Space O(vocab).',
    tests: [
      { input: [{ candidate: ['the', 'cat', 'cat'], reference: ['the', 'cat'] }], expected: 0.6666666666666666 },
      { input: [{ candidate: ['a', 'b'], reference: ['c', 'd'] }], expected: 0 },
      { input: [{ candidate: [], reference: ['x'] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-ai-veryhard-bpe-merge-step-0010',
    difficulty: 'veryHard',
    prompt:
      'AI/ML Raw Coding (Single BPE Merge Step)\n\nImplement `solve(input)` where `input = { tokens: list[string], pair: [string, string], mergedToken: string }`. Replace each non-overlapping occurrence of the adjacent pair in tokens with mergedToken and return updated tokens.',
    correctExplanation:
      'Byte Pair Encoding repeatedly merges frequent adjacent pairs. This problem models one deterministic merge pass over tokenized symbols. Time O(n), Space O(n).',
    tests: [
      { input: [{ tokens: ['l', 'o', 'w', '</w>'], pair: ['l', 'o'], mergedToken: 'lo' }], expected: ['lo', 'w', '</w>'] },
      { input: [{ tokens: ['a', 'b', 'a', 'b'], pair: ['a', 'b'], mergedToken: 'ab' }], expected: ['ab', 'ab'] },
      { input: [{ tokens: ['x', 'y'], pair: ['a', 'b'], mergedToken: 'ab' }], expected: ['x', 'y'] },
    ],
  },
]

export default data
