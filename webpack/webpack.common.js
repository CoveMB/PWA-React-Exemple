
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const { outputPath } = require('./common-paths');

const config = {

  // env: Object.keys(process.env).reduce((acc, curr) => {

  //   acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);

  //   return acc;

  // }, {}),
  // env   : dotenv.config().parsed,
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name   : 'styles',
          test   : /\.css$/,
          chunks : 'all',
          enforce: true
        },
        vendor: {
          chunks : 'initial',
          test   : 'vendor',
          name   : 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon : 'public/favicon.ico'
    }),
    new CopyWebpackPlugin([ { from: 'public' } ]),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed) })
  ]
};

module.exports = config;
