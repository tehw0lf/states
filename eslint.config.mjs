import nx from '@nx/eslint-plugin';
import angularEslint from 'angular-eslint';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-extra-semi': 'off',
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-extra-semi': 'off',
    },
  },
  ...nx.configs['flat/angular'],
  // Flat-native replacement for plugin:@angular-eslint/template/process-inline-templates.
  // Applies the extract-inline-html processor to .ts files so inline Angular templates are linted.
  {
    files: ['**/*.ts'],
    processor: angularEslint.processInlineTemplates,
    plugins: { '@angular-eslint': angularEslint.tsPlugin },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'states',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'states',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      // Newly enabled by the angular-eslint tsRecommended preset; was not enforced before the upgrade.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.html'],
    rules: {
      // Newly enabled by the angular-eslint templateAccessibility preset; was not enforced before the upgrade.
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
];
