var path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    app = express();

// enable logging
app.use(logger({
    format: config.logger
}));

// configure port
app.set('port', process.env.PORT || config.port);

// enable body parser
app.use(bodyParser());

// configure view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// configure routing
require('./routes')(app);

// start http server
app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));
