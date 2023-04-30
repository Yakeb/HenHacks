/// <reference types="react-scripts" />
declare module '*.txt' {
    const content: string;
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
      { test: /\.txt/, use: 'raw-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ]
  }
};

module.exports = config;