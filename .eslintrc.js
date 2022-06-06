/** @type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "2017"
	},
	plugins: [
		"@typescript-eslint"
	],
	extends: [
		"eslint:recommended",
		"prettier",
		"plugin:@typescript-eslint/recommended"
	],
	rules: {
		indent: [
			"warn",
			"tab",
			{
				MemberExpression: 1,
				ignoredNodes: [
					"TemplateLiteral > *",
					"FunctionExpression > .params[decorators.length > 0]",
					"FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
					"ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
				],
				SwitchCase: 1,
			}
		],
		"semi-style": ["warn", "last"],
		semi: ["error", "always"],
		"object-curly-spacing": ["error", "always"],
	}
};
