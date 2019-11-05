/*
 * @Description: In User Settings Edit
 * @Author: LMD
 * @Date: 2019-10-15
 * @LastEditTime: 2019-10-15
 */
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

const path = require('path')

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
  devServer: {
    hot: true,
    // 代理配置
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  // 多页应用配置，对应src/pages文件夹，默认入口为Index
  pages: {
    index: {
      entry: 'src/pages/Index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      // 当使用 title 选项时,template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '商家后台管理系统',
      // 在这个页面中包含的块，默认情况下会包含 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login: {
      entry: 'src/pages/Login/main.js',
      template: 'public/login.html',
      filename: 'login.html',
      title: '登录'
    },
    warning: {
      entry: 'src/pages/Warning/index.js',
      template: 'public/warning.html',
      filename: 'warning.html',
      title: '系统提示'
    },
    statistic: {
      entry: 'src/pages/Statistic/main.js',
      template: 'public/statistic.html',
      filename: 'statistic.html',
      title: '数据统计'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@Index': path.resolve(__dirname, 'src', 'pages', 'Index'),
        '@IndexView': path.resolve(__dirname, 'src', 'pages', 'Index', 'views'),
        '@IndexIcon': path.resolve(__dirname, 'src', 'pages', 'Index', 'assets', 'images', 'icon'),
        '@IndexImg': path.resolve(__dirname, 'src', 'pages', 'Index', 'assets', 'images', 'img'),
        '@IndexLess': path.resolve(__dirname, 'src', 'pages', 'Index', 'assets', 'less'),
        '@IndexApi': path.resolve(__dirname, 'src', 'pages', 'Index', 'api'),
        '@IndexHandle': path.resolve(__dirname, 'src', 'pages', 'Index', 'handleData'),
        '@Login': path.resolve(__dirname, 'src', 'pages', 'Login'),
        '@Warning': path.resolve(__dirname, 'src', 'pages', 'Warning'),
        '@Statistic': path.resolve(__dirname, 'src', 'pages', 'Statistic'),
        '@StatisticImg': path.resolve(__dirname, 'src', 'pages', 'Statistic', 'img'),
        '@StatisticApi': path.resolve(__dirname, 'src', 'pages', 'Statistic', 'api')
      }
    }
  },
  pluginOptions: {},
  chainWebpack: config => {
    config.module.rule('less').end()
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
