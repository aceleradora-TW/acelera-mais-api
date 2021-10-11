module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@models': './src/models'
      }
    }],
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true
      }
    ]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
