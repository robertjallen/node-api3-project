// code away!
require('dotenv').config();
var cors = require('cors')
const app = require('./server');
var catMe = require('cat-me');
var colors = require('colors');

app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(catMe('nyan').rainbow,` KATZ SERVING ON ${port}`)
});