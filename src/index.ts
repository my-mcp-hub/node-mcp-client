import 'dotenv/config'
import { pathToFileURL } from 'node:url'
import { runStdioDemo, runStreamableHttpDemo } from './transports'

export { createClient } from './client'
export { runKnowledgeBaseDemo } from './knowledgeBaseDemo'
export { runStdioDemo, runStreamableHttpDemo } from './transports'

async function main() {
  try {
    const stdioResult = await runStdioDemo()
    console.log('stdio demo:', stdioResult.selectedDocument)

    const httpResult = await runStreamableHttpDemo()
    console.log('streamable HTTP demo:', httpResult.selectedDocument)
  } catch (error) {
    console.error('Main error:', error)
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
