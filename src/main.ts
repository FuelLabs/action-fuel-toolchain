import { FuelUp } from './fuelup'

async function run(): Promise<void> {
  const fuelup = await FuelUp.getOrInstall()
  await fuelup.installToolchain()
}

run()
