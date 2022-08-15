import * as core from '@actions/core';

export interface ToolchainOptions {
    toolchain: string;
    name: string;
    components: string[];
}


export function getToolchainArgs(): ToolchainOptions {
    let toolchain: string = core.getInput("toolchain");
    let name: string = core.getInput("name");
    let raw_components: string = core.getInput("components");

    if (name && toolchain) {
	    throw new Error("You cannot specify both an official toolchain with 'toolchain' and a custom toolchain with 'name' at the same time")
    }

    let components = raw_components
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);

    return {
	    toolchain: toolchain,
	    name: name,
	    components: components
    }
}
