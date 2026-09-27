import globals from 'globals';
import pluginImport from 'eslint-plugin-import-x';
import pluginJs from '@eslint/js';
import pluginReact from '@eslint-react/eslint-plugin';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...pluginReact.configs['recommended-typescript'],
  },
  pluginReactHooks.configs.flat.recommended,
  pluginReactRefresh.configs.vite,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'import-x': pluginImport,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import-x/newline-after-import': ['error', { count: 1 }],
    },
  },
  {
    files: ['src/**/index.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  prettier,
);
