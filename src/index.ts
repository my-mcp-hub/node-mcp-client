import 'dotenv/config'
import { pathToFileURL } from 'node:url'
import { runStdioDemo, runStreamableHttpDemo } from './transports'

export { createClient } from './client'
export { runKnowledgeBaseDemo } from './knowledgeBaseDemo'
export { runStdioDemo, runStreamableHttpDemo } from './transports'

interface DemoResult {
  selectedDocument: unknown
}

export interface MainDependencies {
  runStdioDemo: () => Promise<DemoResult>
  runStreamableHttpDemo: () => Promise<DemoResult>
  logger: Pick<Console, 'log' | 'error'>
}

const defaultDependencies: MainDependencies = {
  runStdioDemo,
  runStreamableHttpDemo,
  logger: console,
}

export async function main(dependencies: MainDependencies = defaultDependencies) {
  try {
    const stdioResult = await dependencies.runStdioDemo()
    dependencies.logger.log('stdio demo:', stdioResult.selectedDocument)

    const httpResult = await dependencies.runStreamableHttpDemo()
    dependencies.logger.log('streamable HTTP demo:', httpResult.selectedDocument)
  } catch (error) {
    dependencies.logger.error('Main error:', error)
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
