import {
  DATE_AND_NAME_ERR_MESSAGE,
  getToolchainArgs,
  ILLEGAL_DATE_INPUT_ERR_MESSAGE,
  ILLEGAL_INPUT_ERR_MESSAGE,
  NO_TOOLCHAIN_ERR_MESSAGE
} from '../src/args'

describe('action-fuel-toolchain', () => {
  test('with toolchain should pass', () => {
    process.env['INPUT_TOOLCHAIN'] = 'latest'
    process.env['INPUT_NAME'] = ''

    const args = getToolchainArgs()
    expect(args.toolchain).toBe('latest')
  })

  test('with name should pass', () => {
    process.env['INPUT_TOOLCHAIN'] = ''
    process.env['INPUT_NAME'] = 'custom-toolchain'

    const args = getToolchainArgs()
    expect(args.name).toBe('custom-toolchain')
  })

  test('with date and toolchain should pass', () => {
    process.env['INPUT_TOOLCHAIN'] = 'latest'
    process.env['INPUT_NAME'] = ''
    process.env['INPUT_DATE'] = '2023-01-18'

    const args = getToolchainArgs()
    expect(args.toolchain).toBe('latest')
    expect(args.date).toBe('2023-01-18')
  })

  test('no toolchain or name should fail', () => {
    process.env['INPUT_TOOLCHAIN'] = ''
    process.env['INPUT_NAME'] = ''

    expect(() => {
      getToolchainArgs()
    }).toThrow(NO_TOOLCHAIN_ERR_MESSAGE)
  })

  test('with toolchain and name should fail', () => {
    process.env['INPUT_TOOLCHAIN'] = 'latest'
    process.env['INPUT_NAME'] = 'custom-toolchain'

    expect(() => {
      getToolchainArgs()
    }).toThrow(ILLEGAL_INPUT_ERR_MESSAGE)
  })

  test('with wrong toolchain and date should fail', () => {
    ;['beta-1', 'beta-2'].map(tc => {
      process.env['INPUT_TOOLCHAIN'] = tc
      process.env['INPUT_NAME'] = ''
      process.env['INPUT_DATE'] = '2023-01-18'

      expect(() => {
        getToolchainArgs()
      }).toThrow(ILLEGAL_DATE_INPUT_ERR_MESSAGE)
    })
  })

  test('with name and date should fail', () => {
    process.env['INPUT_TOOLCHAIN'] = ''
    process.env['INPUT_NAME'] = 'custom-toolchain'
    process.env['INPUT_DATE'] = '2023-01-18'

    expect(() => {
      getToolchainArgs()
    }).toThrow(DATE_AND_NAME_ERR_MESSAGE)
  })
})
