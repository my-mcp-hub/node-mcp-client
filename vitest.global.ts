import { spawn } from 'child_process'
import { waitForValue } from './tests/utils'

export default async function setup() {
  const webProcess = spawn('npx', ['-y', '@my-mcp-hub/node-mcp-server', 'web'], {
    stdio: 'pipe',
  })
  let webStarted = false
  webProcess.stdout?.on('data', async (data) => {
    const output = data.toString()
    if (output.includes('MCP server started')) {
      webStarted = true
    }
  });
  await waitForValue(() => webStarted)
  return () => {
    webProcess.kill('SIGINT')
  }
}
