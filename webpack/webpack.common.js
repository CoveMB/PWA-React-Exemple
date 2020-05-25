
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { outputPath } = require('./common-paths');


const config = {
  entry : { vendor: [ 'semantic-ui-react' ] },
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
        from: 'public/manifest.json'
      },
      {
        from: 'public/.well-known'
      },
      {
        from: 'public/offline.html'
      }
    ]),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed) })
  ]
};

module.exports = config;
