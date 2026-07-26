import type { RawCodingQuestionMeta } from '../quiz/QuizQuestionManager'
import {
  buildCaseResultsFromHarnessOutput,
  buildInputValueForTest,
  runWasmerShellWithFallback,
  toJsonLiteral,
} from './.CodeRunnerWasmerCommon'
import type { RawCodingExecutionResult } from './.rawCodingRunner'

function escapeCSharpString(value: string): string {
  return value.replace(/"/g, '""')
}

function buildCSharpHarness(functionName: string, tests: RawCodingQuestionMeta['tests']): string {
  const inputRows = tests
    .map((testCase) => `@"${escapeCSharpString(toJsonLiteral(buildInputValueForTest(testCase.input)))}"`)
    .join(',\n      ')
  const expectedRows = tests
    .map((testCase) => `@"${escapeCSharpString(toJsonLiteral(testCase.expected))}"`)
    .join(',\n      ')

  return `
using System;
using System.Text;

public static class Runner {
  private static string EscapeJson(string value) {
    return value
      .Replace("\\", "\\\\")
      .Replace("\"", "\\\"")
      .Replace("\n", "\\n")
      .Replace("\r", "\\r")
      .Replace("\t", "\\t");
  }

  public static void Main() {
    var inputs = new string[] {
      ${inputRows}
    };

    var expected = new string[] {
      ${expectedRows}
    };

    var outBuilder = new StringBuilder();
    outBuilder.Append("[");

    for (var i = 0; i < inputs.Length; i++) {
      var passed = false;
      string actual;

      try {
        actual = Solution.${functionName}(inputs[i]);
        passed = actual == expected[i];
      } catch (Exception error) {
        actual = "Runtime error: " + error.Message;
      }

      if (i > 0) {
        outBuilder.Append(",");
      }

      outBuilder
        .Append("{\\\"index\\\":")
        .Append(i)
        .Append(",\\\"passed\\\":")
        .Append(passed ? "true" : "false")
        .Append(",\\\"inputPreview\\\":\\\"")
        .Append(EscapeJson(inputs[i]))
        .Append("\\\"")
        .Append(",\\\"expectedPreview\\\":\\\"")
        .Append(EscapeJson(expected[i]))
        .Append("\\\"")
        .Append(",\\\"actualPreview\\\":\\\"")
        .Append(EscapeJson(actual))
        .Append("\\\"}");
    }

    outBuilder.Append("]");
    Console.Write(outBuilder.ToString());
  }
}
`
}

export async function runCSharpCode(
  sourceCode: string,
  functionName: string,
  tests: RawCodingQuestionMeta['tests'],
): Promise<RawCodingExecutionResult> {
  const harness = buildCSharpHarness(functionName, tests)
  const fullSource = `${sourceCode}\n\n${harness}`

  const script =
    'set -e\n' +
    'if command -v csc >/dev/null 2>&1; then\n' +
    '  csc -nologo -out:Program.exe Program.cs\n' +
    '  if command -v mono >/dev/null 2>&1; then mono Program.exe; else ./Program.exe; fi\n' +
    'elif command -v mcs >/dev/null 2>&1; then\n' +
    '  mcs -out:Program.exe Program.cs\n' +
    '  if command -v mono >/dev/null 2>&1; then mono Program.exe; else ./Program.exe; fi\n' +
    'else\n' +
    '  echo "No C# compiler found" >&2\n' +
    '  exit 127\n' +
    'fi\n'

  try {
    const { output, usesSpecifier } = await runWasmerShellWithFallback({
      script,
      files: {
        'Program.cs': fullSource,
      },
      usesCandidates: [
        ['wasmer/mono'],
        ['mono/mono'],
        ['wasmer/dotnet'],
        ['dotnet/dotnet'],
      ],
      timeoutMs: 45000,
    })

    if (output.code !== 0) {
      return {
        passed: false,
        language: 'csharp',
        message:
          `Compile/runtime error (packages: ${usesSpecifier.join(', ')}): ${output.stderr || output.stdout}`,
        caseResults: [],
      }
    }

    const parsed = buildCaseResultsFromHarnessOutput(output.stdout)
    return {
      passed: parsed.passed,
      language: 'csharp',
      message: parsed.passed
        ? 'All test cases passed in C# (Wasmer runtime).'
        : 'Some test cases failed. Review details below.',
      caseResults: parsed.caseResults,
    }
  } catch (error) {
    return {
      passed: false,
      language: 'csharp',
      message: `C# runner unavailable: ${String(error)}`,
      caseResults: [],
    }
  }
}
