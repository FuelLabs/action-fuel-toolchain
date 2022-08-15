import * as core from "@actions/core";

import { getToolchainArgs } from './args';
import { FuelUp } from './fuelup'

async function run(): Promise<void> {
	const opts = getToolchainArgs();
	const fuelup = await FuelUp.getOrInstall();

	console.log(opts);

	if (opts.toolchain) {
		switch (opts.toolchain) {
		case 'latest':
			await fuelup.installToolchain();
		}
	} else {
		await fuelup.initToolchain(opts.name);
	}

	if (opts.components) {
		console.log(opts.components)
		opts.components.map(async component => {
				await fuelup.addComponent(component);
		}
		);
	}
}

async function main(): Promise<void> {
    try {
        await run();
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

main();
