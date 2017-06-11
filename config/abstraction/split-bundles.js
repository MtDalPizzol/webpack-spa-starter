const _ = require('lodash')
const webpack = require('webpack')

module.exports = function (bundles) {
  const isVendor = ({ resource }) => (
    resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/)
  )

  const defaults = {
    minChunks: isVendor
  }

  return {
    plugins: bundles.map((bundle) => (
      new webpack.optimize.CommonsChunkPlugin(_.merge({}, defaults, bundle))
    ))
  }
}
