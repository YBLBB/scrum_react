const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@public':path.resolve(__dirname,'public'),
    '@static':path.resolve(__dirname,'src/static'),
    '@utils':path.resolve(__dirname,'src/utils'),
    '@redux':path.resolve(__dirname,'src/redux')
    // 添加你想要的别名路径...
  })
);
