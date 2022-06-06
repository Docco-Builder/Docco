import { promises as fs } from "fs";
import * as Eta from "eta";
import { parseFrontMatter } from "../../helpers/frontmatter";
import { DoccoConfig } from "../../types";
import { sep } from "path";
import { getFilesRecursive } from "../../helpers/fsHelpers";
import { mkdir } from "fs/promises";

export const render = async (cfg: DoccoConfig) => {

	for await(const file of getFilesRecursive(cfg.source)) {
		console.log(file);
		const content = await fs.readFile(file, "utf-8");
		const frontmatter = parseFrontMatter<object>(content);

		const result = await Eta.renderFileAsync(cfg.templateName, { body: frontmatter.body, ...frontmatter.frontMatter });

		const outFile = file.replace(cfg.source, cfg.output).replace('md', 'html');

		try {
			await mkdir(outFile.split(sep).slice(0, -1).join(sep));
		} catch (e) {
			console.info(e);
		}
		try {
			await fs.writeFile(outFile, result);
		} catch (e) {
			console.info(e);
		}
	}
};
