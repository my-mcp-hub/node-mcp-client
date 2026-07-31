import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { runStdioDemo, runStreamableHttpDemo } from '@/index'

const serverRoot = path.resolve(process.cwd(), '../node-mcp-server')
const localServerOptions = existsSync(path.join(serverRoot, 'src/index.ts'))
  ? {
      command: 'npx',
      args: ['tsx', './src/index.ts'],
      cwd: serverRoot,
      env: process.env as Record<string, string>,
    }
  : undefined

describe('MCP client', () => {
  test('stdio transport', async () => {
    const result = await runStdioDemo(localServerOptions)
    assertKnowledgeBaseDemo(result)
  })

  test('streamable http transport', async () => {
    const result = await runStreamableHttpDemo()
    assertKnowledgeBaseDemo(result)
  })
})

const assertKnowledgeBaseDemo = (result: Awaited<ReturnType<typeof runStdioDemo>>) => {
  expect(result.protocolVersion).toBe('2026-07-28')
  expect(result.tools.map(tool => tool.name)).toContain('search_documents')
  expect(result.resources).toHaveLength(3)
  expect(result.prompts.map(prompt => prompt.name)).toContain('review_document')
  expect(result.selectedDocument).toMatchObject({
    id: 'transport-and-lifecycle',
    uri: 'kb://documents/transport-and-lifecycle',
  })
  expect(result.resourceResult).toMatchObject({
    contents: [
      {
        uri: 'kb://documents/transport-and-lifecycle',
        mimeType: 'text/markdown',
      },
    ],
  })
  expect(result.promptResult).toMatchObject({
    messages: [
      {
        content: {
          type: 'text',
        },
      },
      {
        content: {
          type: 'resource',
          resource: {
            uri: 'kb://documents/transport-and-lifecycle',
          },
        },
      },
    ],
  })
}
