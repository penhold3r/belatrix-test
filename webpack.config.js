//
require('whatwg-fetch');
//
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
module.exports = {
   entry: ['whatwg-fetch', './src/js/script.js'],
   output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, './docs/'),
      publicPath: './'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, './scripts'),
            exclude: /node_modules/
         },
         {
            test: /\.(css)$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {}
               },
               {
                  loader: 'css-loader',
                  options: {}
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: () => [require('autoprefixer')]
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/style.css',
      }),
      new HtmlWebpackPlugin({
         title: 'Ubigeos',
         template: './src/index.html',
         inlineSource: '.css$'
      }),
      new HtmlWebpackInlineSourcePlugin()
   ]
};
