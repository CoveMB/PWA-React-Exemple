const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { appEntry } = require('./common-paths');

const config = {
  mode        : 'production',
  entry       : { app: [ `${appEntry}/index.js` ], },
  output      : { filename: 'static/[name].[hash].js', },
  devtool     : 'source-map',
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use : [
          { loader: MiniCssExtractPlugin.loader, },
          {
            loader : 'css-loader',
            options: {
              modules         : true,
              importLoaders   : 1,
              localsConvention: 'camelCase',
              sourceMap       : true,
            },
          },
          { loader: 'postcss-loader', },
        ],
      },
    ],
  },
  plugins: [ new MiniCssExtractPlugin({ filename: 'styles/[name].[hash].css', }), ],
};

module.exports = config;
