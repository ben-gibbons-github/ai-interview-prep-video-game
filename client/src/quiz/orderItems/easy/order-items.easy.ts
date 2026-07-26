const data = [
  {
    id: 'easy-order-items-programming-interview-flow-1',
    difficulty: 'easy',
    prompt: 'Order the steps for approaching a programming interview problem from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A strong programming interview sequence starts by clarifying the problem, then planning before coding, and finally validating with tests and edge cases.',
    orderItems: {
      helperText: 'Drag these into the best end-to-end sequence.',
      items: [
        'Write clean, runnable code',
        'Clarify requirements and constraints',
        'Explain your algorithm and complexity',
        'Test with examples and edge cases',
        'Outline approach and data structures',
      ],
      correctOrder: [1, 4, 2, 0, 3],
    },
  },
  {
    id: 'easy-order-items-code-debugging-flow-2',
    difficulty: 'easy',
    prompt: 'Order a practical debugging flow for a failing coding interview solution from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'The fastest debug loop is reproduce, isolate, inspect assumptions, patch, and re-validate with focused tests.',
    orderItems: {
      helperText: 'Arrange these debugging actions into an efficient sequence.',
      items: [
        'Re-run against the exact failing test input',
        'Apply a minimal code fix',
        'Verify with original and nearby edge cases',
        'Inspect variable states around the failure point',
        'Narrow the bug to one function or branch',
      ],
      correctOrder: [0, 4, 3, 1, 2],
    },
  },
  {
    id: 'easy-order-items-time-complexity-explanation-3',
    difficulty: 'easy',
    prompt: 'Order how to explain algorithm complexity clearly in an interview from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Good explanations start with the dominant operation, then scale by input size, and end with concrete tradeoffs.',
    orderItems: {
      helperText: 'Put these explanation steps in the best order.',
      items: [
        'State the dominant loop or operation',
        'Mention practical tradeoffs versus alternatives',
        'Count how work grows with input size',
        'State final Big-O time and space',
        'Call out best and worst case assumptions',
      ],
      correctOrder: [0, 2, 4, 3, 1],
    },
  },
  {
    id: 'easy-order-items-api-design-walkthrough-4',
    difficulty: 'easy',
    prompt: 'Order the steps to walk through a simple API design interview prompt from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A clear API walkthrough starts from use case, then resources, endpoints, payloads, and basic validation behavior.',
    orderItems: {
      helperText: 'Arrange these API design actions in a logical flow.',
      items: [
        'Define core resource and use case',
        'Specify request and response fields',
        'List key endpoints and HTTP methods',
        'State validation and error handling basics',
        'Clarify expected client workflow',
      ],
      correctOrder: [4, 0, 2, 1, 3],
    },
  },
  {
    id: 'easy-order-items-unit-testing-flow-5',
    difficulty: 'easy',
    prompt: 'Order a clean unit-testing flow for a coding question from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Strong test flow begins with happy path, then edge cases, then invalid inputs, and ends with regression coverage.',
    orderItems: {
      helperText: 'Build a practical test-writing order.',
      items: [
        'Add one representative happy-path test',
        'Add edge-case tests',
        'Run tests and inspect failures',
        'Add invalid-input or boundary tests',
        'Add regression test for discovered bug',
      ],
      correctOrder: [0, 1, 3, 2, 4],
    },
  },
  {
    id: 'easy-order-items-behavioral-story-quick-6',
    difficulty: 'easy',
    prompt: 'Order a concise STAR-style behavioral answer from 1 to 4.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Interviewers track context, responsibility, execution, and measurable impact in that sequence.',
    orderItems: {
      helperText: 'Arrange these four sections in speaking order.',
      items: [
        'Situation and Task context',
        'Your Actions',
        'Result and impact',
        'Your explicit ownership',
      ],
      correctOrder: [0, 3, 1, 2],
    },
  },
  {
    id: 'easy-order-items-code-review-response-7',
    difficulty: 'easy',
    prompt: 'Order how to respond to code review feedback professionally from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Good responses acknowledge feedback, clarify intent, apply changes, and close the loop with summary.',
    orderItems: {
      helperText: 'Put these collaboration steps in order.',
      items: [
        'Acknowledge and thank the reviewer',
        'Clarify any ambiguous feedback quickly',
        'Update code with agreed changes',
        'Re-run tests and checks',
        'Reply with concise summary of updates',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'easy-order-items-whiteboard-problem-flow-8',
    difficulty: 'easy',
    prompt: 'Order a whiteboard problem-solving flow from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Clear whiteboard execution moves from understanding to plan, then implementation and verification.',
    orderItems: {
      helperText: 'Arrange this interview problem flow from start to finish.',
      items: [
        'Clarify input/output and constraints',
        'Talk through a small example',
        'Outline approach and data structures',
        'Write code progressively',
        'Trace with test cases',
        'Discuss complexity and follow-ups',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
]

export default data
