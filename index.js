// code away!
const app = require('./server');
var catMe = require('cat-me')

const PORT = 4000;

app.listen(PORT, () => {
  console.log(catMe('nyan'),` KATZ SERVING ON ${PORT}`)
});