import { FuelUp } from './fuelup'

async function run(): Promise<void> {
  await FuelUp.getOrInstall()
}

run()
