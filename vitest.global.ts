import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'child_process'
import { waitForValue } from './tests/utils'

export default async function setup() {
  const serverRoot = path.resolve(process.cwd(), '../node-mcp-server')
  const useLocalServer = existsSync(path.join(serverRoot, 'src/index.ts'))
  const webProcess = spawn(
    'npx',
    useLocalServer ? ['tsx', './src/index.ts', 'web'] : ['-y', '@my-mcp-hub/node-mcp-server', 'web'],
    {
      cwd: useLocalServer ? serverRoot : undefined,
      stdio: 'pipe',
    },
  )
  let webStarted = false
  webProcess.stdout?.on('data', data => {
    const output = data.toString()
    if (output.includes('MCP server started')) {
      webStarted = true
    }
  })
  await waitForValue(() => webStarted, 100, 30000)
  return () => {
    webProcess.kill('SIGINT')
  }
}
