import type { RawCodingLanguageId, RawCodingQuestionMeta } from '../quiz/QuizQuestionManager'
import { runCSharpCode } from './.CodeRunnerCSharp'
import { runCppCode } from './.CodeRunnerCPP'
import { runJavaCode } from './.CodeRunnerJava'
import { runJavaScriptCode } from './.CodeRunnerJavaScript'
import { runPythonCode } from './.CodeRunnerPython'

export interface RawCodingExecutionCaseResult {
  index: number
  passed: boolean
  inputPreview: string
  expectedPreview: string
  actualPreview: string
}

export interface RawCodingExecutionResult {
  passed: boolean
  language: RawCodingLanguageId
  message: string
  caseResults: RawCodingExecutionCaseResult[]
}

function unsupportedLanguage(language: RawCodingLanguageId): RawCodingExecutionResult {
  return {
    passed: false,
    language,
    message:
      `${language} local compiler/runtime is not bundled yet in this client build. ` +
      'You can still edit in this language template while integration is in progress.',
    caseResults: [],
  }
}

export async function executeRawCodingQuestion(
  question: RawCodingQuestionMeta,
  language: RawCodingLanguageId,
  sourceCode: string,
): Promise<RawCodingExecutionResult> {
  if (language === 'javascript') {
    return runJavaScriptCode(sourceCode, question.functionName, question.tests)
  }

  if (language === 'python') {
    return runPythonCode(sourceCode, question.functionName, question.tests)
  }

  if (language === 'cpp') {
    return runCppCode(sourceCode, question.functionName, question.tests)
  }

  if (language === 'csharp') {
    return runCSharpCode(sourceCode, question.functionName, question.tests)
  }

  if (language === 'java') {
    return runJavaCode(sourceCode, question.functionName, question.tests)
  }

  return unsupportedLanguage(language)
}
