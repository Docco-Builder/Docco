import * as Eta from 'eta';
import * as path from 'path';

import { getConfig } from "./config";
import { render } from "./render";
import { copyDir } from "../../helpers/fsHelpers";
import { mkdir } from "fs/promises";

const root = './docs/';

export const build = async (args) => {
	const ci = console.info;
	const here = process.cwd();
	const cfg = await getConfig();

	try {
		await mkdir(cfg.output);
	} catch (e) {
		console.info(e);
	}

	Eta.configure({
		plugins: [],
		views: path.join(here, cfg.views)
	});

	ci('Build started');

	// Move root files
	ci('┠┬ Moving wwwroot files...');
	await copyDir(path.join(root, 'wwwroot'), path.join(root, cfg.output));
	ci('┃└ Done');

	// Create index file
	ci('┠┬ Generating output files...');
	const index = await render(cfg);
	ci('┃├ Rendered');
	ci('┃└ Saved');
	ci('┗━ All done!');
};

// function registerHelpers() {
// 	const hbsHelpers = {
// 		date: (date, format = 'yyyy.MM.dd HH:mm') =>
// 			DateTime.fromISO(date, { locale: 'en' }).toFormat(format),
//
// 		dateISO: (date) => DateTime.fromJSDate(date).toISO(),
//
// 		year: () => DateTime.now().year,
//
// 		toLower: (str) => str.toLowerCase(),
//
// 		bust: (str) => `${str}?uuid=${crypto.randomUUID()}`,
//
// 		normalize: (str) =>
// 			str.toLowerCase().replace(/\s+/, '_'),
//
// 		md: (str) => marked.parse(str),
// 	};
//
// 	for (const [key, value] of Object.entries(hbsHelpers)) {
// 		Handlebars.registerHelper(key, value);
// 	}
// }
