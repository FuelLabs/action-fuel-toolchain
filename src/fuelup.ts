import { promises as fs } from 'fs'
import * as path from 'path'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'

export class FuelUp {
  private readonly path: string

  private constructor(exePath: string) {
    this.path = exePath
  }

  static async getOrInstall(): Promise<FuelUp> {
    try {
      return await FuelUp.get()
    } catch (error) {
      core.debug(
        `Unable to find "fuelup" executable, installing it now. Reason: ${error}`
      )
      return await FuelUp.install()
    }
  }

  // Will throw an error if `fuelup` is not installed.
  static async get(): Promise<FuelUp> {
    const exePath = await io.which('fuelup', true)
    return new FuelUp(exePath)
  }

  static async install(): Promise<FuelUp> {
    switch (process.platform) {
      case 'darwin':
      case 'linux': {
        const fuelupSh = await tc.downloadTool(
	  'https://fuellabs.github.io/fuelup/fuelup-init.sh'
        )

        // While the `fuelup-init.sh` is properly executed as is,
        // when Action is running on the VM itself,
        // it fails with `EACCES` when called in the Docker container.
        // Adding the execution bit manually just in case.
        // See: https://github.com/actions-rs/toolchain/pull/19#issuecomment-543358693
        core.debug(`Executing chmod 755 on ${fuelupSh}`)
        await fs.chmod(fuelupSh, 0o755)

        await exec.exec(fuelupSh, ['--skip-toolchain-installation'])
        break
      }

      default:
        throw new Error(
          `Unsupported platform ${process.platform}, can't install fuelup`
        )
    }

    // `$HOME` should always be declared, so it is more to get the linters happy
    core.addPath(path.join(process.env.HOME!, '.fuelup', 'bin')) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    // Assuming it is in the $PATH already
    return new FuelUp('fuelup')
  }

  async initToolchain(name: string): Promise<number> {
    return this.call(['toolchain', 'new', name])
  }

  async setDefault(toolchain: string): Promise<number> {
    return this.call(['default', toolchain])
  }

  async addComponent(maybe_versioned_component: string): Promise<number> {
    return this.call(['component', 'add', maybe_versioned_component])
  }

  async installToolchain(toolchain: string): Promise<number> {
    return this.call(['toolchain', 'install', toolchain])
  }

  async call(args: string[], options?: {}): Promise<number> {
    return await exec.exec(this.path, args, options)
  }

  /**
   * Call `fuelup` and return the output
   */
  async callStdout(args: string[], options?: {}): Promise<string> {
    let stdout = ''
    const resOptions = Object.assign({}, options, {
      listeners: {
        stdout: (buffer: Buffer): void => {
          stdout += buffer.toString()
        }
      }
    })

    await this.call(args, resOptions)

    return stdout
  }
}
