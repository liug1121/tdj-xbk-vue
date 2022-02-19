const webpack = require('webpack')
const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: {
  //           drop_console: true,
  //         },
  //       },
  //     }),
  //   ],
  // },
  outputDir: 'dist',
  // outputDir: 'ceshiwechat',
  devServer: {
    disableHostCheck: true,
    // host: '192.168.18.109',
    // port: 8080,
    // https: true,
    proxy: {
      '/': {
        target: 'http://localhost:8888/',
        // target: 'http://xbk.xuebaka.cn/', // 正式环境
        // target: 'http://xbk.tdj.cn/ceshi/', // 测试环境
        // target: 'http://119.29.252.68:9999/', // 调试 群控
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
      // 蜂窝平台账号
      // '/fw': {
      //   target: 'http://192.168.18.160/api/v1/iot/',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/fw': '/'
      //   }
      // },
    }
  },
  publicPath: './',
  // outputDir: process.env.outputDir,
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('libs', resolve('src/libs'))
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
