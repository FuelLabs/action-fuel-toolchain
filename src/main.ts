import * as core from '@actions/core'

import { getToolchainArgs } from './args'
import { FuelUp } from './fuelup'

async function run(): Promise<void> {
  const opts = getToolchainArgs()
  const fuelup = await FuelUp.getOrInstall()

  if (opts.toolchain) {
    switch (opts.toolchain) {
      case 'stable':
        throw new Error(
          "${opts.toolchain} is not supported yet. Use one of: ['latest', 'nightly', 'beta-1', 'beta-2']"
        )
      case 'nightly':
      case 'latest':
      case 'beta-1':
      case 'beta-2':
        let toolchain = opts.toolchain
        if (opts.date) {
          toolchain += '-' + opts.date
        }
        await fuelup.installToolchain(toolchain)
        break
      default:
        throw new Error(
          "Unknown toolchain. Use one of: ['latest', 'nightly', 'beta-1', 'beta-2']"
        )
    }
  } else if (opts.name) {
    await fuelup.initToolchain(opts.name)
    await fuelup.setDefault(opts.name)
  }

  if (opts.components) {
    opts.components.map(async component => {
      await fuelup.addComponent(component)
    })
  }
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

main()
