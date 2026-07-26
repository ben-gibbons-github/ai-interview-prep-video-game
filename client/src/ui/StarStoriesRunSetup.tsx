import { useEffect, useMemo, useState } from 'react'
import {
  parseStarStory,
  type ParsedStarStory,
  type SavedStarStory,
} from '../quiz/StarStoryManager'

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

export function StarStoriesRunSetup({
  initialStories = [],
  onStartRun,
}: StarStoriesRunSetupProps) {
  const [stories, setStories] = useState<SavedStarStory[]>(initialStories)
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
          Upload one or more story scripts before the run starts. Both STAR and non-STAR narrative formats are supported.
          The game will still generate matching, ordering, and transcription questions automatically.
        </p>

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

        <div className="star-story-setup-actions">
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
          <button
            type="button"
            className="star-story-primary-button"
            onClick={() => {
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
            {isReadingFiles ? 'Reading files...' : `Start run${stories.length > 0 ? ` with ${stories.length} STAR stor${stories.length === 1 ? 'y' : 'ies'}` : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}