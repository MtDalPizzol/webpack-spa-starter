const Clean = require('clean-webpack-plugin')

module.exports = function (settings) {
  return {
    plugins: [
      new Clean(['./dist/*'], {
        root: settings.root
      })
    ]
  }
}
