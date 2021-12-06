module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    babelOptions: {
      configFile: './babelrc.json',
    },
  },
  rules: {
    indent: [
      {
        SwitchCase: 1,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'quote-props': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never',
      },
    ],
    semi: ['error', 'always'],
    'new-cap': 0,
    'import/no-absolute-path': 0,
    'no-unused-vars': 0,
    'import/order': 0,
    'unicorn/number-literal-case': 0,
    'no-console': 0,
    curly: 0,
  },
};
