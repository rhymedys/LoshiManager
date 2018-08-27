const path = require('path');
const webpack = require('webpack');

console.log(process.env.NODE_ENV);

const config = {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      extraBabelPlugins: ['transform-remove-console'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    '@': path.resolve(__dirname, 'src'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
    filename: process.env.NODE_ENV === 'production' ? '../loshi/index.ejs' : 'index.html',
  },
  disableDynamicImport: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/public/loshi/' : '/',
  hash: true,
  outputPath: path.resolve(__dirname, 'public/loshi'),
};

export default config;
