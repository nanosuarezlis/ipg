/**
 * Webpack configuration for the client.
 *
 * @typedef {Object} WebpackClientConfig
 * @property {string} entry - The entry point for the application.
 * @property {string} mode - The mode for Webpack to run in, either "development" or "production".
 * @property {string} devtool - The devtool to use for generating source maps.
 * @property {Object} module - The module object for configuring loaders.
 * @property {Array} module.rules - An array of rules for the different types of files to load.
 * @property {Object} module.rules[] - A specific rule object.
 * @property {RegExp} module.rules[].test - The regex for files that match this rule.
 * @property {string} module.rules[].exclude - The path to exclude from this rule.
 * @property {Array} module.rules[].use - An array of loaders to use for this rule.
 * @property {Object} module.rules[].use[] - A specific loader object.
 * @property {string} module.rules[].use[].loader - The name of the loader to use.
 * @property {Object} module.rules[].use[].options - The options to pass to the loader.
 * @property {Array} module.rules[].use[].options.presets - An array of presets to pass to Babel.
 * @property {Object} module.rules[].use[].options.transpileOnly - Whether or not to only transpile (no type checking).
 * @property {Object} module.rules[].use[].options.extensions - An array of file extensions to resolve.
 * @property {Array} module.rules[].use[].options.fallback - An object containing fallback modules to use.
 * @property {Object} resolve - The resolve object for configuring file extensions and fallback modules.
 * @property {Array} resolve.extensions - An array of file extensions to resolve.
 * @property {Object} resolve.fallback - An object containing fallback modules to use.
 * @property {string} output.filename - The name of the output bundle.
 * @property {string} output.path - The path for the output bundle.
 * @property {Object} devServer - The devServer configuration object.
 * @property {string} devServer.static - The directory to serve static files from.
 * @property {boolean} devServer.open - Whether or not to open the app in the default browser.
 */

const path = require('path');

module.exports = {
  entry: './src/client/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      fs: false,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
    open: true,
  },
};
