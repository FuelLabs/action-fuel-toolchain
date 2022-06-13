import * as args from './args';
import { FuelUp } from './fuelup';

async function run(): Promise<void> {
  const opts = args.getArgs();
  const fuelup = await FuelUp.getOrInstall();
  await fuelup.installToolchain(opts);
}

run();
