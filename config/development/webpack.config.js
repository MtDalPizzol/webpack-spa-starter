const webpack = require('webpack')

module.exports = function (settings) {
  return {

    plugins: [
      new webpack.NamedModulesPlugin()
    ],

    devtool: 'cheap-module-eval-source-map',

    devServer: {

      publicPath: 'http://localhost:8080/',

      historyApiFallback: true,

      proxy: {
        '/api': {
          target: 'http://localhost:8081/',
          pathRewrite: {'^/api': ''}
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
