const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: [
    // SCSS
    `${paths.assets}/styles/index.css`,
    // JS
    `${paths.src}/index.js`,
  ],

  resolve: {
    alias: {
      src: paths.src,
      app: paths.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: '',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      favicon: `${paths.assets}/favicon.ico`,
      template: `${paths.assets}/index.html`,
    }),
  ],

  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
        },
      },
    ],
  },
};
