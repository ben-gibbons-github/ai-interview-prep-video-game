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

const JS_WORKER_SOURCE = `
self.onmessage = (event) => {
  try {
    const { sourceCode, functionName, tests } = event.data
    const evaluator = new Function(
      sourceCode + '\\nreturn typeof ' + functionName + ' === "function" ? ' + functionName + ' : null',
    )
    const fn = evaluator()

    if (typeof fn !== 'function') {
      self.postMessage({ ok: false, message: 'Function "' + functionName + '" was not found.' })
      return
    }

    const toPreview = (value) => {
      try {
        return JSON.stringify(value)
      } catch {
        return String(value)
      }
    }

    const caseResults = tests.map((testCase, index) => {
      let actual
      let actualPreview
      let passed = false

      try {
        actual = fn(...testCase.input)
        actualPreview = toPreview(actual)
        passed = toPreview(actual) === toPreview(testCase.expected)
      } catch (error) {
        actualPreview = 'Runtime error: ' + (error instanceof Error ? error.message : String(error))
      }

      return {
        index,
        passed,
        inputPreview: toPreview(testCase.input),
        expectedPreview: toPreview(testCase.expected),
        actualPreview,
      }
    })

    self.postMessage({ ok: true, caseResults })
  } catch (error) {
    self.postMessage({ ok: false, message: error instanceof Error ? error.message : String(error) })
  }
}
`

export async function runJavaScriptCode(
  sourceCode: string,
  functionName: string,
  tests: RawCodingQuestionMeta['tests'],
): Promise<RawCodingExecutionResult> {
  return new Promise((resolve) => {
    const workerBlob = new Blob([JS_WORKER_SOURCE], { type: 'text/javascript' })
    const workerUrl = URL.createObjectURL(workerBlob)
    const worker = new Worker(workerUrl)

    const timeout = window.setTimeout(() => {
      worker.terminate()
      URL.revokeObjectURL(workerUrl)
      resolve({
        passed: false,
        language: 'javascript',
        message: 'Execution timed out after 2 seconds.',
        caseResults: [],
      })
    }, 2000)

    worker.onerror = (error) => {
      window.clearTimeout(timeout)
      worker.terminate()
      URL.revokeObjectURL(workerUrl)
      resolve({
        passed: false,
        language: 'javascript',
        message: `Compile/runtime error: ${error.message}`,
        caseResults: [],
      })
    }

    worker.onmessage = (event: MessageEvent<WorkerPayload>) => {
      window.clearTimeout(timeout)
      worker.terminate()
      URL.revokeObjectURL(workerUrl)

      if (!event.data.ok) {
        resolve({
          passed: false,
          language: 'javascript',
          message: `Compile/runtime error: ${event.data.message}`,
          caseResults: [],
        })
        return
      }

      const allPassed = event.data.caseResults.every((entry) => entry.passed)
      resolve({
        passed: allPassed,
        language: 'javascript',
        message: allPassed
          ? 'All test cases passed in JavaScript runtime.'
          : 'Some test cases failed. Review details below.',
        caseResults: event.data.caseResults,
      })
    }

    worker.postMessage({
      sourceCode,
      functionName,
      tests,
    })
  })
}
