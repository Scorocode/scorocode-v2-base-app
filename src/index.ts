import app from './app'

let listenPort;
process.argv.forEach((val, index, array) => {
  // required argument. DON'T EDIT
  if (val.startsWith('port=')) {
    listenPort = parseInt(val.replace('port=', ''), 10);
  }
});

console.log('node listenPort:', listenPort);

app.listen(listenPort, () => {
  console.log('node server listen port:', listenPort);
});

console.log('node server shutdown');
