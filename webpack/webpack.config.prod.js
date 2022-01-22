const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
 /* devtool: 'source-map',*/
  stats: 'errors-only',
  bail: true,
  output: {
   
    filename: 'customcomponents/[name].js',
    chunkFilename: 'customcomponents/[name].js'
   /* filename: 'customcomponents/[name].[chunkhash:8].js',
    chunkFilename: 'customcomponents/[name].[chunkhash:8].chunk.js'*/
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
	  new Webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'customcomponents/custom-style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
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
			'babel-plugin-transform-remove-console',
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
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
