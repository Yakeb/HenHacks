/// <reference types="react-scripts" />
declare module '*.txt' {
    const content: any;
    export default content;
  }
const path = require('path');

const config = {
  entry: './main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.tsx'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.ts?$/, loader: 'ts-loader' },
      { test: /\.css?$/, loader: 'css-loader' },
      { test: /\.html?$/, loader: 'html-loader' }
    ]
  }
};

module.exports = config;
