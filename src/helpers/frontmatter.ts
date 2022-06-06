import YAML from "yaml";

export interface FrontMatterData<T> {
	frontMatter?: T;
	body: string;
}

export const parseFrontMatter = <T>(text: string): FrontMatterData<T> => {
	const parts = text.split('---')
		.filter(s => s.length > 0);

	if (parts.length >= 2) {

		const [head, ...rest] = parts;

		const frontMatter = YAML.parse(head) as T;
		const body = rest.join('---');
		return { frontMatter, body };

	} else {
		return { body: parts.join('---') };
	}
};
