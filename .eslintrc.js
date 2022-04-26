module.exports = {
  extends: ['eslint:all', 'hardcore', 'hardcore/node', 'hardcore/fp'],

  env: {
    commonjs: true,
    es2022: true,
    node: true
  },

  ignorePatterns: [
    '!**',
    'node_modules',
    '.cache',
    '.breakpoints',
    '.git',
    '.npm',
    '.upm',
    '.eslintcache',
    'package-lock.json'
  ],

  parserOptions: {
    ecmaVersion: 2022
  },

  root: true,

  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'vars-on-top': 0,
    'node/no-process-env': 0,
    'unicorn/prefer-module': 0,
    'putout/putout': 0,
    'import/no-dynamic-require': 0,
    'security/detect-non-literal-require': 0,
    'security/detect-non-literal-require': 0,
    'prettier/prettier': 0,
    'node/global-require': 0,
    'no-param-reassign': 0,
    'fp/no-mutation': 0,
    'no-console': 0,
    'import/no-commonjs': 0,
    'no-plusplus': 0,
    'no-magic-numbers': 0,
    'no-ternary': 0,
    'no-implicit-coercion': 0,
    'import/order': 0,
    'fp/no-loops': 0,
    'fp/no-mutating-methods': 0,
    'import/newline-after-import': 0,
    'promise/prefer-await-to-then': 0,
    'max-statements': 0,
    'max-lines-per-function': 0
  }
}
