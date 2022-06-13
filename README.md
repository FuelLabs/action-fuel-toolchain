# `fuel-toolchain` Action

[![Continuous integration](https://github.com/FuelLabs/action-fuel-toolchain/actions/workflows/ci.yml/badge.svg)](https://github.com/FuelLabs/action-fuel-toolchain/actions/workflows/ci.yml)

Use this action to install the Fuel toolchain using [`fuelup`](https://github.com/FuelLabs/fuelup).

Heavily based on [`@actions-rs/toolchain`](https://github.com/actions-rs/toolchain).

## Example workflow

```yaml
on: [push]

name: build

jobs:
  check:
    name: Sway project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Fuel toolchain
        uses: FuelLabs/action-fuel-toolchain@v0.1.0
```

## License

Apache License, Version 2.0, ([LICENSE](./LICENSE) or <https://www.apache.org/licenses/LICENSE-2.0>)
