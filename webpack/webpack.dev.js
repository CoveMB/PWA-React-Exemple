const webpack = require('webpack');
const { appEntry } = require('./common-paths');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const config = {
  mode   : 'development',
  entry  : { app: `${appEntry}/index.js`, },
  output : { filename: '[name].[hash].js', },
  resolve: { alias: { 'react-dom': '@hot-loader/react-dom', }, },
  devtool: 'inline-source-map',
  module : {
    rules: [
      {
        test: /\.css$/,
        use : [
          { loader: 'style-loader', },
          {
            loader : 'css-loader',
            options: {
              modules         : true,
              localsConvention: 'camelCase',
              sourceMap       : true,
            },
          },
        ],
      },
    ],
  },
  plugins  : [ new webpack.HotModuleReplacementPlugin() ],
  devServer: {
    host,
    port,
    historyApiFallback: true,
    hot               : true,
    open              : true,
    stats             : 'errors-only',
  },
};

module.exports = config;
