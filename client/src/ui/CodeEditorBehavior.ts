import type { KeyboardEvent } from 'react'

const SPACES_PER_INDENT = 2
const INDENT_UNIT = ' '.repeat(SPACES_PER_INDENT)

export function normalizeCodeEditorValue(value: string): string {
  return value.replace(/\t/g, INDENT_UNIT)
}

export interface CodeEditorHistoryState {
  undoStack: string[]
  redoStack: string[]
  maxEntries: number
}

export function createCodeEditorHistoryState(maxEntries = 200): CodeEditorHistoryState {
  return {
    undoStack: [],
    redoStack: [],
    maxEntries,
  }
}

export function resetCodeEditorHistoryState(history: CodeEditorHistoryState): void {
  history.undoStack = []
  history.redoStack = []
}

export function pushCodeEditorHistory(history: CodeEditorHistoryState, value: string): void {
  const lastEntry = history.undoStack[history.undoStack.length - 1]
  if (lastEntry === value) {
    return
  }

  history.undoStack.push(value)
  if (history.undoStack.length > history.maxEntries) {
    history.undoStack.shift()
  }
  history.redoStack = []
}

interface HandleCodeEditorUndoRedoKeyDownParams {
  event: KeyboardEvent<HTMLTextAreaElement>
  currentValue: string
  history: CodeEditorHistoryState
  onValueChange: (nextValue: string) => void
  onEdit?: () => void
}

export function handleCodeEditorUndoRedoKeyDown({
  event,
  currentValue,
  history,
  onValueChange,
  onEdit,
}: HandleCodeEditorUndoRedoKeyDownParams): boolean {
  const hasModifier = event.metaKey || event.ctrlKey
  if (!hasModifier || event.altKey) {
    return false
  }

  const key = event.key.toLowerCase()
  const isUndo = key === 'z' && !event.shiftKey
  const isRedo = key === 'y' || (key === 'z' && event.shiftKey)

  if (!isUndo && !isRedo) {
    return false
  }

  event.preventDefault()

  if (isUndo) {
    const previousValue = history.undoStack.pop()
    if (previousValue === undefined) {
      return true
    }

    history.redoStack.push(currentValue)
    onValueChange(previousValue)
    onEdit?.()
    return true
  }

  const nextValue = history.redoStack.pop()
  if (nextValue === undefined) {
    return true
  }

  history.undoStack.push(currentValue)
  onValueChange(nextValue)
  onEdit?.()
  return true
}

interface LineIndentResult {
  nextValue: string
  nextSelectionStart: number
  nextSelectionEnd: number
}

function adjustSelectedLinesIndent(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  shouldOutdent: boolean,
): LineIndentResult {
  const normalizedValue = normalizeCodeEditorValue(value)
  const lineStart = normalizedValue.lastIndexOf('\n', Math.max(0, selectionStart - 1)) + 1
  const lineEndIndex = normalizedValue.indexOf('\n', selectionEnd)
  const lineEnd = lineEndIndex === -1 ? normalizedValue.length : lineEndIndex
  const selectedBlock = normalizedValue.slice(lineStart, lineEnd)
  const lines = selectedBlock.split('\n')

  const adjustedLines = lines.map((line) => {
    if (!shouldOutdent) {
      return {
        nextLine: `${INDENT_UNIT}${line}`,
        delta: INDENT_UNIT.length,
      }
    }

    if (line.startsWith('\t')) {
      return {
        nextLine: line.slice(1),
        delta: -INDENT_UNIT.length,
      }
    }

    if (line.startsWith(INDENT_UNIT)) {
      return {
        nextLine: line.slice(INDENT_UNIT.length),
        delta: -INDENT_UNIT.length,
      }
    }

    return {
      nextLine: line,
      delta: 0,
    }
  })

  const replacement = adjustedLines.map((entry) => entry.nextLine).join('\n')
  const nextValue = `${normalizedValue.slice(0, lineStart)}${replacement}${normalizedValue.slice(lineEnd)}`
  const totalDelta = adjustedLines.reduce((sum, entry) => sum + entry.delta, 0)
  const firstLineDelta = adjustedLines[0]?.delta ?? 0

  if (!shouldOutdent) {
    return {
      nextValue,
      nextSelectionStart: selectionStart + INDENT_UNIT.length,
      nextSelectionEnd: selectionEnd + totalDelta,
    }
  }

  const selectionOffsetInFirstLine = Math.max(0, selectionStart - lineStart)
  const removedBeforeSelectionStart = Math.min(-Math.min(0, firstLineDelta), selectionOffsetInFirstLine)

  return {
    nextValue,
    nextSelectionStart: Math.max(lineStart, selectionStart - removedBeforeSelectionStart),
    nextSelectionEnd: Math.max(lineStart, selectionEnd + totalDelta),
  }
}

function getCurrentLineIndentation(value: string, cursorIndex: number): string {
  const lineStart = value.lastIndexOf('\n', Math.max(0, cursorIndex - 1)) + 1
  const linePrefix = value.slice(lineStart, cursorIndex)
  const normalizedPrefix = normalizeCodeEditorValue(linePrefix)
  const indentMatch = normalizedPrefix.match(/^[ ]*/)
  return indentMatch?.[0] ?? ''
}

function shouldIncreaseIndentAfterNewline(value: string, cursorIndex: number): boolean {
  const lineStart = value.lastIndexOf('\n', Math.max(0, cursorIndex - 1)) + 1
  const linePrefix = value.slice(lineStart, cursorIndex)
  return linePrefix.trimEnd().endsWith('{')
}

interface HandleCodeEditorTabKeyDownParams {
  event: KeyboardEvent<HTMLTextAreaElement>
  onValueChange: (nextValue: string) => void
  onEdit?: () => void
}

export function handleCodeEditorTabKeyDown({
  event,
  onValueChange,
  onEdit,
}: HandleCodeEditorTabKeyDownParams): void {
  const isTab = event.key === 'Tab'
  const isEnter = event.key === 'Enter'

  if (!isTab && !isEnter) {
    return
  }

  event.preventDefault()

  const textarea = event.currentTarget
  const selectionStart = textarea.selectionStart
  const selectionEnd = textarea.selectionEnd
  const currentValue = normalizeCodeEditorValue(textarea.value)

  if (isEnter) {
    const baseIndentation = getCurrentLineIndentation(currentValue, selectionStart)
    const indentation = shouldIncreaseIndentAfterNewline(currentValue, selectionStart)
      ? `${baseIndentation}${INDENT_UNIT}`
      : baseIndentation
    const nextValue = `${currentValue.slice(0, selectionStart)}\n${indentation}${currentValue.slice(selectionEnd)}`
    const nextCursor = selectionStart + 1 + indentation.length
    onValueChange(nextValue)
    onEdit?.()
    window.requestAnimationFrame(() => {
      textarea.setSelectionRange(nextCursor, nextCursor)
    })
    return
  }

  const selectedText = currentValue.slice(selectionStart, selectionEnd)
  const hasMultiLineSelection = selectionStart !== selectionEnd && selectedText.includes('\n')

  const applyNextValue = (result: LineIndentResult) => {
    onValueChange(result.nextValue)
    onEdit?.()
    window.requestAnimationFrame(() => {
      textarea.setSelectionRange(result.nextSelectionStart, result.nextSelectionEnd)
    })
  }

  if (event.shiftKey) {
    applyNextValue(adjustSelectedLinesIndent(currentValue, selectionStart, selectionEnd, true))
    return
  }

  if (hasMultiLineSelection) {
    applyNextValue(adjustSelectedLinesIndent(currentValue, selectionStart, selectionEnd, false))
    return
  }

  const nextValue = `${currentValue.slice(0, selectionStart)}${INDENT_UNIT}${currentValue.slice(selectionEnd)}`
  const nextCursor = selectionStart + INDENT_UNIT.length
  onValueChange(nextValue)
  onEdit?.()
  window.requestAnimationFrame(() => {
    textarea.setSelectionRange(nextCursor, nextCursor)
  })
}

interface BraceSelectionResult {
  selectionStart: number
  selectionEnd: number
}

function findMatchingBraceIndex(value: string, braceIndex: number): number | null {
  const brace = value[braceIndex]
  if (brace !== '{' && brace !== '}') {
    return null
  }

  if (brace === '{') {
    let depth = 0
    for (let index = braceIndex + 1; index < value.length; index += 1) {
      const current = value[index]
      if (current === '{') {
        depth += 1
      } else if (current === '}') {
        if (depth === 0) {
          return index
        }

        depth -= 1
      }
    }

    return null
  }

  let depth = 0
  for (let index = braceIndex - 1; index >= 0; index -= 1) {
    const current = value[index]
    if (current === '}') {
      depth += 1
    } else if (current === '{') {
      if (depth === 0) {
        return index
      }

      depth -= 1
    }
  }

  return null
}

export function getMatchingBraceSelection(
  value: string,
  selectionStart: number,
  selectionEnd: number,
): BraceSelectionResult | null {
  if (selectionStart !== selectionEnd) {
    if (selectionEnd - selectionStart !== 1) {
      return null
    }

    const selectedIndex = selectionStart
    const matchingIndex = findMatchingBraceIndex(value, selectedIndex)
    if (matchingIndex === null) {
      return null
    }

    return selectedIndex < matchingIndex
      ? { selectionStart: selectedIndex, selectionEnd: matchingIndex + 1 }
      : { selectionStart: matchingIndex, selectionEnd: selectedIndex + 1 }
  }

  const charBeforeCursor = selectionStart > 0 ? value[selectionStart - 1] : null
  if (charBeforeCursor === '{' || charBeforeCursor === '}') {
    const matchingIndex = findMatchingBraceIndex(value, selectionStart - 1)
    if (matchingIndex !== null) {
      return selectionStart - 1 < matchingIndex
        ? { selectionStart: selectionStart - 1, selectionEnd: matchingIndex + 1 }
        : { selectionStart: matchingIndex, selectionEnd: selectionStart }
    }
  }

  const charAtCursor = value[selectionStart]
  if (charAtCursor === '{' || charAtCursor === '}') {
    const matchingIndex = findMatchingBraceIndex(value, selectionStart)
    if (matchingIndex !== null) {
      return selectionStart < matchingIndex
        ? { selectionStart, selectionEnd: matchingIndex + 1 }
        : { selectionStart: matchingIndex, selectionEnd: selectionStart + 1 }
    }
  }

  return null
}

export function getMatchingBraceHighlightIndex(
  value: string,
  selectionStart: number,
  selectionEnd: number,
): number | null {
  if (selectionStart !== selectionEnd) {
    if (selectionEnd - selectionStart !== 1) {
      return null
    }

    return findMatchingBraceIndex(value, selectionStart)
  }

  const charBeforeCursor = selectionStart > 0 ? value[selectionStart - 1] : null
  if (charBeforeCursor === '{' || charBeforeCursor === '}') {
    return findMatchingBraceIndex(value, selectionStart - 1)
  }

  const charAtCursor = value[selectionStart]
  if (charAtCursor === '{' || charAtCursor === '}') {
    return findMatchingBraceIndex(value, selectionStart)
  }

  return null
}