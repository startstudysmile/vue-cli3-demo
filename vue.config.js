/*
 * @Description: In User Settings Edit
 * @Author: 柳梦蝶
 * @Date: 2019-06-11 10:26:42
 * @LastEditTime: 2019-07-01 13:58:51
 */
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

// 配置信息在这里
module.exports = {
  publicPath: './', // 静态资源引用路径
  outputDir: 'dist', // 打包文件放置位置
  assetsDir: 'static', // 静态资源文件夹
  indexPath: 'index.html', // 入口文件位置，相对于outputDir
  filenameHashing: true, // 是否使用md5码
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  productionSourceMap: false, // 生产环境关闭source map
  integrity: false, // 内容安全策略及子资源完整性
  devServer: {}, // 代理配置
  pluginOptions: {},
  chainWebpack: config => {
    config
      .plugin('stylelint')
      .use(StyleLintPlugin, [
        {
          failOnError: false,
          files: ['**/*.less'],
          formatter: CodeframeFormatter,
          fix: true,
          syntax: 'less'
        }
      ])
      .end()
  }
}
