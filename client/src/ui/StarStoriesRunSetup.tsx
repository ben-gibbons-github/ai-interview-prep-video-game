import { useEffect, useMemo, useState } from 'react'
import {
  parseStarStory,
  type ParsedStarStory,
  type SavedStarStory,
} from '../quiz/StarStoryManager'

type StarStorySetupMode = 'skip' | 'upload' | 'learn'

interface StarStoriesRunSetupProps {
  initialStories?: SavedStarStory[]
  onStartRun: (stories: SavedStarStory[]) => void
}

const STAR_WORKFLOW_DEBUG_LOGGING = true

function normalizeUniqueStoryFileNames(stories: SavedStarStory[]): SavedStarStory[] {
  const nextStories: SavedStarStory[] = []
  const seenCounts = new Map<string, number>()

  stories.forEach((story) => {
    const baseName = story.fileName.trim().length > 0 ? story.fileName : 'STAR Story'
    const seenCount = seenCounts.get(baseName) ?? 0
    const nextCount = seenCount + 1
    seenCounts.set(baseName, nextCount)

    nextStories.push({
      ...story,
      fileName: nextCount === 1 ? baseName : `${baseName} (${nextCount})`,
    })
  })

  return nextStories
}

function formatStoryCoverage(format: ParsedStarStory['format'], missingSections: ParsedStarStory['missingSections']): string {
  if (format === 'narrative') {
    return 'Narrative format detected (non-STAR)'
  }

  if (missingSections.length === 0) {
    return 'All STAR sections detected'
  }

  return `Missing: ${missingSections.join(', ')}`
}

const STAR_STORY_EXAMPLES: Array<{
  title: string
  situation: string
  task: string
  action: string
  result: string
}> = [
  {
    title: 'Scaling an overloaded API',
    situation:
      'Our main customer API was timing out during weekday traffic spikes, and enterprise users were reporting failed dashboard loads.',
    task:
      'I needed to stabilize latency before a major customer renewal while keeping the existing product roadmap on track.',
    action:
      'I profiled the slowest queries, added request-level tracing, moved expensive joins behind a cache, and coordinated a phased rollout with alerts on p95 latency and error rate.',
    result:
      'p95 latency dropped by 62%, timeout volume fell to near zero, and we kept the renewal on schedule without pausing feature delivery.',
  },
  {
    title: 'Leading a risky migration',
    situation:
      'A legacy batch pipeline was blocking reporting freshness and regularly failed when upstream schemas changed.',
    task:
      'I was responsible for migrating the workflow to a more reliable event-driven design without breaking downstream reporting.',
    action:
      'I wrote the migration plan, added contract checks around producers, ran old and new pipelines in parallel, and created rollback checkpoints for each cutover phase.',
    result:
      'Data freshness improved from daily to hourly, failure recovery time dropped dramatically, and the migration completed without a customer-visible incident.',
  },
  {
    title: 'Resolving a cross-team incident',
    situation:
      'A production outage affected multiple internal services, and teams were blaming each other because ownership boundaries were unclear.',
    task:
      'I needed to drive incident response, restore service quickly, and leave the system with clearer ownership and safeguards.',
    action:
      'I ran the incident channel, assigned owners for containment and debugging, documented the timeline live, and then turned the postmortem into concrete follow-up work with deadlines.',
    result:
      'Service was restored within the hour, we closed the highest-risk gaps in the following sprint, and future incidents were easier to triage because the ownership model was clarified.',
  },
]

export function StarStoriesRunSetup({
  initialStories = [],
  onStartRun,
}: StarStoriesRunSetupProps) {
  const [stories, setStories] = useState<SavedStarStory[]>(initialStories)
  const [mode, setMode] = useState<StarStorySetupMode>(initialStories.length > 0 ? 'upload' : 'skip')
  const [isReadingFiles, setIsReadingFiles] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    setStories(initialStories)

    if (STAR_WORKFLOW_DEBUG_LOGGING) {
      console.info('[STAR Workflow][Setup] Initial stories hydrated', {
        count: initialStories.length,
        fileNames: initialStories.map((story) => story.fileName),
      })
    }
  }, [initialStories])

  const parsedStories = useMemo(() => {
    return stories.map((story, index) => parseStarStory(story, index))
  }, [stories])

  const shouldShowUploadTools = mode === 'upload' || mode === 'learn'

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return
    }

    setIsReadingFiles(true)
    setUploadError(null)

    try {
      if (STAR_WORKFLOW_DEBUG_LOGGING) {
        console.info('[STAR Workflow][Setup] Files selected', {
          selectedCount: files.length,
          selectedNames: Array.from(files).map((file) => file.name),
        })
      }

      const loadedStories = await Promise.all(
        Array.from(files).map(async (file) => ({
          fileName: file.name,
          rawText: await file.text(),
        })),
      )

      if (STAR_WORKFLOW_DEBUG_LOGGING) {
        console.info('[STAR Workflow][Setup] Files read complete', {
          loadedCount: loadedStories.length,
          loadedNames: loadedStories.map((story) => story.fileName),
        })
      }

      setStories((current) => {
        // Keep distinct uploads even when source files share the same base filename.
        const mergedStories = [...current, ...loadedStories]
        const normalizedStories = normalizeUniqueStoryFileNames(mergedStories)

        if (STAR_WORKFLOW_DEBUG_LOGGING) {
          console.info('[STAR Workflow][Setup] Stories merged + normalized', {
            previousCount: current.length,
            mergedCount: mergedStories.length,
            normalizedCount: normalizedStories.length,
            normalizedNames: normalizedStories.map((story) => story.fileName),
          })
        }

        return normalizedStories
      })
    } catch {
      setUploadError('One or more files could not be read. Use plain text, markdown, or other text-based files.')
    } finally {
      setIsReadingFiles(false)
    }
  }

  return (
    <div className="question-explorer-backdrop" role="dialog" aria-modal="true" aria-label="STAR story run setup">
      <div className="star-story-setup-popover">
        <header className="star-story-setup-header">
          <div>
            <p className="question-explorer-eyebrow">Run Setup</p>
            <h2>Load STAR Stories</h2>
          </div>
          <div className="star-story-setup-badge">Optional</div>
        </header>

        <p className="star-story-setup-copy">
          Choose how you want to handle STAR stories for this run. You can skip them entirely, upload your own,
          or read a quick explanation before uploading.
        </p>

        <div className="star-story-mode-tabs" role="tablist" aria-label="STAR story setup options">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'skip'}
            className={`star-story-mode-tab${mode === 'skip' ? ' star-story-mode-tab-active' : ''}`}
            onClick={() => setMode('skip')}
          >
            <strong>I don't care about STAR stories</strong>
            <span>Start the run without uploading anything.</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'upload'}
            className={`star-story-mode-tab${mode === 'upload' ? ' star-story-mode-tab-active' : ''}`}
            onClick={() => setMode('upload')}
          >
            <strong>I have STAR stories</strong>
            <span>Open the upload area and add my story files.</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'learn'}
            className={`star-story-mode-tab${mode === 'learn' ? ' star-story-mode-tab-active' : ''}`}
            onClick={() => setMode('learn')}
          >
            <strong>What are STAR stories</strong>
            <span>See examples and how to create them, then upload.</span>
          </button>
        </div>

        {mode === 'learn' ? (
          <section className="star-story-info-panel">
            <h3>What STAR stories are</h3>
            <ul>
              <li>STAR stands for Situation, Task, Action, Result.</li>
              <li>They are short interview stories about real work you did, decisions you made, and outcomes you drove.</li>
              <li>The game can turn them into practice questions across storytelling, matching, ordering, and transcription flows.</li>
              <li>Both strict STAR outlines and looser narrative writeups work, as long as the story is concrete and detailed.</li>
            </ul>
            <h3>How to create them</h3>
            <ul>
              <li>Start from a real project, incident, launch, migration, redesign, or leadership example.</li>
              <li>Write 4 short sections: the context, your goal, what you specifically did, and the measurable result.</li>
              <li>You can ask AI to help you rewrite rough notes into STAR format, but keep the facts truthful and specific.</li>
              <li>Good prompts for AI: turn these bullets into STAR format, make this story more concise, or help me surface metrics and outcomes.</li>
            </ul>
            <h3>How to upload them</h3>
            <ul>
              <li>Save each story as a text or markdown file.</li>
              <li>Use headings if you want, but they are optional.</li>
              <li>Choose the files below and the game will add them to the question pool for this run.</li>
            </ul>

            <h3>Examples</h3>
            <div className="star-story-example-list">
              {STAR_STORY_EXAMPLES.map((example) => (
                <details key={example.title} className="star-story-example-item">
                  <summary className="star-story-example-summary">
                    <span className="star-story-example-caret" aria-hidden="true">▸</span>
                    <span>{example.title}</span>
                  </summary>
                  <div className="star-story-example-body">
                    <p><strong>Situation:</strong> {example.situation}</p>
                    <p><strong>Task:</strong> {example.task}</p>
                    <p><strong>Action:</strong> {example.action}</p>
                    <p><strong>Result:</strong> {example.result}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {shouldShowUploadTools ? (
          <>
            <label className="star-story-upload-card">
              <span className="star-story-upload-title">Upload story files</span>
              <span className="star-story-upload-copy">
                Best results come from text with clear section breaks/headings. STAR headings are optional.
              </span>
              <input
                type="file"
                multiple
                accept=".txt,.md,.markdown,.text,.json"
                onChange={(event) => {
                  void handleFilesSelected(event.target.files)
                  event.currentTarget.value = ''
                }}
              />
            </label>

            {uploadError ? <p className="star-story-upload-error">{uploadError}</p> : null}

            <div className="star-story-setup-toolbar">
              <div className="star-story-setup-stats">
                <strong>{parsedStories.length}</strong>
                <span>{parsedStories.length === 1 ? 'story loaded' : 'stories loaded'}</span>
              </div>

              <button
                type="button"
                className="star-story-inline-button"
                onClick={() => {
                  setStories([])
                  setUploadError(null)
                }}
                disabled={stories.length === 0}
              >
                Clear all
              </button>
            </div>

            <div className="star-story-preview-grid">
              {parsedStories.length > 0 ? (
                parsedStories.map((story) => (
                  <article key={story.storyId} className="star-story-preview-card">
                    <div className="star-story-preview-head">
                      <div>
                        <h3>{story.title}</h3>
                        <p>{story.fileName}</p>
                      </div>
                      <button
                        type="button"
                        className="star-story-inline-button"
                        onClick={() => {
                          setStories((current) => current.filter((entry) => entry.fileName !== story.fileName))
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <p className="star-story-preview-status">{formatStoryCoverage(story.format, story.missingSections)}</p>

                    <div className="star-story-section-grid">
                      {(['situation', 'task', 'action', 'result'] as const).map((sectionKey) => (
                        <div key={sectionKey} className="star-story-section-card">
                          <span>{sectionKey}</span>
                          <p>{story.sections[sectionKey] || 'Not detected'}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <div className="star-story-empty-state">
                  <h3>No STAR stories loaded</h3>
                  <p>You can start the run without them, or upload files now and the questions will join the normal quiz rotation.</p>
                </div>
              )}
            </div>
          </>
        ) : null}

        <div className="star-story-setup-actions">
          {mode === 'skip' ? null : (
            <button
              type="button"
              className="question-explorer-close"
              onClick={() => {
                if (STAR_WORKFLOW_DEBUG_LOGGING) {
                  console.info('[STAR Workflow][Setup] Starting run without STAR stories')
                }
                onStartRun([])
              }}
            >
              Start without STAR stories
            </button>
          )}
          <button
            type="button"
            className="star-story-primary-button"
            onClick={() => {
              if (mode === 'skip') {
                if (STAR_WORKFLOW_DEBUG_LOGGING) {
                  console.info('[STAR Workflow][Setup] Starting run without STAR stories from default option')
                }
                onStartRun([])
                return
              }

              if (STAR_WORKFLOW_DEBUG_LOGGING) {
                console.info('[STAR Workflow][Setup] Starting run with stories', {
                  count: stories.length,
                  fileNames: stories.map((story) => story.fileName),
                })
              }
              onStartRun(stories)
            }}
            disabled={isReadingFiles}
          >
            {isReadingFiles
              ? 'Reading files...'
              : mode === 'skip'
                ? 'Start run without STAR stories'
                : `Start run${stories.length > 0 ? ` with ${stories.length} STAR stor${stories.length === 1 ? 'y' : 'ies'}` : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}