const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new GenerateSW(),
    new WebpackPwaManifest({
      name: 'Text Editor',
      short_name: 'Editor',
      description: 'A simple text editor PWA',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('icons'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};

