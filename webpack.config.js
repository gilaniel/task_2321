const path = require('path');

const pathModules = path.resolve(__dirname);

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: path.resolve(__dirname),
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, './build/'),
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	watch: true,
	resolve: {
		modules: [pathModules,'node_modules'],
	},  
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{ 
				test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
		]
	},
	plugins: [
    new MiniCssExtractPlugin()
  ],
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
	},
	devtool: 'source-map'
};
