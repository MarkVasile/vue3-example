/*
 * Webpack configurtion used as base for both dev and prod
 */
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const defineConfig = require('../config/config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay,
  },
})

let DEFINE = {}
if (process.env.NODE_ENV === 'production') {
  if (process.env.PROD_ENV === 'local') {
    DEFINE = defineConfig.dev_local
  } else if (process.env.PROD_ENV === 'uat') {
    DEFINE = defineConfig.uat
  } else {
    DEFINE = defineConfig.prod
  }
} else if (process.env.NODE_ENV === 'dev_local') {
  DEFINE = defineConfig.dev_local
} else {
  DEFINE = defineConfig.dev
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts',
  },
  output: {
    /**
         * With zero configuration,
         *   clean-webpack-plugin will remove files inside the directory below
         */
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: '@vue/runtime-dom',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig,
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: [resolve('node_modules/@babel')],
        include: [resolve('src'), resolve('test'), resolve('node_modules/@vue')],
      },
      {
        resourceQuery: /vue&type=template/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: [resolve('node_modules')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          bypassOnDebug: true,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(DEFINE),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
      chunkFilename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
}
