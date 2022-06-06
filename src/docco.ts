import yargs from "yargs";
import { build } from "./commands/build/build";

yargs(process.argv)
	.scriptName("docco")
	.showHelpOnFail(true)
	.command<{ foo?: string }>({
		command: "build",
		describe: "Build the site",
		handler: build
	})
	.help()
	.demandCommand(1, "")
	.recommendCommands()
	.strict()
	.argv;

console.log("hello!");
