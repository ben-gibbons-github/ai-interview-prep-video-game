import type { RawCodingQuestionMeta } from '../quiz/QuizQuestionManager'
import type { RawCodingExecutionCaseResult, RawCodingExecutionResult } from './.rawCodingRunner'

interface WorkerSuccessPayload {
  ok: true
  caseResults: RawCodingExecutionCaseResult[]
}

interface WorkerFailurePayload {
  ok: false
  message: string
}

type WorkerPayload = WorkerSuccessPayload | WorkerFailurePayload

const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.28.3/full/'

const PYTHON_WORKER_SOURCE = `
let pyodideRuntimePromise = null

async function getPyodideRuntime(indexUrl) {
  if (!pyodideRuntimePromise) {
    importScripts(indexUrl + 'pyodide.js')
    pyodideRuntimePromise = self.loadPyodide({
      indexURL: indexUrl,
    })
  }

  return pyodideRuntimePromise
}

function toPreview(value) {
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function toComparable(value) {
  if (value && typeof value.toJs === 'function') {
    try {
      return value.toJs({ create_proxies: false })
    } catch {
      return value
    }
  }

  return value
}

self.onmessage = async (event) => {
  try {
    const { sourceCode, functionName, tests, indexUrl } = event.data
    const runtime = await getPyodideRuntime(indexUrl)
    runtime.runPython(sourceCode)

    const callable = runtime.globals.get(functionName)
    if (typeof callable !== 'function') {
      self.postMessage({ ok: false, message: 'Function "' + functionName + '" was not found.' })
      return
    }

    const caseResults = tests.map((testCase, index) => {
      try {
        const actualRaw = callable(...testCase.input)
        const actual = toComparable(actualRaw)
        const expected = toComparable(testCase.expected)
        const passed = toPreview(actual) === toPreview(expected)

        return {
          index,
          passed,
          inputPreview: toPreview(testCase.input),
          expectedPreview: toPreview(expected),
          actualPreview: toPreview(actual),
        }
      } catch (error) {
        return {
          index,
          passed: false,
          inputPreview: toPreview(testCase.input),
          expectedPreview: toPreview(testCase.expected),
          actualPreview: 'Runtime error: ' + (error instanceof Error ? error.message : String(error)),
        }
      }
    })

    self.postMessage({ ok: true, caseResults })
  } catch (error) {
    self.postMessage({ ok: false, message: error instanceof Error ? error.message : String(error) })
  }
}
`

export async function runPythonCode(
  sourceCode: string,
  functionName: string,
  tests: RawCodingQuestionMeta['tests'],
): Promise<RawCodingExecutionResult> {
  return new Promise((resolve) => {
    const workerBlob = new Blob([PYTHON_WORKER_SOURCE], { type: 'text/javascript' })
    const workerUrl = URL.createObjectURL(workerBlob)
    const worker = new Worker(workerUrl)

    const timeout = window.setTimeout(() => {
      worker.terminate()
      URL.revokeObjectURL(workerUrl)
      resolve({
        passed: false,
        language: 'python',
        message: 'Execution timed out after 8 seconds.',
        caseResults: [],
      })
    }, 8000)

    worker.onmessage = (event: MessageEvent<WorkerPayload>) => {
      window.clearTimeout(timeout)
      worker.terminate()
      URL.revokeObjectURL(workerUrl)

      if (!event.data.ok) {
        resolve({
          passed: false,
          language: 'python',
          message: `Compile/runtime error: ${event.data.message}`,
          caseResults: [],
        })
        return
      }

      const allPassed = event.data.caseResults.every((entry) => entry.passed)
      resolve({
        passed: allPassed,
        language: 'python',
        message: allPassed
          ? 'All test cases passed in Python (Pyodide WASM runtime).'
          : 'Some test cases failed. Review details below.',
        caseResults: event.data.caseResults,
      })
    }

    worker.postMessage({
      sourceCode,
      functionName,
      tests,
      indexUrl: PYODIDE_INDEX_URL,
    })
  })
}
