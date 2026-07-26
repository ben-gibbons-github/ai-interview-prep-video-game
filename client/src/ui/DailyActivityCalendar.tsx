import { useMemo, useState } from 'react'
import {
  QUESTION_TYPE_LABELS,
  type DailyActivityStats,
  type QuestionTypeBreakdown,
} from '../Player/GameSaving'
import type { RunQuestionDifficultyBreakdown } from '../WaveManager'

interface DailyActivityCalendarProps {
  stats: DailyActivityStats
}

function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function shiftMonth(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

function buildCalendarCells(month: Date): Date[] {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const startOffset = firstDay.getDay()
  const firstCell = new Date(year, monthIndex, 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const cell = new Date(firstCell)
    cell.setDate(firstCell.getDate() + index)
    return cell
  })
}

function getDifficultyBreakdown(
  value?: Partial<RunQuestionDifficultyBreakdown>,
): RunQuestionDifficultyBreakdown {
  return {
    easy: Math.max(0, Math.floor(value?.easy ?? 0)),
    medium: Math.max(0, Math.floor(value?.medium ?? 0)),
    hard: Math.max(0, Math.floor(value?.hard ?? 0)),
    veryHard: Math.max(0, Math.floor(value?.veryHard ?? 0)),
    insanelyHard: Math.max(0, Math.floor(value?.insanelyHard ?? 0)),
  }
}

function getQuestionTypeBreakdown(
  value?: Partial<QuestionTypeBreakdown>,
): QuestionTypeBreakdown {
  return {
    rawCode: Math.max(0, Math.floor(value?.rawCode ?? 0)),
    multipleChoice: Math.max(0, Math.floor(value?.multipleChoice ?? 0)),
    starStories: Math.max(0, Math.floor(value?.starStories ?? 0)),
    starVoice: Math.max(0, Math.floor(value?.starVoice ?? 0)),
    validList: Math.max(0, Math.floor(value?.validList ?? 0)),
    orderItems: Math.max(0, Math.floor(value?.orderItems ?? 0)),
    capacity: Math.max(0, Math.floor(value?.capacity ?? 0)),
    systemDesign: Math.max(0, Math.floor(value?.systemDesign ?? 0)),
    multiSectionSystemDesign: Math.max(0, Math.floor(value?.multiSectionSystemDesign ?? 0)),
  }
}

function formatDurationCompact(totalSeconds: number): string {
  const clampedSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clampedSeconds / 3600)
  const minutes = Math.floor((clampedSeconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m`
  }

  return `${clampedSeconds}s`
}

function formatDurationVerbose(totalSeconds: number): string {
  const clampedSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clampedSeconds / 3600)
  const minutes = Math.floor((clampedSeconds % 3600) / 60)
  const seconds = clampedSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }

  return `${seconds}s`
}

export function DailyActivityCalendar({ stats }: DailyActivityCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [hoveredDayKey, setHoveredDayKey] = useState<string | null>(null)

  const monthLabel = useMemo(() => {
    return viewMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }, [viewMonth])

  const cells = useMemo(() => buildCalendarCells(viewMonth), [viewMonth])

  const monthTotals = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()

    return cells.reduce(
      (totals, cellDate) => {
        if (cellDate.getFullYear() !== year || cellDate.getMonth() !== month) {
          return totals
        }

        const dayStats = stats.byDate[toDateKey(cellDate)]
        if (!dayStats) {
          return totals
        }

        return {
          points: totals.points + Math.max(0, Math.floor(dayStats.points)),
          questionsAnswered: totals.questionsAnswered + Math.max(0, Math.floor(dayStats.questionsAnswered)),
          playtimeSeconds: totals.playtimeSeconds + Math.max(0, Math.floor(dayStats.playtimeSeconds ?? 0)),
          questionsAnsweredByType: {
            rawCode: totals.questionsAnsweredByType.rawCode + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.rawCode ?? 0)),
            multipleChoice:
              totals.questionsAnsweredByType.multipleChoice + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.multipleChoice ?? 0)),
            starStories:
              totals.questionsAnsweredByType.starStories + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.starStories ?? 0)),
            starVoice:
              totals.questionsAnsweredByType.starVoice + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.starVoice ?? 0)),
            validList:
              totals.questionsAnsweredByType.validList + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.validList ?? 0)),
            orderItems:
              totals.questionsAnsweredByType.orderItems + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.orderItems ?? 0)),
            capacity:
              totals.questionsAnsweredByType.capacity + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.capacity ?? 0)),
            systemDesign:
              totals.questionsAnsweredByType.systemDesign + Math.max(0, Math.floor(dayStats.questionsAnsweredByType?.systemDesign ?? 0)),
            multiSectionSystemDesign:
              totals.questionsAnsweredByType.multiSectionSystemDesign + Math.max(
                0,
                Math.floor(dayStats.questionsAnsweredByType?.multiSectionSystemDesign ?? 0),
              ),
          },
        }
      },
      {
        points: 0,
        questionsAnswered: 0,
        playtimeSeconds: 0,
        questionsAnsweredByType: getQuestionTypeBreakdown(),
      },
    )
  }, [cells, stats.byDate, viewMonth])

  const monthTopTypes = useMemo(() => {
    return (Object.keys(QUESTION_TYPE_LABELS) as Array<keyof QuestionTypeBreakdown>)
      .map((key) => ({ key, label: QUESTION_TYPE_LABELS[key], count: monthTotals.questionsAnsweredByType[key] }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  }, [monthTotals.questionsAnsweredByType])

  const totalPlaytimeSeconds = useMemo(() => {
    return Object.values(stats.byDate).reduce((total, dayStats) => {
      return total + Math.max(0, Math.floor(dayStats.playtimeSeconds ?? 0))
    }, 0)
  }, [stats.byDate])

  const todayKey = toDateKey(new Date())

  return (
    <section className="daily-activity-calendar" aria-label="Daily activity calendar">
      <div className="daily-activity-calendar-header">
        <div>
          <p className="daily-activity-calendar-eyebrow">Daily Progress</p>
          <h3>{monthLabel}</h3>
        </div>
        <div className="daily-activity-calendar-controls">
          <button type="button" onClick={() => setViewMonth((previous) => shiftMonth(previous, -1))}>
            Prev
          </button>
          <button type="button" onClick={() => setViewMonth((previous) => shiftMonth(previous, 1))}>
            Next
          </button>
        </div>
      </div>

      <p className="daily-activity-calendar-summary">
        This month: {monthTotals.questionsAnswered} questions correct · {monthTotals.points} points scored · {formatDurationCompact(monthTotals.playtimeSeconds)} played
      </p>
      <p className="daily-activity-calendar-summary">
        Types this month:{' '}
        {monthTopTypes.length > 0
          ? monthTopTypes.map((item) => `${item.label} ${item.count}`).join(' · ')
          : 'No questions answered yet'}
      </p>
      <p className="daily-activity-calendar-summary">All time playtime: {formatDurationVerbose(totalPlaytimeSeconds)}</p>

      <div className="daily-activity-calendar-grid" role="grid" aria-label="Questions correct by day">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <span key={weekday} className="daily-activity-calendar-weekday" role="columnheader">
            {weekday}
          </span>
        ))}

        {cells.map((cellDate) => {
          const dayKey = toDateKey(cellDate)
          const dayStats = stats.byDate[dayKey]
          const inMonth = cellDate.getMonth() === viewMonth.getMonth() && cellDate.getFullYear() === viewMonth.getFullYear()
          const questionsAnswered = Math.max(0, Math.floor(dayStats?.questionsAnswered ?? 0))
          const points = Math.max(0, Math.floor(dayStats?.points ?? 0))
          const playtimeSeconds = Math.max(0, Math.floor(dayStats?.playtimeSeconds ?? 0))
          const answeredByDifficulty = getDifficultyBreakdown(dayStats?.questionsAnsweredByDifficulty)
          const answeredByType = getQuestionTypeBreakdown(dayStats?.questionsAnsweredByType)
          const topTypes = (Object.keys(QUESTION_TYPE_LABELS) as Array<keyof QuestionTypeBreakdown>)
            .map((key) => ({ label: QUESTION_TYPE_LABELS[key], count: answeredByType[key] }))
            .filter((item) => item.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
          const hasActivity = questionsAnswered > 0 || points > 0 || playtimeSeconds > 0
          const isToday = dayKey === todayKey
          const popoverText =
            `${dayKey}\n` +
            `Easy: ${answeredByDifficulty.easy}\n` +
            `Medium: ${answeredByDifficulty.medium}\n` +
            `Hard: ${answeredByDifficulty.hard}\n` +
            `Very Hard: ${answeredByDifficulty.veryHard}\n` +
            `Insanely Hard: ${answeredByDifficulty.insanelyHard}\n` +
            `Top Types: ${topTypes.length > 0 ? topTypes.map((item) => `${item.label} ${item.count}`).join(', ') : 'none'}`
          const popoverOpen = hoveredDayKey === dayKey

          return (
            <div
              key={dayKey}
              className={`daily-activity-calendar-cell${inMonth ? '' : ' muted'}${hasActivity ? ' active' : ''}${isToday ? ' today' : ''}${popoverOpen ? ' open' : ''}`}
              role="gridcell"
              tabIndex={hasActivity ? 0 : -1}
              aria-label={`${dayKey}: ${questionsAnswered} questions, ${points} points, ${formatDurationVerbose(playtimeSeconds)} playtime`}
              title={popoverText}
              onMouseEnter={() => setHoveredDayKey(dayKey)}
              onMouseLeave={() => setHoveredDayKey((previous) => (previous === dayKey ? null : previous))}
              onFocus={() => setHoveredDayKey(dayKey)}
              onBlur={() => setHoveredDayKey((previous) => (previous === dayKey ? null : previous))}
            >
              <span className="daily-activity-calendar-day">{cellDate.getDate()}</span>
              <strong>{questionsAnswered}</strong>
              <small>{formatDurationCompact(playtimeSeconds)}</small>

              <div className="daily-activity-calendar-popover" role="tooltip" aria-label={`Difficulty breakdown for ${dayKey}`}>
                <p>{dayKey}</p>
                <span>Playtime: {formatDurationVerbose(playtimeSeconds)}</span>
                <span>Points: {points}</span>
                <span>Easy: {answeredByDifficulty.easy}</span>
                <span>Medium: {answeredByDifficulty.medium}</span>
                <span>Hard: {answeredByDifficulty.hard}</span>
                <span>Very Hard: {answeredByDifficulty.veryHard}</span>
                <span>Insanely Hard: {answeredByDifficulty.insanelyHard}</span>
                <span>
                  Top Types:{' '}
                  {topTypes.length > 0 ? topTypes.map((item) => `${item.label} ${item.count}`).join(' · ') : 'none'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
