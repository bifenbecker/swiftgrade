/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
require('dotenv').config();

const rawEnvVars = Object.keys(process.env)
  .filter(key => /^/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key]; // eslint-disable-line no-param-reassign
      return env;
    },
    {
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  );
const StringifiedEnvVars = {
  'process.env': Object.keys(rawEnvVars).reduce((env, key) => {
    env[key] = JSON.stringify(rawEnvVars[key]); // eslint-disable-line no-param-reassign
    return env;
  }, {}),
};

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules\/(?!(@tanstack)\/).*/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['absolute/path/a', 'absolute/path/b'],
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2|pdf)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin(StringifiedEnvVars),
    new webpack.ContextReplacementPlugin(/\.\/fs$/, /\.\/locale$/, 'empty-module', false, /js$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyPlugin([{ from: 'app/static_files', to: '' }]),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
