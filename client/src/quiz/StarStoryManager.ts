import type { QuizDifficulty, RawCodingDifficulty, RuntimeQuizQuestionBankEntry, TranscriptionQuestionMeta } from './QuizQuestionManager'
import type { RunLaunchConfig } from '../ui/RunLaunchConfig'

export type StarStorySectionKey = 'situation' | 'task' | 'action' | 'result'
export type StoryFormat = 'star' | 'narrative'

export interface SavedStarStory {
  fileName: string
  rawText: string
}

export interface ParsedStarStory extends SavedStarStory {
  storyId: string
  title: string
  fileTitle: string
  format: StoryFormat
  sections: Record<StarStorySectionKey, string>
  missingSections: StarStorySectionKey[]
}

const STAR_ORDERING_MIN_ITEMS = 4
const STAR_ORDERING_MAX_ITEMS = 6
const STAR_TRANSCRIPTION_DEBUG_LOGGING = true

const STAR_SECTION_KEYS: StarStorySectionKey[] = ['situation', 'task', 'action', 'result']

const STAR_SECTION_LABELS: Record<StarStorySectionKey, string> = {
  situation: 'Situation',
  task: 'Task',
  action: 'Action',
  result: 'Result',
}

const NARRATIVE_SECTION_LABELS: Record<StarStorySectionKey, string> = {
  situation: 'Section 1',
  task: 'Section 2',
  action: 'Section 3',
  result: 'Section 4',
}

interface StarStoryQuestionBlueprint {
  sourceSection: StarStorySectionKey
  targetSection: StarStorySectionKey
  difficulty: QuizDifficulty
}

const STAR_STORY_QUESTION_BLUEPRINTS: StarStoryQuestionBlueprint[] = [
  {
    sourceSection: 'situation',
    targetSection: 'task',
    difficulty: 'easy',
  },
  {
    sourceSection: 'task',
    targetSection: 'action',
    difficulty: 'medium',
  },
  {
    sourceSection: 'action',
    targetSection: 'result',
    difficulty: 'hard',
  },
]

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'story'
}

function normalizeWhitespace(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00a0]+/g, ' ')
}

function stripFileExtension(fileName: string): string {
  return fileName.replace(/\.[^.]+$/u, '')
}

function titleCaseFileName(fileName: string): string {
  return stripFileExtension(fileName)
    .split(/[-_]+/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function cleanSectionText(value: string): string {
  return normalizeWhitespace(value)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(' ')
    .trim()
}

function summarizeSection(value: string, maxLength = 140): string {
  const cleaned = cleanSectionText(value)
  if (cleaned.length <= maxLength) {
    return cleaned
  }

  const sentence = cleaned.split(/(?<=[.!?])\s+/u)[0]?.trim() ?? cleaned
  if (sentence.length <= maxLength) {
    return sentence
  }

  return `${cleaned.slice(0, Math.max(0, maxLength - 1)).trimEnd()}...`
}

function splitIntoSentences(value: string): string[] {
  const normalized = normalizeWhitespace(value).trim()
  if (normalized.length === 0) {
    return []
  }

  const sentenceLikeParts = normalized
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)

  if (sentenceLikeParts.length > 1) {
    return sentenceLikeParts.map((sentence) => cleanSectionText(sentence))
  }

  // Fallback for long single-line sections with weak punctuation.
  const clauseParts = cleanSectionText(normalized)
    .split(/,|;|\s+-\s+/u)
    .map((part) => part.trim())
    .filter((part) => part.length >= 28)

  if (clauseParts.length > 1) {
    return clauseParts
  }

  return [cleanSectionText(normalized)]
}

function pickRandomSentence(value: string): string {
  const sentences = splitIntoSentences(value)
  if (sentences.length === 0) {
    return summarizeSection(value)
  }

  const randomIndex = Math.floor(Math.random() * sentences.length)
  return summarizeSection(sentences[randomIndex])
}

function toSectionDifficulty(sectionKey: StarStorySectionKey): QuizDifficulty {
  if (sectionKey === 'situation' || sectionKey === 'task') {
    return 'easy'
  }

  if (sectionKey === 'action') {
    return 'medium'
  }

  return 'hard'
}

function promoteStarStoryDifficulty(difficulty: RawCodingDifficulty, forceHardStart: boolean): RawCodingDifficulty {
  if (!forceHardStart) {
    return difficulty
  }

  return difficulty === 'easy' || difficulty === 'medium' ? 'hard' : difficulty
}

function pickRandomOrderedSentenceWindow(value: string): string[] {
  const sentences = splitIntoSentences(value).map((sentence) => summarizeSection(sentence, 120))

  if (sentences.length < STAR_ORDERING_MIN_ITEMS) {
    return []
  }

  const maxWindowSize = Math.min(STAR_ORDERING_MAX_ITEMS, sentences.length)
  const windowSize =
    maxWindowSize === STAR_ORDERING_MIN_ITEMS
      ? STAR_ORDERING_MIN_ITEMS
      : STAR_ORDERING_MIN_ITEMS + Math.floor(Math.random() * (maxWindowSize - STAR_ORDERING_MIN_ITEMS + 1))
  const maxStartIndex = sentences.length - windowSize
  const startIndex = maxStartIndex > 0 ? Math.floor(Math.random() * (maxStartIndex + 1)) : 0

  return sentences.slice(startIndex, startIndex + windowSize)
}

function buildFullStoryOrderedSentences(story: ParsedStarStory): string[] {
  const ordered: string[] = []

  for (const sectionKey of STAR_SECTION_KEYS) {
    const sectionText = story.sections[sectionKey]
    if (sectionText.length === 0) {
      continue
    }

    const sectionSentences = splitIntoSentences(sectionText)
      .map((sentence) => summarizeSection(sentence, 140))
      .filter((sentence) => sentence.length > 0)

    for (const sentence of sectionSentences) {
      ordered.push(sentence)
    }
  }

  return ordered
}

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const temp = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = temp
  }

  return shuffled
}

function sampleStoriesForCombinedOrdering(stories: ParsedStarStory[], count: number): ParsedStarStory[] {
  const candidates = stories.filter((story) => buildFullStoryOrderedSentences(story).length >= STAR_ORDERING_MIN_ITEMS)
  if (candidates.length < count) {
    return []
  }

  return shuffleItems(candidates).slice(0, count)
}

function buildCombinedOrderingItems(stories: ParsedStarStory[]): string[] {
  const combined: string[] = []

  for (const story of stories) {
    const storySentences = buildFullStoryOrderedSentences(story)

    for (const sentence of storySentences) {
      combined.push(sentence)
    }
  }

  return combined
}

function detectSectionHeading(line: string): { key: StarStorySectionKey; remainder: string } | null {
  const trimmed = line.trim()
  const matchers: Array<{ key: StarStorySectionKey; pattern: RegExp }> = [
    { key: 'situation', pattern: /^(?:#{1,6}\s*)?(?:situation|context|background|s)\s*[:\-]\s*(.*)$/iu },
    { key: 'task', pattern: /^(?:#{1,6}\s*)?(?:task|goal|responsibility|objective|t)\s*[:\-]\s*(.*)$/iu },
    { key: 'action', pattern: /^(?:#{1,6}\s*)?(?:action|actions|approach|what i did|a)\s*[:\-]\s*(.*)$/iu },
    { key: 'result', pattern: /^(?:#{1,6}\s*)?(?:result|results|outcome|impact|r)\s*[:\-]\s*(.*)$/iu },
  ]

  for (const matcher of matchers) {
    const match = trimmed.match(matcher.pattern)
    if (match) {
      return {
        key: matcher.key,
        remainder: match[1]?.trim() ?? '',
      }
    }
  }

  return null
}

function splitIntoParagraphs(value: string): string[] {
  return normalizeWhitespace(value)
    .split(/\n\s*\n/u)
    .map((paragraph) => cleanSectionText(paragraph))
    .filter((paragraph) => paragraph.length > 0)
}

function buildSyntheticNarrativeSections(value: string): Record<StarStorySectionKey, string> {
  const sentences = splitIntoSentences(value).filter((sentence) => sentence.length > 0)

  const result: Record<StarStorySectionKey, string> = {
    situation: '',
    task: '',
    action: '',
    result: '',
  }

  if (sentences.length === 0) {
    return result
  }

  const buckets: string[][] = [[], [], [], []]

  if (sentences.length <= 4) {
    sentences.forEach((sentence, index) => {
      buckets[index].push(sentence)
    })
  } else {
    const chunkSize = Math.ceil(sentences.length / 4)

    sentences.forEach((sentence, index) => {
      const bucketIndex = Math.min(3, Math.floor(index / chunkSize))
      buckets[bucketIndex].push(sentence)
    })
  }

  STAR_SECTION_KEYS.forEach((sectionKey, index) => {
    result[sectionKey] = cleanSectionText(buckets[index].join(' '))
  })

  return result
}

function getSectionLabels(format: StoryFormat): Record<StarStorySectionKey, string> {
  return format === 'star' ? STAR_SECTION_LABELS : NARRATIVE_SECTION_LABELS
}

export function parseStarStory(story: SavedStarStory, storyIndex = 0): ParsedStarStory {
  const normalizedText = normalizeWhitespace(story.rawText).trim()
  const rawLines = normalizedText.split('\n')
  const firstContentLine = rawLines.find((line) => line.trim().length > 0) ?? ''
  const firstLineHeading = detectSectionHeading(firstContentLine)
  const fileTitle = titleCaseFileName(story.fileName || `STAR Story ${storyIndex + 1}`)
  const explicitMarkdownTitle =
    !firstLineHeading && /^#{1,6}\s+/u.test(firstContentLine)
      ? firstContentLine.trim().replace(/^#{1,6}\s+/u, '')
      : ''
  const title = explicitMarkdownTitle || fileTitle

  const bodyLines =
    explicitMarkdownTitle.length > 0
      ? rawLines.slice(rawLines.indexOf(firstContentLine) + 1)
      : rawLines

  const sectionBuffers: Record<StarStorySectionKey, string[]> = {
    situation: [],
    task: [],
    action: [],
    result: [],
  }
  const preamble: string[] = []
  let activeSection: StarStorySectionKey | null = null
  let detectedStarHeadingCount = 0

  for (const line of bodyLines) {
    const heading = detectSectionHeading(line)
    if (heading) {
      activeSection = heading.key
      detectedStarHeadingCount += 1
      if (heading.remainder.length > 0) {
        sectionBuffers[heading.key].push(heading.remainder)
      }
      continue
    }

    if (activeSection) {
      sectionBuffers[activeSection].push(line)
    } else if (line.trim().length > 0) {
      preamble.push(line)
    }
  }

  const sections: Record<StarStorySectionKey, string> = {
    situation: cleanSectionText(sectionBuffers.situation.join('\n')),
    task: cleanSectionText(sectionBuffers.task.join('\n')),
    action: cleanSectionText(sectionBuffers.action.join('\n')),
    result: cleanSectionText(sectionBuffers.result.join('\n')),
  }

  const fallbackParagraphs = splitIntoParagraphs([preamble.join('\n'), ...bodyLines].join('\n'))

  STAR_SECTION_KEYS.forEach((sectionKey, index) => {
    if (sections[sectionKey].length === 0) {
      sections[sectionKey] = fallbackParagraphs[index] ?? ''
    }
  })

  if (sections.result.length === 0 && fallbackParagraphs.length > 0) {
    sections.result = fallbackParagraphs[fallbackParagraphs.length - 1] ?? ''
  }

  let format: StoryFormat = detectedStarHeadingCount >= 2 ? 'star' : 'narrative'

  if (format === 'narrative') {
    const syntheticSections = buildSyntheticNarrativeSections(story.rawText)

    STAR_SECTION_KEYS.forEach((sectionKey) => {
      sections[sectionKey] = syntheticSections[sectionKey] || sections[sectionKey]
    })
  }

  const nonEmptySectionCount = STAR_SECTION_KEYS.filter((sectionKey) => sections[sectionKey].length > 0).length
  if (nonEmptySectionCount >= 3 && detectedStarHeadingCount >= 1) {
    format = 'star'
  }

  const missingSections = STAR_SECTION_KEYS.filter((sectionKey) => sections[sectionKey].length === 0)

  return {
    ...story,
    storyId: `star-story-${storyIndex + 1}-${slugify(title || story.fileName)}`,
    title,
    fileTitle,
    format,
    sections,
    missingSections,
  }
}

function uniqueOptionValues(values: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const value of values) {
    const trimmed = value.trim()
    if (trimmed.length === 0 || seen.has(trimmed)) {
      continue
    }

    seen.add(trimmed)
    result.push(trimmed)
  }

  return result
}

function buildDistractors(
  stories: ParsedStarStory[],
  currentStory: ParsedStarStory,
  sectionKey: StarStorySectionKey,
  answerSummary: string,
): string[] {
  const sameSectionCandidates = stories
    .filter((story) => story.storyId !== currentStory.storyId)
    .map((story) => pickRandomSentence(story.sections[sectionKey]))

  return uniqueOptionValues(sameSectionCandidates)
    .filter((value) => value !== answerSummary)
    .slice(0, 3)
}

function buildPrompt(
  story: ParsedStarStory,
  sourceSection: StarStorySectionKey,
  targetSection: StarStorySectionKey,
  sourceSummary: string,
): string {
  const labels = getSectionLabels(story.format)
  const heading = story.format === 'star' ? 'STAR Story Match' : 'Story Match'

  return (
    `${heading}\n\n` +
    `This ${labels[sourceSection].toLowerCase()} belongs to one of your uploaded stories:\n` +
    `${sourceSummary}\n\n` +
    `Which ${labels[targetSection].toLowerCase()} belongs to the same story?`
  )
}

function buildTitleMatchPrompt(story: ParsedStarStory, sectionKey: StarStorySectionKey, sentence: string): string {
  const labels = getSectionLabels(story.format)

  return (
    'Story Title Match\n\n' +
    `This ${labels[sectionKey].toLowerCase()} sentence came from one of your uploaded stories:\n` +
    `${sentence}\n\n` +
    'Which file title did it come from?'
  )
}

function buildTitleDistractors(stories: ParsedStarStory[], currentStory: ParsedStarStory): string[] {
  return uniqueOptionValues(
    stories
      .filter((story) => story.storyId !== currentStory.storyId)
      .map((story) => story.fileTitle),
  ).slice(0, 3)
}

function buildTranscriptionSections(story: ParsedStarStory): TranscriptionQuestionMeta['sections'] | null {
  const baseSections = {
    situation: story.sections.situation.trim(),
    task: story.sections.task.trim(),
    action: story.sections.action.trim(),
    result: story.sections.result.trim(),
  }

  const fallbackSentences = STAR_SECTION_KEYS
    .flatMap((sectionKey) => splitIntoSentences(story.sections[sectionKey]))
    .map((sentence) => cleanSectionText(sentence))
    .filter((sentence) => sentence.length > 0)

  if (fallbackSentences.length === 0) {
    const fallbackFromRawText = cleanSectionText(story.rawText)
    if (fallbackFromRawText.length > 0) {
      fallbackSentences.push(fallbackFromRawText)
    }
  }

  if (fallbackSentences.length === 0) {
    return null
  }

  const getFallbackSentence = (offset: number): string => {
    return fallbackSentences[offset % fallbackSentences.length]
  }

  const completedSections: TranscriptionQuestionMeta['sections'] = {
    situation: baseSections.situation || getFallbackSentence(0),
    task: baseSections.task || getFallbackSentence(1),
    action: baseSections.action || getFallbackSentence(2),
    result: baseSections.result || getFallbackSentence(3),
  }

  return completedSections
}

function buildTranscriptionQuestions(story: ParsedStarStory, forceHardStart: boolean): RuntimeQuizQuestionBankEntry[] {
  const transcriptionSections = buildTranscriptionSections(story)
  if (!transcriptionSections) {
    return []
  }

  return [
    {
      id: `${story.storyId}-transcription-easy`,
      difficulty: promoteStarStoryDifficulty('easy', forceHardStart),
      prompt:
        'Story Transcription (Easy): Read the full uploaded story below out loud and submit your transcript. You pass at 30% word overlap.',
      options: ['Submit transcript', 'Skip'],
      correctIndex: 0,
      correctExplanation:
        'Read the full uploaded story clearly. You only need a partial match (>= 30%) to pass.',
      transcriptionQuestion: {
        problemId: story.storyId,
        storyTitle: story.title,
        sections: transcriptionSections,
        matchThreshold: 0.3,
        helperText: 'Easy mode: full uploaded story text is visible while you speak.',
      },
    },
    {
      id: `${story.storyId}-transcription-medium`,
      difficulty: promoteStarStoryDifficulty('medium', forceHardStart),
      prompt:
        'Story Transcription (Medium): Use first-sentence cues from the uploaded story and recite the full response.',
      options: ['Submit transcript', 'Skip'],
      correctIndex: 0,
      correctExplanation:
        'Use the first sentence cues to reconstruct the full story in your own delivery.',
      transcriptionQuestion: {
        problemId: story.storyId,
        storyTitle: story.title,
        sections: transcriptionSections,
        matchThreshold: 0.3,
        helperText: 'Medium mode: only first-sentence cues from your uploaded story are shown.',
      },
    },
    {
      id: `${story.storyId}-transcription-hard`,
      difficulty: 'hard',
      prompt:
        'Story Transcription (Hard): Recite this uploaded story from memory. No section text is shown.',
      options: ['Submit transcript', 'Skip'],
      correctIndex: 0,
      correctExplanation:
        'Hard mode checks how well you can recall your uploaded story under pressure.',
      transcriptionQuestion: {
        problemId: story.storyId,
        storyTitle: story.title,
        sections: transcriptionSections,
        matchThreshold: 0.3,
        helperText: 'Hard mode: recite from memory; your transcript is still graded against the uploaded text.',
      },
    },
  ]
}

export function buildStarStoryQuestionBank(
  stories: SavedStarStory[],
  runLaunchConfig?: RunLaunchConfig,
): RuntimeQuizQuestionBankEntry[] {
  const parsedStories = stories
    .map((story, index) => parseStarStory(story, index))
  const forceHardStart = runLaunchConfig?.startingArtifacts.starStoriesHardMode === true

  const questions: RuntimeQuizQuestionBankEntry[] = []

  if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
    console.info('[STAR Story Loader] Building runtime bank', {
      uploadedStories: stories.length,
      parsedStories: parsedStories.length,
      parsedStoryIds: parsedStories.map((story) => story.storyId),
    })
  }

  for (const story of parsedStories) {
    const transcriptionQuestions = buildTranscriptionQuestions(story, forceHardStart)
    questions.push(...transcriptionQuestions)

    if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
      console.info('[STAR Story Loader] Story transcription payload', {
        storyId: story.storyId,
        fileName: story.fileName,
        title: story.title,
        missingSections: story.missingSections,
        transcriptionQuestionCount: transcriptionQuestions.length,
        transcriptionProblemIds: transcriptionQuestions
          .map((question) => question.transcriptionQuestion?.problemId)
          .filter((problemId): problemId is string => typeof problemId === 'string'),
      })
    }

    for (const blueprint of STAR_STORY_QUESTION_BLUEPRINTS) {
      const sourceSectionText = story.sections[blueprint.sourceSection]
      const targetSectionText = story.sections[blueprint.targetSection]

      if (sourceSectionText.length === 0 || targetSectionText.length === 0) {
        continue
      }

      const sourceSummary = pickRandomSentence(sourceSectionText)
      const answerSummary = pickRandomSentence(targetSectionText)
      const distractors = buildDistractors(parsedStories, story, blueprint.targetSection, answerSummary)
      const options = uniqueOptionValues([answerSummary, ...distractors])

      if (options.length < 2) {
        continue
      }

      questions.push({
        id: `${story.storyId}-${blueprint.sourceSection}-to-${blueprint.targetSection}`,
        prompt: buildPrompt(story, blueprint.sourceSection, blueprint.targetSection, sourceSummary),
        options: options.slice(0, Math.min(4, options.length)),
        correctIndex: 0,
        difficulty: promoteStarStoryDifficulty(blueprint.difficulty, forceHardStart),
        correctExplanation:
          `${getSectionLabels(story.format)[blueprint.sourceSection]}: ${cleanSectionText(sourceSectionText)} ` +
          `Matched ${getSectionLabels(story.format)[blueprint.targetSection]}: ${cleanSectionText(targetSectionText)}`,
      })
    }

    for (const sectionKey of STAR_SECTION_KEYS) {
      const sectionText = story.sections[sectionKey]
      if (sectionText.length === 0) {
        continue
      }

      const titleMatchSentence = pickRandomSentence(sectionText)
      const titleOptions = uniqueOptionValues([story.fileTitle, ...buildTitleDistractors(parsedStories, story)])

      if (titleOptions.length >= 2) {
        questions.push({
          id: `${story.storyId}-${sectionKey}-file-title`,
          prompt: buildTitleMatchPrompt(story, sectionKey, titleMatchSentence),
          options: titleOptions.slice(0, Math.min(4, titleOptions.length)),
          correctIndex: 0,
          difficulty: promoteStarStoryDifficulty(toSectionDifficulty(sectionKey), forceHardStart),
          correctExplanation: `That sentence came from the file titled ${story.fileTitle}.`,
        })
      }

      const orderedWindow = pickRandomOrderedSentenceWindow(story.sections[sectionKey])
      if (orderedWindow.length < STAR_ORDERING_MIN_ITEMS) {
        continue
      }

      questions.push({
        id: `${story.storyId}-${sectionKey}-ordering`,
        prompt:
          'Story Ordering\n\n' +
          'Put these snippets back into the order they originally appeared in one of your uploaded STAR stories.',
        options: ['Correct order submitted', 'Incorrect order submitted'],
        correctIndex: 0,
        difficulty: promoteStarStoryDifficulty(toSectionDifficulty(sectionKey), forceHardStart),
        correctExplanation:
          `Original ${getSectionLabels(story.format)[sectionKey]} order: ${orderedWindow.join(' -> ')}`,
        orderItems: {
          helperText: 'Drag the snippets into the original order from first to last.',
          items: orderedWindow,
          correctOrder: Array.from({ length: orderedWindow.length }, (_, index) => index),
        },
      })
    }

    const fullStoryOrderedSentences = buildFullStoryOrderedSentences(story)
    if (fullStoryOrderedSentences.length >= STAR_ORDERING_MIN_ITEMS) {
      questions.push({
        id: `${story.storyId}-full-story-ordering`,
        prompt:
          'Story Full Timeline\n\n' +
          'Put every sentence from this STAR story back into the original top-to-bottom order.',
        options: ['Correct order submitted', 'Incorrect order submitted'],
        correctIndex: 0,
        difficulty: promoteStarStoryDifficulty('hard', forceHardStart),
        correctExplanation:
          `Original full story order for ${story.fileTitle}: ${fullStoryOrderedSentences.join(' -> ')}`,
        orderItems: {
          helperText: 'Drag every sentence into the exact original story order from first to last.',
          items: fullStoryOrderedSentences,
          correctOrder: Array.from({ length: fullStoryOrderedSentences.length }, (_, index) => index),
        },
      })
    }
  }

  const sampledVeryHardStories = sampleStoriesForCombinedOrdering(parsedStories, 2)
  if (sampledVeryHardStories.length === 2) {
    const combinedVeryHardItems = buildCombinedOrderingItems(sampledVeryHardStories)
    if (combinedVeryHardItems.length >= STAR_ORDERING_MIN_ITEMS) {
      questions.push({
        id: `star-story-very-hard-dual-story-ordering-${sampledVeryHardStories.map((story) => story.storyId).join('-')}`,
        prompt:
          'Very Hard STAR Ordering\n\n' +
          'Rebuild this combined timeline by placing every sentence from one full story first, then every sentence from the second story, each in original order.',
        options: ['Correct order submitted', 'Incorrect order submitted'],
        correctIndex: 0,
        difficulty: promoteStarStoryDifficulty('veryHard', forceHardStart),
        correctExplanation:
          `Correct order is Story A (${sampledVeryHardStories[0].fileTitle}) fully, then Story B (${sampledVeryHardStories[1].fileTitle}) fully, preserving each story's internal order.`,
        orderItems: {
          helperText: 'Group and order all sentences so one full story comes first, then the second full story.',
          items: combinedVeryHardItems,
          correctOrder: Array.from({ length: combinedVeryHardItems.length }, (_, index) => index),
        },
      })
    }
  }

  const sampledInsanelyHardStories = sampleStoriesForCombinedOrdering(parsedStories, 4)
  if (sampledInsanelyHardStories.length === 4) {
    const combinedInsanelyHardItems = buildCombinedOrderingItems(sampledInsanelyHardStories)
    if (combinedInsanelyHardItems.length >= STAR_ORDERING_MIN_ITEMS) {
      questions.push({
        id: `star-story-insanely-hard-quad-story-ordering-${sampledInsanelyHardStories.map((story) => story.storyId).join('-')}`,
        prompt:
          'Insanely Hard STAR Ordering\n\n' +
          'Rebuild this mega timeline by placing four full stories back-to-back, each in original order.',
        options: ['Correct order submitted', 'Incorrect order submitted'],
        correctIndex: 0,
        difficulty: promoteStarStoryDifficulty('insanelyHard', forceHardStart),
        correctExplanation:
          `Correct order is Story A (${sampledInsanelyHardStories[0].fileTitle}), then Story B (${sampledInsanelyHardStories[1].fileTitle}), then Story C (${sampledInsanelyHardStories[2].fileTitle}), then Story D (${sampledInsanelyHardStories[3].fileTitle}), each preserving internal sentence order.`,
        orderItems: {
          helperText: 'Infer the four stories from content and order them as four complete story blocks.',
          items: combinedInsanelyHardItems,
          correctOrder: Array.from({ length: combinedInsanelyHardItems.length }, (_, index) => index),
        },
      })
    }
  }

  if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
    const transcriptionQuestions = questions.filter((question) => question.transcriptionQuestion !== undefined)
    const transcriptionProblemIds = Array.from(
      new Set(
        transcriptionQuestions
          .map((question) => question.transcriptionQuestion?.problemId)
          .filter((problemId): problemId is string => typeof problemId === 'string'),
      ),
    )

    console.info('[STAR Story Loader] Runtime bank summary', {
      totalQuestions: questions.length,
      transcriptionQuestionCount: transcriptionQuestions.length,
      transcriptionProblemCount: transcriptionProblemIds.length,
      transcriptionProblemIds,
    })
  }

  return questions
}