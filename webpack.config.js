module.exports = {
  entry: ['babel-polyfill', './client/src/index.js'],
  output: {
    path: __dirname,
    filename: './client/public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
