import * as core from '@actions/core'

import { getToolchainArgs } from './args'
import { FuelUp } from './fuelup'

async function run(): Promise<void> {
  const opts = getToolchainArgs()
  const fuelup = await FuelUp.getOrInstall()

  if (opts.toolchain) {
    switch (opts.toolchain) {
      case 'stable':
      case 'beta':
        throw new Error(
          "${opts.toolchain} is not supported yet. Use one of: ['latest']"
        )
      case 'nightly':
      case 'latest':
        await fuelup.installToolchain(opts.toolchain)
        break
      default:
        throw new Error("Unknown toolchain. Use one of: ['latest', 'nightly']")
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
