import 'dotenv/config'
import { setTimeout as sleep } from 'timers/promises'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js'

async function testStdioTransport() {
  console.log('start stdio client transport')
  const client = new Client({
    name: 'mcp-stdio-client',
    version: '1.0.0',
  })

  const stdioClientTransport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', '@my-mcp-hub/node-mcp-server'],
    env: {
      ...(process.env as Record<string, string>),
    },
  })

  try {
    await client.connect(stdioClientTransport)
    console.log('stdio client transport connected')

    const { tools } = await client.listTools()
    console.log(tools.map(item => item.name))
    console.log('stdio client transport tools listed')

    const callResult = await client.callTool({
      name: 'GetData',
      arguments: {
        keyword: 'Hello',
      },
    })
    console.log(callResult.content)
    console.log('stdio client transport call tool done')
  } catch (error) {
    console.error('stdio transport error:', error)
  } finally {
    await client.close()
    console.log('stdio client transport closed')
  }

  console.log('stdio client transport done\n\n')
  await sleep(1000)
}

async function testStreamableHttpTransport() {
  console.log('start streamable http client transport')
  const client = new Client({
    name: 'mcp-http-client',
    version: '1.0.0',
  })

  const streamableBaseUrl = new URL('http://localhost:8401/mcp')
  const streamableClientTransport = new StreamableHTTPClientTransport(streamableBaseUrl)

  try {
    await client.connect(streamableClientTransport)
    console.log('streamable http client transport connected')

    const { tools } = await client.listTools()
    console.log(tools.map(item => item.name))
    console.log('streamable http client transport tools listed')

    const callResult = await client.callTool({
      name: 'GetData',
      arguments: {
        keyword: 'Hello',
      },
    })
    console.log(callResult.content)
    console.log('streamable http client transport call tool done')
  } catch (error) {
    console.error('streamable http transport error:', error)
  } finally {
    await client.close()
    console.log('streamable http client transport closed')
  }

  console.log('streamable http client transport done\n\n')
  await sleep(1000)
}

async function testSSETransport() {
  console.log('start sse client transport')
  const client = new Client({
    name: 'mcp-sse-client',
    version: '1.0.0',
  })

  const sseBaseUrl = new URL('http://localhost:8401/sse')
  const sseClientTransport = new SSEClientTransport(sseBaseUrl)

  try {
    await client.connect(sseClientTransport)
    console.log('sse client transport connected')

    const { tools } = await client.listTools()
    console.log(tools.map(item => item.name))
    console.log('sse client transport tools listed')

    const callResult = await client.callTool({
      name: 'GetData',
      arguments: {
        keyword: 'Hello',
      },
    })
    console.log(callResult.content)
    console.log('sse client transport call tool done')
  } catch (error) {
    console.error('sse transport error:', error)
  } finally {
    await client.close()
    console.log('sse client transport closed')
  }

  console.log('sse client transport done\n\n')
  await sleep(1000)
}

async function main() {
  try {
    await testStdioTransport()
    await testStreamableHttpTransport()
    await testSSETransport()
  } catch (error) {
    console.error('Main error:', error)
    process.exit(1)
  }
}

await main()
