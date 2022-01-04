require('dotenv').config({ path: './.env' })

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
        '@models': './src/models',
        '@messages': './src/messages',
        '@service': './src/service',
      }
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
