const { outputPath, appEntry } = require('./common-paths');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
  mode   : 'production',
  entry  : { app: [ `${appEntry}/index.js` ], },
  output : { filename: 'static/[name].[hash].js', },
  devtool: 'source-map',
  module : {
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
  plugins: [ new CleanWebpackPlugin({outputPath}), new MiniCssExtractPlugin({ filename: 'styles/[name].[hash].css', }), ],
};

module.exports = config;
