var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var cleanBuild = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');

// References the applications root path
var ROOT_PATH = path.resolve(__dirname);

// Sets the variable as
// either development or production
var ENV = process.env.NODE_ENV || 'development';

// Holds the common settings for any environment
var commonSettings = {
	// path.resolve - resolves to an absolute path
	// This is the path and file of our top level
	// React App that is to be rendered.
	entry: [
		path.resolve(ROOT_PATH, 'src/client/App.jsx')
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
  },
	output: {
		// Sets the output path to ROOT_PATH/dist
		path: path.resolve(ROOT_PATH, 'dist'),
		// Sets the name of the bundled application files
		// Additionally we can isolate vendor files as well
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		  {
        test: /\.scss$/,
        include: path.resolve(ROOT_PATH, 'src'),
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        )
		  }
		]
	},
	plugins: [
		// Cleans the Dist folder after every build.
		// Alternately, we can run rm -rf dist/ as
		// part of the package.json scripts.
		new cleanBuild(['dist']),
		new ExtractTextPlugin('styles.css')
	]
};

/**
 * DEVELOPMENT ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional development specific settings.
 *
**/
// Need to configure webpack-dev-server and hot-reload
// module correctly.
if (ENV === 'development') {
	module.exports = merge(commonSettings, {
		devtool: 'eval',
		entry: [
	    'webpack-dev-server/client?http://localhost:3000',
	    'webpack/hot/only-dev-server',
	    path.resolve(ROOT_PATH, 'src/client/App.jsx')
	  ],
	  plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()
	  ],
	  resolve: {
	    extensions: ['', '.js', '.jsx', 'scss']
	  },
		module: {
			loaders: [
				{
			    test: /\.jsx?$/,
			    exclude: /(node_modules|bower_components)/,
			    include: path.resolve(ROOT_PATH, 'src'),
			    loaders: ['react-hot', 'babel']
			  }
			]
		}
	});
}

/**
 * PRODUCTION ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional production specific settings.
 *
**/
if (ENV === 'production') {
	module.exports = merge(commonSettings, {
		devtool: 'source-map',
		module: {
			loaders: [
				{
			    test: /\.jsx?$/,
			    exclude: /(node_modules|bower_components)/,
			    include: path.resolve(ROOT_PATH, 'src'),
			    loaders: ['babel']
			  }
			]
		},
		plugins: [
			// Minification (Utilized in Production)
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	});
}