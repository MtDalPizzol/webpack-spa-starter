const path = require('path')
const ExtractText = require('extract-text-webpack-plugin')

module.exports = function (ext, cssOptions, settings) {
  let loaders = [
    {
      loader: 'css-loader',
      options: cssOptions
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve(settings.root, settings.path, `${settings.env.id}/postcss.config.js`)
        }
      }
    }
  ]

  if (ext === 'scss') {
    loaders.push('sass-loader')
  }

  const rule = {
    test: new RegExp(`\\.${ext}$`),
    exclude: /node_modules/,
    use: ExtractText.extract({
      use: loaders
    })
  }

  return {
    module: {
      rules: [rule]
    }
  }
}
