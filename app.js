var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routers/item');

var app = express();

var PORT = 8080;

mongoose.connect('mongodb://halvarado:halvarado@ds119585.mlab.com:19585/evercheck-test-hernando-alvarado');
// mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', itemRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
