import type { RawCodingQuestionMeta } from '../quiz/QuizQuestionManager'
import {
  buildCaseResultsFromHarnessOutput,
  buildInputValueForTest,
  runWasmerShellWithFallback,
  toJsonLiteral,
} from './.CodeRunnerWasmerCommon'
import type { RawCodingExecutionResult } from './.rawCodingRunner'

function escapeCppString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
}

function buildCppHarness(functionName: string, tests: RawCodingQuestionMeta['tests']): string {
  const testRows = tests
    .map((testCase) => {
      const inputValue = buildInputValueForTest(testCase.input)
      const inputJson = escapeCppString(toJsonLiteral(inputValue))
      const expectedJson = escapeCppString(toJsonLiteral(testCase.expected))
      return `{\"${inputJson}\", \"${expectedJson}\"}`
    })
    .join(',\n    ')

  return `
#include <iostream>
#include <string>
#include <vector>
#include <exception>

struct CaseRow {
  std::string input;
  std::string expected;
};

static std::string escape_json(const std::string& s) {
  std::string out;
  out.reserve(s.size());
  for (char c : s) {
    switch (c) {
      case '\\\\': out += "\\\\\\\\"; break;
      case '"': out += "\\\\\""; break;
      case '\\n': out += "\\\\n"; break;
      case '\\r': out += "\\\\r"; break;
      case '\\t': out += "\\\\t"; break;
      default: out += c; break;
    }
  }
  return out;
}

int main() {
  std::vector<CaseRow> cases = {
    ${testRows}
  };

  std::cout << "[";
  for (size_t i = 0; i < cases.size(); ++i) {
    bool passed = false;
    std::string actual;
    try {
      actual = ${functionName}(cases[i].input);
      passed = (actual == cases[i].expected);
    } catch (const std::exception& e) {
      actual = std::string("Runtime error: ") + e.what();
    } catch (...) {
      actual = "Runtime error: unknown exception";
    }

    if (i > 0) {
      std::cout << ",";
    }

    std::cout << "{"
              << "\\\"index\\\":" << i << ","
              << "\\\"passed\\\":" << (passed ? "true" : "false") << ","
              << "\\\"inputPreview\\\":\\\"" << escape_json(cases[i].input) << "\\\","
              << "\\\"expectedPreview\\\":\\\"" << escape_json(cases[i].expected) << "\\\","
              << "\\\"actualPreview\\\":\\\"" << escape_json(actual) << "\\\""
              << "}";
  }
  std::cout << "]";
  return 0;
}
`
}

export async function runCppCode(
  sourceCode: string,
  functionName: string,
  tests: RawCodingQuestionMeta['tests'],
): Promise<RawCodingExecutionResult> {
  const harness = buildCppHarness(functionName, tests)
  const fullSource = `${sourceCode}\n\n${harness}`
  const script =
    'set -e\n' +
    'if command -v clang++ >/dev/null 2>&1; then CXX=clang++; ' +
    'elif command -v g++ >/dev/null 2>&1; then CXX=g++; ' +
    'else echo "No C++ compiler found" >&2; exit 127; fi\n' +
    '$CXX -std=c++17 -O2 main.cpp -o app\n' +
    './app\n'

  try {
    const { output, usesSpecifier } = await runWasmerShellWithFallback({
      script,
      files: {
        'main.cpp': fullSource,
      },
      usesCandidates: [
        ['wasmer/clang'],
        ['clang/clang'],
        ['wasmer/gcc'],
        ['gcc/gcc'],
      ],
      timeoutMs: 45000,
    })

    if (output.code !== 0) {
      return {
        passed: false,
        language: 'cpp',
        message:
          `Compile/runtime error (packages: ${usesSpecifier.join(', ')}): ${output.stderr || output.stdout}`,
        caseResults: [],
      }
    }

    const parsed = buildCaseResultsFromHarnessOutput(output.stdout)
    return {
      passed: parsed.passed,
      language: 'cpp',
      message: parsed.passed
        ? 'All test cases passed in C++ (Wasmer runtime).'
        : 'Some test cases failed. Review details below.',
      caseResults: parsed.caseResults,
    }
  } catch (error) {
    return {
      passed: false,
      language: 'cpp',
      message: `C++ runner unavailable: ${String(error)}`,
      caseResults: [],
    }
  }
}
