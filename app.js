var http = require('http'),
    path = require('path'),
    express = require('express'),
    ejs = require('ejs-locals'),
    config = require('./config'),
    app = express();

// configure environment
app.use(express.logger(config.logger));
app.set('port', process.env.PORT || config.port);

// configure view engine
app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// configure express
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// configure routing
app.use(app.router);
require('./routes')(app);

// start http server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
