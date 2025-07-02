const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
 
  optimization: {    
    minimize: true,
    minimizer: [      new TerserPlugin(),
                new OptimizeCSSAssetsPlugin()    ],  
              },

  devtool: 'inline-source-map',

  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});

