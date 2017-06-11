const webpack = require('webpack')

module.exports = function (settings) {
  return {

    plugins: [
      new webpack.NamedModulesPlugin()
    ],

    devtool: 'cheap-module-eval-source-map',

    devServer: {

      proxy: {
        '/': {
          target: 'http://localhost:8081/'
        }
      },

      // overlay: true is equivalent
      overlay: {
        errors: true,
        warnings: true
      }

    }

  }
}
