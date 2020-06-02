const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  mode: 'production',
  // devServer: {
  //   publicPath: '/build/',
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './client/index.html'
  //   })
  // ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}