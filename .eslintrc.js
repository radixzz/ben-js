const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': resolve('src'),
              'src': resolve('src'),
              'foo': resolve('src/foo'),
              'assets': resolve('src/assets'),
              'styles': resolve('src/styles'),
            }
          }
        }
      }
    },
  },
  rules: {
    'func-names': ['off'],
    'no-restricted-globals': ['off'],
    'comma-dangle': ['off'],
    'padded-blocks': 0,
    'no-unused-vars': ['warn'],
    'no-param-reassign': ['off'],
    'no-undef': ['warn'],
    'no-plusplus': ['off'],
    'quotes': ['off'],
    'max-len': ['off'],
    'semi': ['off', 'always'],
    'linebreak-style': ['off'],
    'import/extensions': [
      'error',
      'never',
      {
        'json': 'always',
        'svg': 'always',
        'vue': 'always',
      }
    ],
    'space-before-blocks': ['off'],
    'space-before-function-paren': ['off'],
    'object-curly-newline': ['warn', {
      'ImportDeclaration': { 'multiline': true, 'minProperties': 4 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 4 },
    }],
    'camelcase': ['warn'],
    'comma-style': ['warn', 'last'],
    'spaced-comment': ['off'],
    'indent': [1, 2, {
      'SwitchCase': 1
    }],
    'no-shadow': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  globals: {
    document: true,
    window: true,
    firebase: true,
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
};
