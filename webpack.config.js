const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'
const envPath = `./.env.${isDev ? 'development' : 'production'}`

dotenv.config({
  path: envPath,
})

const config = {
  name: 'React18-TODO-setting',
  mode: isDev ? 'development' : 'production', // production, development
  devtool: !isDev ? 'hidden-source-map' : 'eval',
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      api: path.resolve(__dirname, './src/api/'),
      utils: path.resolve(__dirname, './src/utils/'),
      common: path.resolve(__dirname, './src/common/'),
      store: path.resolve(__dirname, './src/store/'),
      pages: path.resolve(__dirname, './src/pages/'),
      layout: path.resolve(__dirname, './src/layout/'),
      components: path.resolve(__dirname, './src/components/'),
    },
  },
  module: {
    rules: [
      {
        // 리액트 바벨 설정
        test: /\.tsx/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true, // CSS파일 안에서 정적파일로 background-image 사용할려면 false
            },
          },
        ],
        // type: 'javascript/auto',
      },
      // file-loader: 폰트
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        dependency: { not: ['url'] },
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]',
          },
        },
        // type: 'javascript/auto',
      },

      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        // type: 'asset/resource',
        // generator: {
        //   filename: 'assets/images/[contenthash].[ext]',
        // },
        dependency: { not: ['url'] },
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: envPath,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 설정
      templateParameters: {
        title: process.env.TITLE, // 문서 타이틀
      },
      minify: false, // 압축 설정
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/index.js',
    publicPath: '/',
  },
  devServer: {
    // 개발 서버 설정
    port: 3000,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: true,
    historyApiFallback: true,
  },
}

if (isDev && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new ReactRefreshWebpackPlugin())
} else {
  config.plugins.push(new CleanWebpackPlugin())

  config.plugins.push(
    new MiniCssExtractPlugin({
      linkType: false,
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].[contenthash].css',
    })
  )

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: 'public/',
          to: '',
          globOptions: {
            ignore: ['**/*.html', '**/*.js'],
          },
        },
      ],
    })
  )
}

module.exports = config
