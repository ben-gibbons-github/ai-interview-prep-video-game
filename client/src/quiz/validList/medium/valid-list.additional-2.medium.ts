const data = [
  {
    id: 'medium-valid-list-incident-triage-10',
    difficulty: 'medium',
    prompt: 'Select all actions that belong in the first 15 minutes of incident triage.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Early triage should confirm impact, stabilize users, and establish communication ownership.',
    validList: {
      helperText: 'Choose every step that is part of immediate triage.',
      items: [
        'Declare incident severity and owner',
        'Assess user impact and blast radius',
        'Apply immediate mitigation if available',
        'Open a shared incident comms channel',
        'Rewrite long-term architecture first',
        'Disable all alerts globally',
        'Wait an hour before stakeholder updates',
        'Start with cosmetic UI fixes',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'medium-valid-list-api-evolution-10',
    difficulty: 'medium',
    prompt: 'Select all API evolution choices that are usually backward-compatible.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Additive changes and tolerant readers are common compatibility-preserving tactics.',
    validList: {
      helperText: 'Pick every option that generally preserves backward compatibility.',
      items: [
        'Add optional response fields',
        'Keep old enum values valid',
        'Introduce new endpoints without deleting old ones',
        'Use explicit versioning/deprecation windows',
        'Rename required fields silently',
        'Change response type semantics without notice',
        'Remove long-used endpoints immediately',
        'Reuse status codes with new meanings',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data
