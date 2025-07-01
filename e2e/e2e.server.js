const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const server = new WebpackDevServer(webpack(config), {});
server.listen(9000, 'localhost', (err) => {
  if (err) {
    console.error('Ошибка запуска сервера:', err);
    throw err;
  }
  if (process.send) {
    process.send('ok');
  }
});
