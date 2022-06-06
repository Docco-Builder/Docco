import { DoccoConfig } from "../../types";
import * as fs from "fs/promises";
import path from "path";
import YAML from "yaml";

export const getConfig = async (): Promise<DoccoConfig> => {
	const file = await fs.readFile(path.join(process.cwd(), 'docco.config.yml'));

	const cfg: DoccoConfig = {
		views: 'views',
		templateName: 'document.eta',
		source: 'docs',
		output: 'dist'
	};

	return { ...cfg, ...YAML.parse(file.toString()) } as DoccoConfig;
};
