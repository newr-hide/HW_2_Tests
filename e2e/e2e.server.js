const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev');

// Компилируем конфигурацию Webpack
const compiler = webpack(config);

// Создаем экземпляр WebpackDevServer
const server = new WebpackDevServer({
  ...config.devServer, // Используем параметры из конфигурации
  host: 'localhost',
  port: 9000,
  hot: true, 
}, compiler);

// Запускаем сервер
server.start();
console.log('Сервер запущен на http://localhost:9000');
if (process.send) {
  process.send('ok');
}

