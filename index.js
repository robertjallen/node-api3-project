// code away!
const app = require('./server');
var catMe = require('cat-me');
var colors = require('colors');

const PORT = 4000;

app.listen(PORT, () => {
  console.log(catMe('nyan').rainbow,` KATZ SERVING ON ${PORT}`)
});