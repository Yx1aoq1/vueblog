const MDatabasePlugin = require('./plugins/database-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vueblog/'
    : '/',
  configureWebpack: {
    plugins: [
      new MDatabasePlugin({
        path: resolve('./')
      })
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
    // 将 icons 目录排除在 svg 默认规则之外
    config.module
      .rule('svg')
      .exclude.add(resolve('src/renderer/icons'))
      .end()
    // 用 svg-sprite-loader 处理 icons 下的 svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/renderer/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
