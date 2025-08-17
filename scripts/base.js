import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'
import { rimraf } from 'rimraf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'local'
let webProcess = null

/** @type {import('esbuild').BuildOptions} */
export const config = {
  entryPoints: [path.resolve(__dirname, '../src/index.ts')],
  outfile: path.resolve(__dirname, '../build/index.js'),
  format: 'esm',
  bundle: true,
  sourcemap: isDev,
  minify: isProd,
  platform: 'node',
  external: ['dotenv', 'timers/promises', '@modelcontextprotocol/sdk'],
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
  plugins: [
    {
      name: 'build-plugin',
      setup(build) {
        build.onStart(async result => {
          await before(result)
        })
        build.onEnd(async result => {
          await after(result)
        })
      },
    },
  ],
}

const before = async () => {
  await rimraf('build')
}

const after = async result => {
  if (isDev) {
    if (result.errors.length === 0) {
      console.log('✅ Rebuild succeeded')
    } else {
      console.error('❌ Rebuild failed')
    }
    if (webProcess) {
      webProcess.kill('SIGINT')
    }
    webProcess = spawn('npx', ['-y', '@my-mcp-hub/node-mcp-server', 'web'], {
      stdio: 'inherit',
    })
  }
}
