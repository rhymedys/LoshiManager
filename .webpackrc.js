const path = require('path');
const webpack = require('webpack')

console.log(process.env.NODE_ENV)

const config ={
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production:{
      extraBabelPlugins: ['transform-remove-console']
    }
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    '@':path.resolve(__dirname,'src')
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
    filename:process.env.NODE_ENV === 'production' ?'../dist/index.ftl':'index.html'
  },
  disableDynamicImport: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/ip-healthmanager-manager-web/admin/static/'
  : '/',
  hash: true,
  proxy:{
    '/loshi/api/login':{
      "target": "http://127.0.0.1:7001/",
      "changeOrigin": true,
      "pathRewrite": { "^localhost:8000" : "" }
    }
  }
};



export default config
