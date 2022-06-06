import { copyFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import { resolve } from 'path';

export const copyDir = async (source: string, target: string) => {
	if (!existsSync(source)) return;

	const paths = await readdir(source);
	for (const path in paths) {
		await copyFile(path, path.replace(source, target));
	}
};


export async function* getFilesRecursive(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield* getFilesRecursive(res);
		} else {
			yield res;
		}
	}
}
