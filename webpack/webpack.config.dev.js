const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'customcomponents/[name].chunk.js'
  },
  devServer: {
   inline: true,
	 contentBase: './mediaplayer/',
	 watchContentBase: true,
	 mimeTypes: {'text/vtt': ['webvtt']}
	 
	 
   /* hot: true*/
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'customcomponents/custom-style.css'
    })
  ],
  module: {
    rules: [
      
      {
       test: /\.(ts|js)$/,
        include: Path.resolve(__dirname, '../src'),
        use: {
		loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            '@babel/preset-typescript',
            ['@babel/preset-env', {
              loose: true,
              modules: false,
              targets: {
                browsers: [
                  'chrome >= 47',
                  'firefox >= 51',
                  'ie >= 11',
                  'safari >= 8',
                  'ios >= 8',
                  'android >= 4'
                ]
              }
            }]
          ],
		   plugins: [
            ['@babel/plugin-proposal-class-properties', {
              loose: true
            }],
            '@babel/plugin-proposal-object-rest-spread',
            {
              visitor: {
                CallExpression: function (espath) {
                  if (espath.get('callee').matchesPattern('Number.isFinite')) {
                    espath.node.callee = importHelper.addNamed(espath, 'isFiniteNumber', path.resolve('src/polyfills/number-isFinite'));
                  }
                }
              }
            }
          ]
		}
		}
      },
      {
        test: /\.s?css$/i,
        // Enable below option If you want to Embed CSS internally in JS file
        //use: ['css-loader?sourceMap=true', 'sass-loader']
        use: [MiniCssExtractPlugin.loader,'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  }
});
