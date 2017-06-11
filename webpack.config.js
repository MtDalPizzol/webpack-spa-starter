const WebpackEnvy = require('webpack-envy')

const envy = new WebpackEnvy({
  filename: '[env]/webpack.config.js',
  verbose: true
})

module.exports = envy.getConfig()
