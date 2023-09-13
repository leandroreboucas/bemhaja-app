module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/order': [
          'error',
          {
            groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
            pathGroups: [
              {
                pattern: 'react+(|-native)',
                group: 'external',
                position: 'before'
              },
              {
                pattern: '@+(routes|screens|components|hooks|themes)',
                group: 'internal',
                position: 'before'
              },
              {
                pattern: './',
                group: 'internal',
                position: 'before'
              }
            ],
            pathGroupsExcludedImportTypes: ['react+(|-native)'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            },
            'newlines-between': 'always'
          }
        ]
      }
    }
  ]
}