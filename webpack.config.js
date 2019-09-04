const path = require("path");
var nodeExternals = require("webpack-node-externals");
var webpack = require("webpack");
const RestSpreadTransform = require('babel-plugin-transform-object-rest-spread');

var browserConfig = {
  entry: ['./browser/index.js'],
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]

}

var serverConfig = {
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('./server'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js(x)?$/,
      use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['es2015', 'react'],
                      plugins: [require('babel-plugin-transform-object-rest-spread')]
                  }
              },
             }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}
module.exports = [browserConfig, serverConfig]
