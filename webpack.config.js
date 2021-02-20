const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const environment = process.env?.NODE_ENV ? process.env?.NODE_ENV : 'development';

console.log(`Webpack running in ${environment}`);

module.exports = {
  entry: './src/index.js',
  mode: environment,
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'src/css', to: path.resolve(__dirname, 'docs/css')},
          { from: 'src/data', to: path.resolve(__dirname, 'docs/data')}
      ]
  })
  ]
};
