import 'dotenv/config'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const client = new Client({
  name: 'mcp-client',
  version: '1.0.0',
})

const stdioClientTransport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', '@my-mcp-hub/node-mcp-server'],
  env: {
    ...(process.env as Record<string, string>),
  },
})
await client.connect(stdioClientTransport)

const { tools } = await client.listTools()
console.log(tools)
