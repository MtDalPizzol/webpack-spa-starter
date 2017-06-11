const webpack = require('webpack')
const cssnano = require('cssnano')
const Clean = require('clean-webpack-plugin')
const Babili = require('babili-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')

module.exports = function (settings) {
  const config = {

    devtool: 'source-map',

    plugins: [
      new Clean(['./dist/*'], {
        root: settings.root
      }),
      new Babili(),
      new OptimizeCSSAssets({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          // Run cssnano in safe mode to avoid
          // potentially unsafe transformations.
          safe: true
        },
        // Prevent output noise on stats
        canPrint: false
      }),
      new webpack.HashedModuleIdsPlugin()
    ]

  }

  if (settings.env.stats) {
    var BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

    config.plugins.push(
      new BundleAnalyzer({
        generateStatsFile: true
      })
    )
  }

  return config
}
