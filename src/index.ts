import conn from './models/conn'
import app from './app'

let listenPort: number;
process.argv.forEach((val, index, array) => {
  if (val.startsWith('port=')) {
    listenPort = parseInt(val.replace('port=', ''), 10);
  }
});

console.log('listenPort:', listenPort);

conn.initDefault().then((connection) => {

  console.log('server start...');

  app.listen(listenPort, () => {
    console.log('server listen port:', listenPort);
  });

  console.log('server shutdown');

}).catch(error => console.error(error));
