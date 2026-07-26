import { init, Wasmer } from '@wasmer/sdk'

type WasmerOutput = {
  code: number
  ok: boolean
  stdout: string
  stderr: string
}

interface WasmerShellRunOptions {
  script: string
  files: Record<string, string>
  usesCandidates: string[][]
  timeoutMs?: number
}

interface WasmerShellRunResult {
  output: WasmerOutput
  shellSpecifier: string
  usesSpecifier: string[]
}

const SHELL_CANDIDATES = ['wasmer/bash', 'wasmer/sh']
const packageCache = new Map<string, Promise<any>>()

let wasmerInitPromise: Promise<unknown> | null = null

function getMissingIsolationHint(): string {
  return (
    'Wasmer SDK requires cross-origin isolation. Ensure these headers are set: ' +
    'Cross-Origin-Opener-Policy=same-origin and Cross-Origin-Embedder-Policy=require-corp.'
  )
}

async function ensureWasmerInitialized(): Promise<void> {
  if (!wasmerInitPromise) {
    wasmerInitPromise = init().catch((error: unknown) => {
      wasmerInitPromise = null
      throw error
    })
  }

  try {
    await wasmerInitPromise
  } catch (error) {
    throw new Error(
      `Failed to initialize Wasmer SDK. ${getMissingIsolationHint()} Original error: ${String(error)}`,
    )
  }
}

async function loadPackage(specifier: string): Promise<any> {
  const cached = packageCache.get(specifier)
  if (cached) {
    return cached
  }

  const promise = Wasmer.fromRegistry(specifier).catch((error: unknown) => {
    packageCache.delete(specifier)
    throw error
  })
  packageCache.set(specifier, promise)
  return promise
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutHandle = window.setTimeout(() => {
      reject(new Error(message))
    }, timeoutMs)

    promise.then(
      (value) => {
        window.clearTimeout(timeoutHandle)
        resolve(value)
      },
      (error) => {
        window.clearTimeout(timeoutHandle)
        reject(error)
      },
    )
  })
}

function shouldRetryNextCandidate(output: WasmerOutput): boolean {
  if (output.code !== 127) {
    return false
  }

  const text = `${output.stdout}\n${output.stderr}`.toLowerCase()
  return text.includes('not found') || text.includes('no ') || text.includes('unknown command')
}

export async function runWasmerShellWithFallback({
  script,
  files,
  usesCandidates,
  timeoutMs = 30000,
}: WasmerShellRunOptions): Promise<WasmerShellRunResult> {
  await ensureWasmerInitialized()

  const failures: string[] = []

  for (const shellSpecifier of SHELL_CANDIDATES) {
    let shellPackage: any
    try {
      shellPackage = await loadPackage(shellSpecifier)
    } catch (error) {
      failures.push(`Could not load shell package ${shellSpecifier}: ${String(error)}`)
      continue
    }

    const entrypoint = shellPackage.entrypoint
    if (!entrypoint) {
      failures.push(`Shell package ${shellSpecifier} has no entrypoint.`)
      continue
    }

    for (const usesSpecifier of usesCandidates) {
      try {
        const instance = await entrypoint.run({
          args: ['-lc', script],
          uses: usesSpecifier,
          mount: {
            '/workspace': files,
          },
          cwd: '/workspace',
        })

        const output = (await withTimeout(
          instance.wait(),
          timeoutMs,
          `Execution timed out after ${Math.ceil(timeoutMs / 1000)} seconds.`,
        )) as WasmerOutput

        if (output.code === 0) {
          return {
            output,
            shellSpecifier,
            usesSpecifier,
          }
        }

        if (shouldRetryNextCandidate(output)) {
          failures.push(
            `Runtime candidate shell=${shellSpecifier}, uses=${usesSpecifier.join(',')} failed with code 127. stderr=${output.stderr.slice(0, 200)}`,
          )
          continue
        }

        return {
          output,
          shellSpecifier,
          usesSpecifier,
        }
      } catch (error) {
        failures.push(
          `Execution failed shell=${shellSpecifier}, uses=${usesSpecifier.join(',')}: ${String(error)}`,
        )
      }
    }
  }

  throw new Error(
    `No compatible Wasmer runtime candidate could execute this language. ${getMissingIsolationHint()} Details: ${failures.join(' | ')}`,
  )
}

export function toJsonLiteral(value: unknown): string {
  return JSON.stringify(value)
}

export function buildInputValueForTest(testInput: unknown[]): unknown {
  return testInput.length === 1 ? testInput[0] : testInput
}

export function buildCaseResultsFromHarnessOutput(stdout: string): {
  passed: boolean
  caseResults: Array<{
    index: number
    passed: boolean
    inputPreview: string
    expectedPreview: string
    actualPreview: string
  }>
} {
  const parsed = JSON.parse(stdout) as Array<{
    index: number
    passed: boolean
    inputPreview: string
    expectedPreview: string
    actualPreview: string
  }>

  if (!Array.isArray(parsed)) {
    throw new Error('Harness output was not an array.')
  }

  const caseResults = parsed.map((entry) => ({
    index: Number(entry.index),
    passed: Boolean(entry.passed),
    inputPreview: String(entry.inputPreview),
    expectedPreview: String(entry.expectedPreview),
    actualPreview: String(entry.actualPreview),
  }))

  return {
    passed: caseResults.every((entry) => entry.passed),
    caseResults,
  }
}
