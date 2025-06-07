/* eslint-disable import/no-anonymous-default-export */

export default {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['DEV-'],
    },
  },
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', []],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['fix', 'feat', 'test', 'perf', 'docs', 'style', 'refactor', 'chore'],
    ],
  },
};
