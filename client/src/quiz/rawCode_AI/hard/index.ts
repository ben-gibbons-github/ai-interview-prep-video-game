import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ai-hard-matrix-multiplication-0001',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Matrix Multiplication)\n\nImplement `solve(input)` where `input = { matrix1: list[list[float]], matrix2: list[list[float]] }`. Return the product of two matrices.',
    correctExplanation:
      'Matrix multiplication is fundamental to neural networks and linear algebra. Result[i][j] = sum(A[i][k] * B[k][j]). Time O(n*m*p) for n×m and m×p matrices, Space O(n*p). Used in forward pass of neural networks.',
    tests: [
      { input: [{ matrix1: [[1, 2], [3, 4]], matrix2: [[5, 6], [7, 8]] }], expected: [[19, 22], [43, 50]] },
      { input: [{ matrix1: [[1, 0], [0, 1]], matrix2: [[5, 6], [7, 8]] }], expected: [[5, 6], [7, 8]] },
      { input: [{ matrix1: [[1]], matrix2: [[2]] }], expected: [[2]] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-relu-derivative-0002',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (ReLU Derivative)\n\nImplement `solve(input)` where `input = list[float]` representing pre-activation values. Return the gradient of ReLU activation: 1 if x > 0, else 0.',
    correctExplanation:
      'ReLU derivative is crucial for backpropagation. For each element, return 1 if positive, 0 otherwise. Time O(n), Space O(n). This is used in computing gradients during training.',
    tests: [
      { input: [[1, -1, 2, -3, 0]], expected: [1, 0, 1, 0, 0] },
      { input: [[0.5]], expected: [1] },
      { input: [[-1, -2, -3]], expected: [0, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-cross-entropy-matrix-0003',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Categorical Cross-Entropy)\n\nImplement `solve(input)` where `input = { predictions: list[list[float]], labels: list[int] }` where predictions are probabilities per class. Return the categorical cross-entropy loss.',
    correctExplanation:
      'Categorical cross-entropy is -mean(log(predictions[i][labels[i]])). Used for multi-class classification. Clamp predictions to avoid log(0). Time O(n), Space O(1).',
    tests: [
      { input: [{ predictions: [[0.7, 0.3], [0.2, 0.8]], labels: [0, 1] }], expected: 0.2658347062629481 },
      { input: [{ predictions: [[1, 0], [0, 1]], labels: [0, 1] }], expected: 0 },
      { input: [{ predictions: [[0.5, 0.5], [0.5, 0.5]], labels: [0, 1] }], expected: 0.6931471805599453 },
    ],
  },
  {
    id: 'raw-coding-ai-hard-roc-auc-0004',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (ROC AUC Calculation)\n\nImplement `solve(input)` where `input = { predictions: list[float], labels: list[int] }`. Return the ROC AUC score by calculating the area under the ROC curve.',
    correctExplanation:
      'ROC AUC measures classifier performance at different thresholds. Sort by predictions, calculate TPR and FPR at each threshold, then integrate. Time O(n log n), Space O(n). Robust to class imbalance.',
    tests: [
      { input: [{ predictions: [0.9, 0.8, 0.7, 0.6], labels: [1, 1, 0, 0] }], expected: 1 },
      { input: [{ predictions: [0.1, 0.2, 0.8, 0.9], labels: [1, 1, 0, 0] }], expected: 0 },
      { input: [{ predictions: [0.5, 0.6, 0.5, 0.6], labels: [1, 1, 0, 0] }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-ai-hard-gradient-descent-step-0005',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Gradient Descent Step)\n\nImplement `solve(input)` where `input = { weights: list[float], gradients: list[float], learning_rate: float }`. Update weights using gradient descent: w = w - lr * gradient.',
    correctExplanation:
      'Gradient descent is the core optimization algorithm for neural networks. Subtract scaled gradients from weights. Time O(n), Space O(n). Learning rate controls step size; small values converge slowly, large values may diverge.',
    tests: [
      { input: [{ weights: [1, 2, 3], gradients: [0.1, 0.2, 0.3], learning_rate: 0.1 }], expected: [0.99, 1.98, 2.97] },
      { input: [{ weights: [0], gradients: [1], learning_rate: 0.01 }], expected: [-0.01] },
      { input: [{ weights: [10], gradients: [0], learning_rate: 0.1 }], expected: [10] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-batch-normalization-0006',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Batch Normalization)\n\nImplement `solve(input)` where `input = { batch: list[float], epsilon: float }`. Return normalized batch: (batch - mean) / sqrt(variance + epsilon).',
    correctExplanation:
      'Batch normalization stabilizes training by normalizing activations. Compute mean and variance of batch, then normalize. Epsilon prevents division by zero. Time O(n), Space O(n).',
    tests: [
      { input: [{ batch: [1, 2, 3, 4], epsilon: 1e-7 }], expected: [-1.3416407864998738, -0.4472135954999579, 0.4472135954999579, 1.3416407864998738] },
      { input: [{ batch: [0, 0, 0], epsilon: 1e-7 }], expected: [0, 0, 0] },
      { input: [{ batch: [5], epsilon: 1e-7 }], expected: [0] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-adam-step-0007',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Adam Optimizer Step)\n\nImplement `solve(input)` where `input = { w: float, g: float, m: float, v: float, t: int, lr: float, beta1: float, beta2: float, eps: float }`. Perform one Adam step and return `{ w, m, v }` after update.',
    correctExplanation:
      'Adam tracks first and second moments of gradients. Update m and v, compute bias-corrected m_hat and v_hat, then update w by `w - lr * m_hat / (sqrt(v_hat) + eps)`. Time O(1), Space O(1).',
    tests: [
      { input: [{ w: 1, g: 0.1, m: 0, v: 0, t: 1, lr: 0.001, beta1: 0.9, beta2: 0.999, eps: 1e-8 }], expected: { w: 0.9990000001, m: 0.01, v: 0.000010000000000000009 } },
      { input: [{ w: 5, g: 0, m: 0, v: 0, t: 1, lr: 0.001, beta1: 0.9, beta2: 0.999, eps: 1e-8 }], expected: { w: 5, m: 0, v: 0 } },
      { input: [{ w: 2, g: -0.2, m: 0, v: 0, t: 1, lr: 0.01, beta1: 0.9, beta2: 0.999, eps: 1e-8 }], expected: { w: 2.0099999995, m: -0.02, v: 0.000040000000000000036 } },
    ],
  },
  {
    id: 'raw-coding-ai-hard-multiclass-confusion-0008',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Multiclass Confusion Matrix)\n\nImplement `solve(input)` where `input = { predictions: list[int], labels: list[int], numClasses: int }`. Return a `numClasses x numClasses` confusion matrix where rows are true labels and columns are predicted labels.',
    correctExplanation:
      'For each sample increment `matrix[trueLabel][predLabel]`. This gives class-wise error analysis for multiclass models. Time O(n), Space O(c^2).',
    tests: [
      { input: [{ predictions: [0, 2, 1, 2], labels: [0, 1, 1, 2], numClasses: 3 }], expected: [[1, 0, 0], [0, 1, 1], [0, 0, 1]] },
      { input: [{ predictions: [1, 1], labels: [1, 1], numClasses: 2 }], expected: [[0, 0], [0, 2]] },
      { input: [{ predictions: [], labels: [], numClasses: 1 }], expected: [[0]] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-pairwise-distance-matrix-0009',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (Pairwise Distance Matrix)\n\nImplement `solve(input)` where `input = list[list[float]]` of points. Return matrix `D` where `D[i][j]` is Euclidean distance between point i and point j.',
    correctExplanation:
      'Pairwise distances are used in clustering and retrieval. Compute all point pairs using Euclidean distance. Time O(n^2 * d), Space O(n^2).',
    tests: [
      { input: [[[0, 0], [3, 4]]], expected: [[0, 5], [5, 0]] },
      { input: [[[1, 1]]], expected: [[0]] },
      { input: [[[0, 0], [1, 0], [0, 1]]], expected: [[0, 1, 1], [1, 0, 1.4142135623730951], [1, 1.4142135623730951, 0]] },
    ],
  },
  {
    id: 'raw-coding-ai-hard-tfidf-single-doc-0010',
    difficulty: 'hard',
    prompt:
      'AI/ML Raw Coding (TF-IDF Over Corpus)\n\nImplement `solve(input)` where `input = { docs: list[list[string]], targetDocIndex: int }`. Return TF-IDF scores for terms in target document as object `{ term: score }` using `idf = ln(N / df)` and `tf = count(term in doc) / docLength`.',
    correctExplanation:
      'TF-IDF highlights important words in a document relative to a corpus. Compute document frequency per term, term frequency in target doc, then multiply. Time O(total_tokens), Space O(vocab).',
    tests: [
      { input: [{ docs: [['cat', 'cat', 'sat'], ['cat', 'ate'], ['dog', 'sat']], targetDocIndex: 0 }], expected: { cat: 0.27031007207210955, sat: 0.13515503603605478 } },
      { input: [{ docs: [['a'], ['a']], targetDocIndex: 0 }], expected: { a: 0 } },
      { input: [{ docs: [['x', 'y'], ['y']], targetDocIndex: 0 }], expected: { x: 0.34657359027997264, y: 0 } },
    ],
  },
]

export default data
