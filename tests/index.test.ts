import { describe, test } from 'vitest'
import { testSSETransport, testStdioTransport, testStreamableHttpTransport } from '@/index'

describe('MCP client', () => {
  test('stdio transport', async () => {
    await testStdioTransport()
  })

  test('streamable http transport', async () => {
    await testStreamableHttpTransport()
  })

  test('sse transport', async () => {
    await testSSETransport()
  })
})
