import webpack from 'webpack'

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    `${__dirname}/src/app.js`
  ],
  output: {
    path: `${__dirname}/static/`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: 'style-loader!css-loader!sass-loader?cacheDirectory'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        ENV: '"production"'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}
