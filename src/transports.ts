import { StreamableHTTPClientTransport } from '@modelcontextprotocol/client'
import { StdioClientTransport, type StdioServerParameters } from '@modelcontextprotocol/client/stdio'
import { createClient } from './client'
import { runKnowledgeBaseDemo } from './knowledgeBaseDemo'

export type StdioDemoOptions = StdioServerParameters

const defaultStdioOptions: StdioDemoOptions = {
  command: 'npx',
  args: ['-y', '@my-mcp-hub/node-mcp-server'],
  env: process.env as Record<string, string>,
}

export async function runStdioDemo(options: StdioDemoOptions = defaultStdioOptions) {
  const client = createClient('knowledge-base-stdio-client')
  const transport = new StdioClientTransport(options)

  try {
    await client.connect(transport)
    return await runKnowledgeBaseDemo(client)
  } finally {
    await client.close()
  }
}

export async function runStreamableHttpDemo(
  serverUrl = new URL(process.env.MCP_SERVER_URL ?? 'http://localhost:8401/mcp'),
) {
  const client = createClient('knowledge-base-http-client')
  const transport = new StreamableHTTPClientTransport(serverUrl)

  try {
    await client.connect(transport)
    return await runKnowledgeBaseDemo(client)
  } finally {
    await client.close()
  }
}
