const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;

module.exports = {
  entry: {
    customcomponents: Path.resolve(__dirname, '../src/index.js'),
    /*style:Path.resolve(__dirname, '../src/scss/bootstrap.scss'),
    modal: Path.resolve(__dirname, '../src/components/modal/modal.js'),
    progressbar: Path.resolve(__dirname, '../src/components/progress-bar/progress-bar.js'),
    progressspinner:Path.resolve(__dirname,'../src/components/progress-spinner/progress-spinner.js'),
    tooltip:Path.resolve(__dirname, '../src/components/tooltip/tooltip.js'),
    card: Path.resolve(__dirname, '../src/components/card/basic-card.js')*/
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'customcomponents/[name].js',
  },
  optimization: {
    splitChunks: {
     //chunks: 'all',
     name: false
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [
      { from: Path.resolve(__dirname, '../src/assets'), to: 'customcomponents/assets' }
      ] }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
      inject: 'head',
      minify:false,
      skipAssets: ['customcomponents/app.**.js', 'customcomponents/custom-style.css']
    }),
    new HtmlWebpackSkipAssetsPlugin({
      
      skipAssets: ['customcomponents/app.**.js', 'customcomponents/custom-style.css']
  })
   
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
	extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
