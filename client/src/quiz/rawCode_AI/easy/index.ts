import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ai-easy-normalize-0001',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Min-Max Normalization)\n\nImplement `solve(input)` where `input = list[float]`. Return the list with values normalized to range [0, 1] using min-max scaling: (x - min) / (max - min).',
    correctExplanation:
      'Min-max normalization is a fundamental preprocessing technique. Find the minimum and maximum values, then apply the formula to each element. Handle edge case where all values are the same (avoid division by zero). Time O(n), Space O(n). Example: [1, 2, 3, 4] returns [0.0, 0.333..., 0.666..., 1.0].',
    tests: [
      { input: [[1, 2, 3, 4]], expected: [0, 0.3333333333333333, 0.6666666666666666, 1] },
      { input: [[5]], expected: [0] },
      { input: [[1, 1, 1]], expected: [0, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-ai-easy-euclidean-distance-0002',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Euclidean Distance)\n\nImplement `solve(input)` where `input = { point1: list[float], point2: list[float] }`. Return the Euclidean distance between two points.',
    correctExplanation:
      'Euclidean distance is sqrt(sum((p1[i] - p2[i])^2)). Used in k-NN and clustering. Time O(n), Space O(1). Example: distance from [0, 0] to [3, 4] is 5.0.',
    tests: [
      { input: [{ point1: [0, 0], point2: [3, 4] }], expected: 5 },
      { input: [{ point1: [1, 1], point2: [1, 1] }], expected: 0 },
      { input: [{ point1: [0, 0], point2: [1, 1] }], expected: 1.4142135623730951 },
    ],
  },
  {
    id: 'raw-coding-ai-easy-accuracy-score-0003',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Classification Accuracy)\n\nImplement `solve(input)` where `input = { predictions: list[int], labels: list[int] }`. Return the accuracy score: fraction of correct predictions.',
    correctExplanation:
      'Accuracy = (number of correct predictions) / (total predictions). Basic evaluation metric for classification. Time O(n), Space O(1). Example: [1, 1, 0, 0] predicted vs [1, 0, 0, 1] labels has 2 correct, accuracy = 0.5.',
    tests: [
      { input: [{ predictions: [1, 1, 0, 0], labels: [1, 0, 0, 1] }], expected: 0.5 },
      { input: [{ predictions: [1, 1, 1], labels: [1, 1, 1] }], expected: 1 },
      { input: [{ predictions: [0, 0, 0], labels: [1, 1, 1] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-ai-easy-mean-value-0004',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Feature Mean Calculation)\n\nImplement `solve(input)` where `input = list[float]`. Return the mean (average) value of the list.',
    correctExplanation:
      'Mean is essential for centering features and understanding dataset statistics. Sum all values and divide by count. Time O(n), Space O(1). Example: [1, 2, 3, 4, 5] returns 3.0.',
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 3 },
      { input: [[10]], expected: 10 },
      { input: [[0, 0, 0]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-ai-easy-confusion-matrix-0005',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Simple Confusion Matrix)\n\nImplement `solve(input)` where `input = { predictions: list[int], labels: list[int] }` with binary classification. Return [TP, FP, FN, TN] (true positive, false positive, false negative, true negative).',
    correctExplanation:
      'Confusion matrix is fundamental for understanding classifier performance beyond accuracy. TP: predicted 1, actual 1. FP: predicted 1, actual 0. FN: predicted 0, actual 1. TN: predicted 0, actual 0. Time O(n), Space O(1).',
    tests: [
      { input: [{ predictions: [1, 1, 0, 0], labels: [1, 0, 0, 1] }], expected: [1, 1, 1, 1] },
      { input: [{ predictions: [1, 1, 1], labels: [1, 1, 0] }], expected: [2, 1, 0, 0] },
      { input: [{ predictions: [0, 0, 0], labels: [0, 0, 0] }], expected: [0, 0, 0, 3] },
    ],
  },
  {
    id: 'raw-coding-ai-easy-binary-cross-entropy-0006',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Binary Cross-Entropy)\n\nImplement `solve(input)` where `input = { predictions: list[float], labels: list[int] }`. Return the binary cross-entropy loss: -mean(y * log(p) + (1 - y) * log(1 - p)).',
    correctExplanation:
      'Binary cross-entropy measures classification loss. Clamp predictions to [1e-7, 1-1e-7] to avoid log(0). Time O(n), Space O(1). Example: prediction 0.9 with label 1 contributes -log(0.9) ≈ 0.105.',
    tests: [
      { input: [{ predictions: [0.9, 0.1], labels: [1, 0] }], expected: 0.10536051565782628 },
      { input: [{ predictions: [1, 0], labels: [1, 0] }], expected: 0 },
      { input: [{ predictions: [0.5, 0.5], labels: [1, 0] }], expected: 0.6931471805599453 },
    ],
  },
  {
    id: 'raw-coding-ai-easy-sigmoid-0007',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Sigmoid Activation)\n\nImplement `solve(input)` where `input = float`. Return the sigmoid value `1 / (1 + exp(-x))`.',
    correctExplanation:
      'Sigmoid maps real values to (0, 1), often used for binary output probabilities. Compute directly from the formula. Time O(1), Space O(1).',
    tests: [
      { input: [0], expected: 0.5 },
      { input: [1], expected: 0.7310585786300049 },
      { input: [-1], expected: 0.2689414213699951 },
    ],
  },
  {
    id: 'raw-coding-ai-easy-threshold-predictions-0008',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Threshold Probabilities)\n\nImplement `solve(input)` where `input = { probs: list[float], threshold: float }`. Return binary predictions where value is 1 if prob >= threshold else 0.',
    correctExplanation:
      'Thresholding converts model probabilities into class labels. This is common in binary classification pipelines. Time O(n), Space O(n).',
    tests: [
      { input: [{ probs: [0.2, 0.5, 0.8], threshold: 0.5 }], expected: [0, 1, 1] },
      { input: [{ probs: [0.49, 0.5], threshold: 0.5 }], expected: [0, 1] },
      { input: [{ probs: [], threshold: 0.5 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-ai-easy-one-hot-encode-0009',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (One-Hot Encode Labels)\n\nImplement `solve(input)` where `input = { labels: list[int], numClasses: int }`. Return one-hot encoded vectors for each label.',
    correctExplanation:
      'One-hot vectors are standard for representing categorical classes in neural networks. For each label, build a zero vector and set the class index to 1. Time O(n * c), Space O(n * c).',
    tests: [
      { input: [{ labels: [0, 2, 1], numClasses: 3 }], expected: [[1, 0, 0], [0, 0, 1], [0, 1, 0]] },
      { input: [{ labels: [1], numClasses: 2 }], expected: [[0, 1]] },
      { input: [{ labels: [], numClasses: 4 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-ai-easy-train-val-counts-0010',
    difficulty: 'easy',
    prompt:
      'AI/ML Raw Coding (Train/Validation Split Counts)\n\nImplement `solve(input)` where `input = { totalSamples: int, trainRatio: float }`. Return `{ trainCount, valCount }` using `trainCount = floor(totalSamples * trainRatio)` and `valCount = totalSamples - trainCount`.',
    correctExplanation:
      'Splitting data into train/validation sets is a basic ML workflow step. Use floor to keep integer counts and assign the remainder to validation. Time O(1), Space O(1).',
    tests: [
      { input: [{ totalSamples: 101, trainRatio: 0.8 }], expected: { trainCount: 80, valCount: 21 } },
      { input: [{ totalSamples: 10, trainRatio: 0.7 }], expected: { trainCount: 7, valCount: 3 } },
      { input: [{ totalSamples: 0, trainRatio: 0.8 }], expected: { trainCount: 0, valCount: 0 } },
    ],
  },
]

export default data
