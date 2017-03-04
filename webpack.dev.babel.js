import webpack from 'webpack';
import path from 'path';
const ignore = new webpack.IgnorePlugin(/\.svg$/);

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/app.js',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx', '.json']
  },
  output: {
    path: `${__dirname}/static/`,
    filename: 'bundle.js'
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
  plugins: [ignore],
  devServer: {
    historyApiFallback: true
  }
};
