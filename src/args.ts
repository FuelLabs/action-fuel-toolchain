import * as core from '@actions/core'

export interface ToolchainOptions {
  toolchain?: string
  name?: string
  components?: string[]
}

export const ILLEGAL_INPUT_ERR_MESSAGE =
  "You cannot specify both an official toolchain with 'toolchain' and a custom toolchain with 'name' at the same time"
export const NO_TOOLCHAIN_ERR_MESSAGE =
  "You must specify either an official toolchain with 'toolchain' or a custom toolchain with 'name'"

export function getToolchainArgs(): ToolchainOptions {
  let toolchain: string = core.getInput('toolchain')
  let name: string = core.getInput('name')
  let raw_components: string = core.getInput('components')

  if (name && toolchain) {
    throw new Error(ILLEGAL_INPUT_ERR_MESSAGE)
  }

  let components = raw_components
    .split(',')
    .map((item: string) => item.trim())
    .filter((item: string) => item.length > 0)

  return {
    toolchain: toolchain,
    name: name,
    components: components
  }
}
