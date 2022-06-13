import { promises as fs } from 'fs';
import * as path from 'path';

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';

import { Args } from './args';

export class FuelUp {
    private readonly path: string;

    private constructor(exePath: string) {
        this.path = exePath;
    }

    public static async getOrInstall(): Promise<FuelUp> {
        try {
            return await FuelUp.get();
        } catch (error) {
            core.debug(
                `Unable to find "fuelup" executable, installing it now. Reason: ${error}`,
            );
            return await FuelUp.install();
        }
    }

    // Will throw an error if `fuelup` is not installed.
    public static async get(): Promise<FuelUp> {
        const exePath = await io.which('fuelup', true);
        return new FuelUp(exePath);
    }

    public static async install(): Promise<FuelUp> {
        switch (process.platform) {
            case 'darwin':
            case 'linux': {
                // eslint-disable-line prettier/prettier
                const fuelupSh = await tc.downloadTool('https://fuellabs.github.io/fuelup/fuelup-init.sh');

                // While the `fuelup-init.sh` is properly executed as is,
                // when Action is running on the VM itself,
                // it fails with `EACCES` when called in the Docker container.
                // Adding the execution bit manually just in case.
                // See: https://github.com/actions-rs/toolchain/pull/19#issuecomment-543358693
                core.debug(`Executing chmod 755 on ${fuelupSh}`);
                await fs.chmod(fuelupSh, 0o755);

                await exec.exec(fuelupSh);
                break;
            }

            default:
                throw new Error(
                    `Unsupported platform ${process.platform}, can't install fuelup`,
                );
        }

        // `$HOME` should always be declared, so it is more to get the linters happy
        core.addPath(path.join(process.env.HOME!, '.fuelup', 'bin')); // eslint-disable-line @typescript-eslint/no-non-null-assertion

        // Assuming it is in the $PATH already
        return new FuelUp('fuelup');
    }

    public async installToolchain(options?: Args): Promise<number> {
        const args = ['install'];

        if (options) {
            // TODO(oleksii): add actual flags to args here
        }

        await this.call(args);
        return 0;
    }

    public async call(args: string[], options?: {}): Promise<number> {
        return await exec.exec(this.path, args, options);
    }

    /**
     * Call `fuelup` and return the output
     */
    async callStdout(args: string[], options?: {}): Promise<string> {
        let stdout = '';
        const resOptions = Object.assign({}, options, {
            listeners: {
                stdout: (buffer: Buffer): void => {
                    stdout += buffer.toString();
                },
            },
        });

        await this.call(args, resOptions);

        return stdout;
    }
}
