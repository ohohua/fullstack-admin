import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
},
  {
    rules: {
      'no-console': 'off',
      'no-useless-call': 'off',
      'ts/no-namespace': 'off',
      'perfectionist/sort-exports': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
      }],
      'vue/max-attributes-per-line': ['error'],
    },
  },
  {
    files: ['apps/**/src/**/*.{ts,tsx}', 'packages/**/src/*.{ts,js}'],
    rules: {
      'node/prefer-global/process': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    files: ['apps/server/src/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': 'off',
    },
  })
