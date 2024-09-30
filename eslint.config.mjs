import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const rules = [
	{
		files: ['**/*.{js,mjs,cjs,jsx,tsx}'],
		languageOptions: {
			globals: globals.browser,
			parser: typescriptParser,
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	typescriptPlugin.configs.recommended,
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
		},
	},
];

export default rules;
