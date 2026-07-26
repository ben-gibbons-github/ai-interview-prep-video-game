import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ai-medium-softmax-0001',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Softmax Function)\n\nAI Backstory:\nYou are shipping a multi-class classifier for a support-ticket router. The model head returns raw logits for each class, but downstream systems (confidence thresholds, analytics, and UI confidence bars) require calibrated probability-like outputs that sum to 1.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = list[float]` and each value is a class logit. Return a list of softmax probabilities in the same order.\n\nMathematical Definition:\nsoftmax_i = exp(logit_i) / sum_j exp(logit_j)\n\nInput/Output Contract:\n1. Input is a flat list of floats (can contain positive, negative, and large values).\n2. Output length must equal input length.\n3. Output values must be floats in (0, 1), and total should be approximately 1 (within floating-point tolerance).\n\nCritical Edge Cases:\n1. Empty input should return empty output.\n2. Very large logits must not overflow.\n3. Equal logits should produce equal probabilities.\n\nImplementation Requirement:\nUse numerical stabilization by subtracting `max(input)` before exponentiation.\n\nHint:\nA robust pattern is: (a) find max, (b) compute shifted exponentials, (c) divide each by the shifted sum.\n\nWhy This Matters In AI:\nSoftmax is standard for multi-class prediction and appears throughout deep learning systems (including attention-style normalization). Numerical stability is a production necessity, not a micro-optimization.',
    correctExplanation:
      'A correct solution does three passes: find max, compute shifted exponentials, then normalize by their sum. The max-shift identity leaves probabilities unchanged mathematically but prevents numerical overflow. Complexity is O(n) time and O(n) space for the output (and often an intermediate exponent list). Example: [1, 2, 3] gives approximately [0.0900, 0.2447, 0.6652].',
    tests: [
      { input: [[1, 2, 3]], expected: [0.09003057317038046, 0.24472147173042537, 0.6652479550991942] },
      { input: [[0]], expected: [1] },
      { input: [[1, 1]], expected: [0.5, 0.5] },
    ],
  },
  {
    id: 'raw-coding-ai-medium-cosine-similarity-0002',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Cosine Similarity)\n\nAI Backstory:\nYou are implementing semantic search over embedding vectors for a knowledge assistant. Relevance should depend on angle/direction in embedding space, not raw vector scale, because model pipelines can produce embeddings with differing magnitudes.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = { vec1: list[float], vec2: list[float] }`. Return cosine similarity as a single float.\n\nFormula:\ncosine = dot(vec1, vec2) / (||vec1|| * ||vec2||)\n\nInput/Output Contract:\n1. `vec1` and `vec2` are numeric vectors of equal length for core logic.\n2. Return a float in [-1, 1] when norms are non-zero.\n3. Preserve deterministic behavior for all valid numeric inputs.\n\nCritical Edge Cases:\n1. If either vector has zero norm, return 0.\n2. Orthogonal vectors should return 0 (or very close due to float math).\n3. Identical vectors should return 1 (within tolerance).\n\nHint:\nCompute dot product and both squared norms in one loop, then take square roots once at the end.\n\nWhy This Matters In AI:\nCosine similarity is a default primitive in retrieval-augmented generation, recommendation ranking, and duplicate detection because it captures semantic direction instead of magnitude bias.',
    correctExplanation:
      'The key formula is dot/(norm1*norm2), with norm as sqrt(sum(x_i^2)). Returning 0 for any zero vector is a practical guardrail that avoids undefined behavior. Time is O(n), space is O(1). Output range is [-1, 1], where 1 means same direction, 0 orthogonal, and -1 opposite direction.',
    tests: [
      { input: [{ vec1: [1, 0], vec2: [0, 1] }], expected: 0 },
      { input: [{ vec1: [1, 1], vec2: [1, 1] }], expected: 1 },
      { input: [{ vec1: [1, 2, 3], vec2: [1, 2, 3] }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-ai-medium-standard-deviation-0003',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Standard Deviation)\n\nAI Backstory:\nYou are building a feature-health dashboard used before model retraining. Data scientists need a fast summary of dispersion to detect drifting or collapsed features.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = list[float]`. Return the population standard deviation:\nstd = sqrt(mean((x - mean(input))^2)).\n\nInput/Output Contract:\n1. Input is a list of numeric feature values.\n2. Return a single float representing population standard deviation.\n3. Use population variance convention (divide by n, not n-1).\n\nCritical Edge Cases:\n1. Empty input returns 0.\n2. Single-value input returns 0.\n3. Constant-valued arrays return 0.\n\nHint:\nA clear implementation is two-pass: first compute mean, then compute mean squared deviation, then square root.\n\nWhy This Matters In AI:\nMany preprocessing and monitoring decisions depend on scale estimates. A silent mismatch between population and sample formulas can create inconsistent normalization and hard-to-debug metric shifts.',
    correctExplanation:
      'Correct logic: compute mean, accumulate squared deviations, divide by n, and take square root. This yields population standard deviation. Time O(n), space O(1). Example [1, 2, 3, 4, 5] has mean 3 and variance 2, so std is sqrt(2) ≈ 1.4142.',
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 1.4142135623730951 },
      { input: [[1, 1, 1]], expected: 0 },
      { input: [[0, 10]], expected: 5 },
    ],
  },
  {
    id: 'raw-coding-ai-medium-f1-score-0004',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (F1 Score)\n\nAI Backstory:\nYou are evaluating a fraud-detection classifier where positive events are rare. Product leadership cares about catching fraud without flooding analysts with false alarms, so plain accuracy is not useful.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = { predictions: list[int], labels: list[int] }` for binary classification (0/1). Return the F1 score for the positive class (1).\n\nDefinitions:\n1. precision = TP / (TP + FP)\n2. recall = TP / (TP + FN)\n3. F1 = 2 * precision * recall / (precision + recall)\n\nInput/Output Contract:\n1. Predictions and labels are same length for core logic.\n2. Return a single float in [0, 1].\n3. Positive class is label 1.\n\nCritical Edge Cases:\n1. If precision + recall == 0, return 0.\n2. If there are no predicted positives, precision should resolve safely to 0.\n3. If there are no actual positives, recall should resolve safely to 0.\n\nHint:\nCount TP, FP, FN in one scan, then compute precision/recall with denominator guards before F1.\n\nWhy This Matters In AI:\nF1 is widely used in imbalanced domains (fraud, abuse moderation, diagnosis triage) because it rewards systems that are both precise and sensitive.',
    correctExplanation:
      'A solid solution scans once to count TP/FP/FN, then computes precision and recall with divide-by-zero guards, and finally F1. Harmonic mean penalizes imbalance more than arithmetic mean. Time O(n), space O(1). If there are no predicted positives and no true positives, returning 0 is the standard practical convention.',
    tests: [
      { input: [{ predictions: [1, 1, 0, 0], labels: [1, 0, 0, 1] }], expected: 0.5 },
      { input: [{ predictions: [1, 1, 1], labels: [1, 1, 1] }], expected: 1 },
      { input: [{ predictions: [0, 0, 0], labels: [1, 1, 1] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-ai-medium-kmeans-centroid-0005',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (K-Means Centroid Update)\n\nAI Backstory:\nYou are implementing customer-segmentation clustering for an analytics pipeline. Assignment labels are already produced from the previous E-step, and now the system must compute updated centroids for the next iteration.\n\nWhat You Need To Build:\nImplement `solve(input)` where\n`input = { points: list[list[float]], assignments: list[int], k: int }`.\nReturn exactly `k` centroids, where each centroid is the coordinate-wise mean of points assigned to that cluster id.\n\nInput/Output Contract:\n1. `points[i]` corresponds to `assignments[i]`.\n2. Points are fixed-dimensional vectors.\n3. Output must be ordered by cluster id `0..k-1`.\n\nCritical Edge Cases:\n1. Cluster with no assigned points should return a zero vector of feature dimension.\n2. `k` can be less than, equal to, or greater than number of non-empty clusters.\n3. Single-point clusters should return that same point as centroid.\n\nHint:\nPreallocate `sums[k][d]` and `counts[k]`; accumulate first, divide second.\n\nWhy This Matters In AI:\nCentroid update is the core M-step in K-means. Poor handling of empty clusters can introduce NaNs and destabilize iterative jobs in production batch pipelines.',
    correctExplanation:
      'Correct centroid update groups points by assignment and computes coordinate-wise means. Using preallocated sums/counts arrays gives clean O(n*d) time and O(k*d) space. Empty clusters should return a deterministic fallback (here: zero vector) to avoid undefined behavior.',
    tests: [
      { input: [{ points: [[0, 0], [1, 1], [2, 2]], assignments: [0, 0, 1], k: 2 }], expected: [[0.5, 0.5], [2, 2]] },
      { input: [{ points: [[0, 0]], assignments: [0], k: 1 }], expected: [[0, 0]] },
      { input: [{ points: [[1, 1], [2, 2]], assignments: [0, 0], k: 1 }], expected: [[1.5, 1.5]] },
    ],
  },
  {
    id: 'raw-coding-ai-medium-precision-recall-0006',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Precision and Recall)\n\nAI Backstory:\nYou are building a binary-model monitoring panel where operations teams tune decision thresholds. They need raw precision and recall values to understand false-positive pain vs missed-positive risk.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = { predictions: list[int], labels: list[int] }` and both arrays contain binary values {0,1}. Return `[precision, recall]` for class 1.\n\nDefinitions:\n1. precision = TP / (TP + FP)\n2. recall = TP / (TP + FN)\n\nInput/Output Contract:\n1. Positive class is 1.\n2. Output is a two-element float array: [precision, recall].\n3. Deterministic behavior for denominator-zero cases is required.\n\nCritical Edge Cases:\n1. If TP + FP == 0, precision = 0.\n2. If TP + FN == 0, recall = 0.\n3. All-zero predictions must not crash and should return stable metric values.\n\nHint:\nA single pass counting TP, FP, FN is sufficient; true negatives are not needed for these metrics.\n\nWhy This Matters In AI:\nPrecision and recall are the operational language of classifier quality in high-stakes settings where error type matters more than raw accuracy.',
    correctExplanation:
      'A correct implementation counts TP/FP/FN in one scan and applies each formula with denominator checks. Complexity is O(n) time and O(1) space. Returning [0,0] when there are no positive predictions and no detected positives is a common and stable convention.',
    tests: [
      { input: [{ predictions: [1, 1, 0, 0], labels: [1, 0, 0, 1] }], expected: [0.5, 0.5] },
      { input: [{ predictions: [1, 1, 1], labels: [1, 1, 0] }], expected: [0.6666666666666666, 1] },
      { input: [{ predictions: [0, 0, 0], labels: [1, 1, 1] }], expected: [0, 0] },
    ],
  },
  {
    id: 'raw-coding-ai-medium-mse-loss-0007',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Mean Squared Error)\n\nAI Backstory:\nYou are implementing a regression quality endpoint for a forecasting model (demand, latency, or spend). The training and evaluation dashboards require MSE to track optimization progress over time.\n\nWhat You Need To Build:\nImplement `solve(input)` where\n`input = { predictions: list[float], labels: list[float] }`.\nReturn mean squared error across all positions.\n\nFormula:\nMSE = (1/n) * sum_i (pred_i - label_i)^2\n\nInput/Output Contract:\n1. Predictions and labels are aligned by index.\n2. Return a single float.\n3. Same-length arrays are assumed for core logic.\n\nCritical Edge Cases:\n1. Empty arrays should return 0 (safe default).\n2. Perfect predictions should return 0 exactly.\n3. Negative values are valid and should work correctly.\n\nHint:\nAccumulate squared residuals in one pass, divide by n once at the end.\n\nWhy This Matters In AI:\nMSE is smooth and optimization-friendly, but it amplifies large errors. Teams often pair it with MAE to understand whether a few outliers are dominating model quality.',
    correctExplanation:
      'The formula is straightforward: sum squared residuals and divide by element count. Complexity is O(n) time, O(1) extra space. Because errors are squared, a few large misses can dominate the metric, which is why MAE is often compared alongside MSE.',
    tests: [
      { input: [{ predictions: [2, 4], labels: [1, 5] }], expected: 1 },
      { input: [{ predictions: [0, 0, 0], labels: [0, 0, 0] }], expected: 0 },
      { input: [{ predictions: [1, 2, 3], labels: [2, 2, 2] }], expected: 0.6666666666666666 },
    ],
  },
  {
    id: 'raw-coding-ai-medium-mae-loss-0008',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Mean Absolute Error)\n\nAI Backstory:\nYou are extending regression monitoring for a pricing model where product managers want a metric in real-world units (for example dollars off per prediction) and less sensitivity to occasional spikes.\n\nWhat You Need To Build:\nImplement `solve(input)` where\n`input = { predictions: list[float], labels: list[float] }`.\nReturn mean absolute error (MAE).\n\nFormula:\nMAE = (1/n) * sum_i |pred_i - label_i|\n\nInput/Output Contract:\n1. Predictions and labels are aligned by index.\n2. Return a single float.\n3. Same-length arrays are assumed for core logic.\n\nCritical Edge Cases:\n1. Empty arrays should return 0.\n2. Exact-match predictions should return 0.\n3. Negative values and mixed-sign data should be handled normally.\n\nHint:\nUse absolute residuals (not squared residuals), sum once, divide by n.\n\nWhy This Matters In AI:\nMAE is interpretable and robust to outliers compared with MSE. It is commonly used when typical error magnitude matters more than heavily penalizing rare misses.',
    correctExplanation:
      'Correct MAE sums absolute residuals and divides by count. Time O(n), space O(1). Compared with MSE, MAE grows linearly with error magnitude, so it better reflects typical error rather than heavily punishing rare extreme misses.',
    tests: [
      { input: [{ predictions: [2, 4], labels: [1, 5] }], expected: 1 },
      { input: [{ predictions: [0, 0], labels: [0, 0] }], expected: 0 },
      { input: [{ predictions: [1, 2, 3], labels: [2, 2, 2] }], expected: 0.6666666666666666 },
    ],
  },
  {
    id: 'raw-coding-ai-medium-top-k-indices-0009',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Top-K Class Indices)\n\nAI Backstory:\nYou are implementing inference post-processing for a multi-class model used by a suggestion engine. The UI and ranking layer need the top-k candidate class ids in deterministic order so repeated requests do not reshuffle equal-score items.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = { scores: list[float], k: int }`. Return indices of the highest-scoring classes.\n\nRanking Rules:\n1. Primary sort: score descending.\n2. Tie-break sort: index ascending (smaller index first).\n\nInput/Output Contract:\n1. Output is a list of indices only (not scores).\n2. Returned list length should be `min(max(k, 0), len(scores))`.\n3. Behavior must be deterministic for ties.\n\nCritical Edge Cases:\n1. `k <= 0` returns `[]`.\n2. `k > len(scores)` returns all ranked indices.\n3. Duplicate scores must follow the tie-break rule exactly.\n\nHint:\nCreate `(index, score)` pairs, sort with a compound key/comparator, then slice first `k` indices.\n\nWhy This Matters In AI:\nTop-k extraction is foundational in recommendation, retrieval, and classification serving. Deterministic tie logic prevents flaky tests and inconsistent user experience.',
    correctExplanation:
      'The expected approach sorts index-score pairs by score descending and index ascending, then slices first k indices. Complexity is O(n log n) time and O(n) space. Deterministic tie handling is the key subtlety; without it, outputs may fluctuate between equally scored classes.',
    tests: [
      { input: [{ scores: [0.2, 0.9, 0.7, 0.9], k: 2 }], expected: [1, 3] },
      { input: [{ scores: [5, 4, 3], k: 1 }], expected: [0] },
      { input: [{ scores: [0.1, 0.2], k: 5 }], expected: [1, 0] },
    ],
  },
  {
    id: 'raw-coding-ai-medium-majority-vote-0010',
    difficulty: 'medium',
    prompt:
      'AI/ML Raw Coding (Ensemble Majority Vote)\n\nAI Backstory:\nYou are deploying an ensemble classifier where multiple sub-models vote per sample (for example, different training seeds or model families). The serving system must collapse these votes into one stable final label per sample.\n\nWhat You Need To Build:\nImplement `solve(input)` where `input = list[list[int]]`.\nEach inner list is the set of model predictions for one sample. Return a list containing one final predicted label per sample.\n\nVoting Rules:\n1. Choose the label with highest vote count for that sample.\n2. If vote counts tie, choose the numerically smaller label.\n\nInput/Output Contract:\n1. Output length must equal number of samples (outer list length).\n2. Each output element is an integer class label.\n3. Tie behavior must be deterministic.\n\nCritical Edge Cases:\n1. Empty vote list for a sample should return 0 as fallback label.\n2. Two-way or multi-way ties must consistently resolve to smallest label.\n3. Single-vote samples should return that vote directly.\n\nHint:\nUse a per-sample frequency map and track current best `(count, label)` while applying tie-break logic.\n\nWhy This Matters In AI:\nSimple voting often boosts robustness versus single-model predictions. Deterministic tie handling is essential for reproducible offline evals and stable online behavior.',
    correctExplanation:
      'For each sample, count label frequencies, then select the label with max count; on equal count select smaller label. Empty sample fallback to 0 ensures predictable output. If there are n samples and up to m votes each, time is O(n*m) and per-sample extra space is O(u), where u is unique labels in that sample.',
    tests: [
      { input: [[[1, 1, 0], [2, 3, 3], [0, 0, 1]]], expected: [1, 3, 0] },
      { input: [[[1, 2, 1, 2]]], expected: [1] },
      { input: [[[]]], expected: [0] },
    ],
  },
]

export default data
