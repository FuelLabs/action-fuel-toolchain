import * as core from '@actions/core';

export interface ToolchainOptions {
    toolchain: string;
    name: string;
    components: string[];
}


export function getToolchainArgs(): ToolchainOptions {
    let toolchain: string = core.getInput("toolchain");
    let name: string = core.getInput("name");
    let components: string[] = core.getMultilineInput("components");

    if (name && toolchain) {
	    throw new Error("cannot specify both an official toolchain with 'toolchain' and a custom toolchain with 'name' at the same time")
    }


    return {
	    toolchain: toolchain,
	    name: name,
	    components: components || undefined
    }
}
