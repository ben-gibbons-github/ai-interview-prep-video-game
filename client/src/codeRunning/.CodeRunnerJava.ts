import type { RawCodingQuestionMeta } from '../quiz/QuizQuestionManager'
import {
  buildCaseResultsFromHarnessOutput,
  buildInputValueForTest,
  runWasmerShellWithFallback,
  toJsonLiteral,
} from './.CodeRunnerWasmerCommon'
import type { RawCodingExecutionResult } from './.rawCodingRunner'

function escapeJavaString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
}

function buildJavaHarness(functionName: string, tests: RawCodingQuestionMeta['tests']): string {
  const inputRows = tests
    .map((testCase) => `"${escapeJavaString(toJsonLiteral(buildInputValueForTest(testCase.input)))}"`)
    .join(',\n      ')
  const expectedRows = tests
    .map((testCase) => `"${escapeJavaString(toJsonLiteral(testCase.expected))}"`)
    .join(',\n      ')

  return `
class Runner {
  private static String escapeJson(String value) {
    return value
      .replace("\\\\", "\\\\\\\\")
      .replace("\"", "\\\\\"")
      .replace("\\n", "\\\\n")
      .replace("\\r", "\\\\r")
      .replace("\\t", "\\\\t");
  }

  public static void main(String[] args) {
    String[] inputs = new String[] {
      ${inputRows}
    };

    String[] expected = new String[] {
      ${expectedRows}
    };

    StringBuilder out = new StringBuilder();
    out.append("[");

    for (int i = 0; i < inputs.length; i += 1) {
      boolean passed = false;
      String actual;

      try {
        actual = Solution.${functionName}(inputs[i]);
        passed = actual.equals(expected[i]);
      } catch (Exception error) {
        actual = "Runtime error: " + error.getMessage();
      }

      if (i > 0) {
        out.append(",");
      }

      out.append("{\\\"index\\\":").append(i)
        .append(",\\\"passed\\\":").append(passed ? "true" : "false")
        .append(",\\\"inputPreview\\\":\\\"").append(escapeJson(inputs[i])).append("\\\"")
        .append(",\\\"expectedPreview\\\":\\\"").append(escapeJson(expected[i])).append("\\\"")
        .append(",\\\"actualPreview\\\":\\\"").append(escapeJson(actual)).append("\\\"")
        .append("}");
    }

    out.append("]");
    System.out.print(out.toString());
  }
}
`
}

export async function runJavaCode(
  sourceCode: string,
  functionName: string,
  tests: RawCodingQuestionMeta['tests'],
): Promise<RawCodingExecutionResult> {
  const harness = buildJavaHarness(functionName, tests)
  const fullSource = `${sourceCode}\n\n${harness}`

  const script =
    'set -e\n' +
    'if command -v javac >/dev/null 2>&1 && command -v java >/dev/null 2>&1; then\n' +
    '  javac Main.java\n' +
    '  java Runner\n' +
    'else\n' +
    '  echo "No Java toolchain found" >&2\n' +
    '  exit 127\n' +
    'fi\n'

  try {
    const { output, usesSpecifier } = await runWasmerShellWithFallback({
      script,
      files: {
        'Main.java': fullSource,
      },
      usesCandidates: [
        ['wasmer/openjdk'],
        ['openjdk/openjdk'],
        ['wasmer/java'],
        ['java/java'],
      ],
      timeoutMs: 45000,
    })

    if (output.code !== 0) {
      return {
        passed: false,
        language: 'java',
        message:
          `Compile/runtime error (packages: ${usesSpecifier.join(', ')}): ${output.stderr || output.stdout}`,
        caseResults: [],
      }
    }

    const parsed = buildCaseResultsFromHarnessOutput(output.stdout)
    return {
      passed: parsed.passed,
      language: 'java',
      message: parsed.passed
        ? 'All test cases passed in Java (Wasmer runtime).'
        : 'Some test cases failed. Review details below.',
      caseResults: parsed.caseResults,
    }
  } catch (error) {
    return {
      passed: false,
      language: 'java',
      message: `Java runner unavailable: ${String(error)}`,
      caseResults: [],
    }
  }
}
