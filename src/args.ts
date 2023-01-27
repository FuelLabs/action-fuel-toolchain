import * as core from '@actions/core'

export interface ToolchainOptions {
  toolchain?: string
  date?: string
  name?: string
  components?: string[]
}

export const ILLEGAL_INPUT_ERR_MESSAGE =
  "You cannot specify both an official toolchain with 'toolchain' and a custom toolchain with 'name' at the same time"
export const NO_TOOLCHAIN_ERR_MESSAGE =
  "You must specify either an official toolchain with 'toolchain' or a custom toolchain with 'name'"
export const DATE_AND_NAME_ERR_MESSAGE =
  "You cannot specify a custom toolchain with both 'name' and 'date'"
export const ILLEGAL_DATE_INPUT_ERR_MESSAGE =
  "Either 'latest' or 'nightly' toolchains must be specified when 'date' is an input"

export function getToolchainArgs(): ToolchainOptions {
  let toolchain: string = core.getInput('toolchain')
  let date: string = core.getInput('date')
  let name: string = core.getInput('name')
  let raw_components: string = core.getInput('components')

  if (name && toolchain) {
    throw new Error(ILLEGAL_INPUT_ERR_MESSAGE)
  }

  if (!name && !toolchain) {
    throw new Error(NO_TOOLCHAIN_ERR_MESSAGE)
  }

  if (date) {
    if (name) {
      throw new Error(DATE_AND_NAME_ERR_MESSAGE)
    }

    if (!['latest', 'nightly'].includes(toolchain)) {
      throw new Error(ILLEGAL_DATE_INPUT_ERR_MESSAGE)
    }
  }

  let components = raw_components
    .split(',')
    .map((item: string) => item.trim())
    .filter((item: string) => item.length > 0)

  return {
    toolchain: toolchain,
    date: date,
    name: name,
    components: components
  }
}
