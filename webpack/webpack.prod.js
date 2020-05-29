const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { appEntry } = require('./common-paths');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

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
        vendors: {
          test  : /[\\/]node_modules[\\/]/,
          name  : 'vendors',
          chunks: 'initial',
        },
        async: {
          test     : /[\\/]node_modules[\\/]/,
          name     : 'async',
          chunks   : 'async',
          minChunks: 4,
        },
      }
    },
    runtimeChunk: true,
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
  plugins: [ new MiniCssExtractPlugin({ filename: 'styles/[name].[hash].css', }) 
  new ImageminWebpWebpackPlugin()
],
};

module.exports = config;
