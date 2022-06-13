<a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>

# Fuel Toolchain action

Use this action to install Fuel toolchain using [`fuelup`](https://github.com/FuelLabs/fuelup/).

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
      - name: Install Rust toolchain
        uses: actions-rs/toolchain@v1
      - name: Install Fuel toolchain
        uses: FuelLabs/action-fuel-toolchain@v1
```

## License

Apache License, Version 2.0, ([LICENSE](./LICENSE) or <https://www.apache.org/licenses/LICENSE-2.0>)
