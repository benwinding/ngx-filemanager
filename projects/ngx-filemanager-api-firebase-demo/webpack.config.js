var path = require('path');

const srcDir = path.resolve(__dirname, 'src');

console.log('Source path: ', srcDir);

module.exports = {
  mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       use: 'ts-loader',
  //       exclude: /node_modules/
  //     }
  //   ]
  // },
  // resolve: {
  //   extensions: [ '.tsx', '.ts', '.js' ]
  // },
  // entry: path.resolve(__dirname, 'src/index.ts'),
  context: srcDir,
  // entry: path.resolve(__dirname, 'projects/ngx-filemanager-api-demo/src/index.ts'),
  // output: {
    // path: path.resolve(__dirname, 'dist/ngx-filemanager-api-demo'),
    // filename: 'main.js'
  // },
  devtool: 'eval',
};