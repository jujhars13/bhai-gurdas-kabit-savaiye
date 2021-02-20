const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const environment = process.env?.NODE_ENV ? process.env?.NODE_ENV : 'development';
let dest = 'docs';
if (environment == "development") {
  dest="build"
}
console.log(`Webpack running in ${environment}`);

module.exports = {
  entry: './src/index.js',
  mode: environment,
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, dest),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'src/css', to: path.resolve(__dirname, `${dest}/css`)},
          { from: 'src/data', to: path.resolve(__dirname, `${dest}/data`)}
      ]
  })
  ]
};
