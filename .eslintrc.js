'use strict'

module.exports = {
  env: { commonjs: true, es2022: true, node: true },
  extends: ['eslint:all', 'hardcore', 'hardcore/node', 'hardcore/fp'],

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

  parserOptions: { ecmaVersion: 2022 },

  root: true,

  rules: {
    'consistent-return': 0,
    curly: [2, 'multi-or-nest', 'consistent'],
    'default-case': 0,
    'fp/no-loops': 0,
    'fp/no-mutating-methods': 0,
    'fp/no-mutation': 0,
    'import/newline-after-import': 0,
    'import/no-commonjs': 0,
    'import/no-dynamic-require': 0,
    'import/order': 0,
    'line-comment-position': 0,

    'max-len': [
      1,
      {
        code: 120,
        comments: 140,
        ignoreRegExpLiterals: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreUrls: true,
        tabWidth: 4
      }
    ],

    'max-lines-per-function': 0,
    'max-statements': 0,
    'new-cap': 0,
    'no-console': 0,
    'no-implicit-coercion': 0,
    'no-inline-comments': 0,
    'no-magic-numbers': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-tabs': 0,
    'no-ternary': 0,
    'no-warning-comments': 1,
    'node/global-require': 0,
    'node/no-process-env': 0,
    'node/no-sync': 0,
    'object-shorthand': [2, 'methods'],
    'prettier/prettier': 0,
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    'promise/prefer-await-to-then': 0,
    'putout/putout': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'security/detect-non-literal-require': 0,
    'sort-keys': [2, 'asc', { caseSensitive: false, natural: true, minKeys: 5 }],
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0,
    'vars-on-top': 0
  }
}
