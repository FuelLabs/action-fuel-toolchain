# `fuel-toolchain` Action

[![Continuous integration](https://github.com/FuelLabs/action-fuel-toolchain/actions/workflows/ci.yml/badge.svg)](https://github.com/FuelLabs/action-fuel-toolchain/actions/workflows/ci.yml)

Use this action to install the Fuel toolchain using [`fuelup`](https://github.com/FuelLabs/fuelup).

Heavily based on [`@actions-rs/toolchain`](https://github.com/actions-rs/toolchain).

**Table of Contents**

- [Example workflow](#example-workflow)
- [Inputs](#inputs)
- [Components](#components)
- [License](#license)

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
        uses: FuelLabs/action-fuel-toolchain@v0.6.0
        with:
          toolchain: latest # or nightly, beta-1, beta-2, beta-3, beta-4, beta-5
```

## Inputs

| Name         | Required | Description                                                                                                                                                       | Type   | Default |
| ------------ | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| `toolchain`  |          | Official [toolchain](https://install.fuel.network/master/concepts/toolchains.html#toolchain-specification) name to use. possible values: `latest`, `nightly` | string |         |
| `date`       |          | Optional date specifier for the `latest` or `nightly` toolchain                                                                                                   | string |         |
| `name`       |          | [Custom toolchain](https://install.fuel.network/master/concepts/toolchains.html#custom-toolchains) name to use                                               | string |         |
| `components` |          | Comma-separated list of the additional components to install. Component names may optionally be appended with their version, ex. `forc@0.19.2, fuel-core`         | string |         |

## Pinned toolchains

Sometimes, you may require a toolchain pinned to a [prior `latest` release](https://github.com/FuelLabs/fuelup/blob/4d110974605f70ac2c8b6a550379185750bc2c43/channels/latest/channel-fuel-latest-2023-01-18.toml):

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
        uses: FuelLabs/action-fuel-toolchain@v0.6.0
        with:
          toolchain: latest 
          date: 2023-01-18 # This pins to the `latest` toolchain released on 2023-01-18 (YYYY-MM-DD)
```

## Components

This action supports installing fuelup [components](https://install.fuel.network/master/concepts/components.html) on custom toolchains:

### Custom toolchain

```yaml
- name: Install Fuel toolchain
  uses: FuelLabs/action-fuel-toolchain@v0.6.0
  with:
    name: my-custom-toolchain
    components: forc, fuel-core
```

### Custom toolchain, partial installation

```yaml
- name: Install Fuel toolchain
  uses: FuelLabs/action-fuel-toolchain@v0.6.0
  with:
    name: my-custom-toolchain
    components: forc
```

### Custom toolchain, versioned components

```yaml
- name: Install Fuel toolchain
  uses: FuelLabs/action-fuel-toolchain@v0.6.0
  with:
    name: my-custom-toolchain
    components: forc, fuel-core@0.8.5
```

## License

Apache License, Version 2.0, ([LICENSE](./LICENSE) or <https://www.apache.org/licenses/LICENSE-2.0>)
