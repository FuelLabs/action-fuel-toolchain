import * as core from '@actions/core';

export interface ToolchainOptions {
    toolchain: string;
    components: string[];
}


export function getToolchainArgs(): ToolchainOptions {
    let toolchain: string = core.getInput("toolchain");
    let raw_components: string = core.getInput("components");


    let components = raw_components
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);

    return {
	    toolchain: toolchain,
	    components: components
    }
}
