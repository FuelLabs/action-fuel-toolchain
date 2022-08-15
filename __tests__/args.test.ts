import { getToolchainArgs, ILLEGAL_INPUT_ERR_MESSAGE, NO_TOOLCHAIN_ERR_MESSAGE } from "../src/args";

describe("action-fuel-toolchain", () => {
	test("empty input should fail", () => {
		process.env["INPUT_TOOLCHAIN"] = "";
		process.env["INPUT_NAME"] = "";

		expect(() => {getToolchainArgs()}).toThrow(NO_TOOLCHAIN_ERR_MESSAGE);
	})

	test("with toolchain should pass", () => {
		process.env["INPUT_TOOLCHAIN"] = "latest";
		process.env["INPUT_NAME"] = "";

		const args = getToolchainArgs();
		expect(args.toolchain).toBe("latest")
	})

	test("with name should pass", () => {
		process.env["INPUT_TOOLCHAIN"] = "";
		process.env["INPUT_NAME"] = "custom-toolchain";

		const args = getToolchainArgs();
		expect(args.name).toBe("custom-toolchain")
	})

	test("with toolchain and name should fail", () => {
		process.env["INPUT_TOOLCHAIN"] = "latest";
		process.env["INPUT_NAME"] = "custom-toolchain";

		expect(() => {getToolchainArgs()}).toThrow(ILLEGAL_INPUT_ERR_MESSAGE);
	})
})
