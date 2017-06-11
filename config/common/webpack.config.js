const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const Favicons = require('favicons-webpack-plugin')
const Html = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const ProgressBar = require('progress-bar-webpack-plugin')

const extractStyles = require('../abstraction/extract-styles')
const splitBundles = require('../abstraction/split-bundles')

module.exports = function (settings) {
  const config = {
    entry: {
      'bundle': path.resolve(settings.root, 'src', 'index.js')
    },
    output: {
      path: path.resolve(settings.root, 'dist'),
      filename: `[chunkhash]/[name].js`,
      chunkFilename: '[chunkhash]/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 40000,
                name: '[hash]/[name].[ext]'
              }
            },
            'image-webpack-loader'
          ]
        }
      ]
    },
    plugins: [
      new ProgressBar(),
      new webpack.DefinePlugin({
        API_ROOT: JSON.stringify('/')
      }),
      new Favicons({
        logo: path.resolve(settings.root, 'assets/js.png'),
        prefix: '[hash]/',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          firefox: false
        }
      }),
      new Html({
        template: path.resolve(settings.root, 'src', 'index.html')
      }),
      new ExtractText('[contenthash]/styles.css')
    ]
  }

  return merge(
    config,
    extractStyles('css', { importLoaders: 1 }, settings),
    extractStyles('scss', { importLoaders: 2 }, settings),
    splitBundles([
      { name: 'vendor' },
      { name: 'manifest', minChunks: Infinity }
    ])
  )
}
