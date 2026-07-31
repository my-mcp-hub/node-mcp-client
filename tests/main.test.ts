import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { type MainDependencies, main } from '@/index'

const createDependencies = (): MainDependencies => ({
  runStdioDemo: vi.fn().mockResolvedValue({ selectedDocument: { id: 'mcp-overview' } }),
  runStreamableHttpDemo: vi.fn().mockResolvedValue({ selectedDocument: { id: 'transport-and-lifecycle' } }),
  logger: {
    log: vi.fn(),
    error: vi.fn(),
  },
})

describe('main', () => {
  const originalExitCode = process.exitCode

  beforeEach(() => {
    process.exitCode = undefined
  })

  afterEach(() => {
    process.exitCode = originalExitCode
  })

  test('runs both demos and reports their selected documents', async () => {
    const dependencies = createDependencies()

    await main(dependencies)

    expect(dependencies.runStdioDemo).toHaveBeenCalledOnce()
    expect(dependencies.runStreamableHttpDemo).toHaveBeenCalledOnce()
    expect(dependencies.logger.log).toHaveBeenNthCalledWith(1, 'stdio demo:', { id: 'mcp-overview' })
    expect(dependencies.logger.log).toHaveBeenNthCalledWith(2, 'streamable HTTP demo:', {
      id: 'transport-and-lifecycle',
    })
    expect(dependencies.logger.error).not.toHaveBeenCalled()
    expect(process.exitCode).toBeUndefined()
  })

  test('sets a failing exit code and stops when the stdio demo fails', async () => {
    const dependencies = createDependencies()
    const error = new Error('stdio failed')
    vi.mocked(dependencies.runStdioDemo).mockRejectedValueOnce(error)

    await main(dependencies)

    expect(dependencies.runStreamableHttpDemo).not.toHaveBeenCalled()
    expect(dependencies.logger.error).toHaveBeenCalledWith('Main error:', error)
    expect(process.exitCode).toBe(1)
  })
})
