var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var routes = require('./routes/routes');
var fs = require('fs');
var app = express();

//load app settings
var settingsFile = (app.get('env') === 'production')? 'prod.josn': 'dev.json';
var settings = JSON.parse(fs.readFileSync(path.join(__dirname, './config/', settingsFile),'utf8'));

var bridge = require('./lib/manager-bridge')(settings.bridge);

app.set('settings', settings);
app.set('port', process.env.PORT || 3000);
app.set('bridge', bridge);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api',routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/views/', 'index.html'));
});


if (app.get('env') === 'production') {

  // Production error handler
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('SCT listening on ' + app.get('port'));
});

module.exports = app;
