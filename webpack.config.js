const path = require('path');
const nodeExternals = require('webpack-node-externals');

const appConfig = {
  mode: 'production',
  target: 'web',
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: [/\.ts$/],
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  }
};

const serverConfig = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true
  },
  externals:[ nodeExternals() ],
  entry: {
    server: './src/server.ts'
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: [/\.ts$/],
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  }
};

module.exports = [appConfig , serverConfig];
