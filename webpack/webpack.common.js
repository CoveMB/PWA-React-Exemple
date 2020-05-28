
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { outputPath, appEntry, publicPath } = require('./common-paths');


const config = {
  entry : `${appEntry}/index.js`,
  output: {
    path      : outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test   : /\.s?css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use : [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      Components: `${appEntry}/components/`,
      Style     : `${appEntry}/style/`,
      Images    : `${publicPath}/images/`,
      Shared    : `${appEntry}/components/shared/`,
      Hooks     : `${appEntry}/hooks/`,
      Contexts  : `${appEntry}/contexts/`,
      Sw        : `${appEntry}/service-worker/`
    },
    extensions: [
      '*',
      '.js',
      '.jsx'
    ],
    modules: [ 'src', 'node_modules' ],
  },
  plugins: [
    new CleanWebpackPlugin({ outputPath }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon : 'public/favicon.ico'
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc                        : './src/service-worker/serviceWorker.js',
      swDest                       : 'sw.js',
      maximumFileSizeToCacheInBytes: 20000000,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/images', to: 'images'
      },
      {
        from: 'public/.well-known', to: '.well-known'
      },
      {
        from: 'public/manifest.json'
      },
      {
        from: 'public/_redirects'
      },
      {
        from: 'public/offline.html'
      },
      {
        from: 'public/robots.txt'
      }
    ]),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed) }),
    new ImageminWebpWebpackPlugin()
  ]
};

module.exports = config;
