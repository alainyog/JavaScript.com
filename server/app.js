path   = require('path');
config = require(path.join(__dirname, '..', 'config'));

// TODO Is there a better way we can do this?
if (config.server.environment === 'production') {
  baseURL = 'https://www.javascript.com/';
} else if (config.server.environment === 'staging') {
  baseURL = 'http://javascript.preschool.io/';
} else {
  baseURL = 'http://localhost:3000/';
}

var express        = require('express'),
    logger         = require('morgan'),
    session        = require('express-session'),
    passport       = require('passport'),
    expressSession = require('express-session'),
    redis          = require('redis'),
    redisStore     = require('connect-redis')(expressSession),
    methodOverride = require('methodOverride'),
    bodyParser     = require('bodyParser');

var app = module.exports = express();

app.set('trust proxy', true);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(require('flash')());

app.use(expressSession({
  store: new redisStore({
    client: redis.createClient(6379, config.server.redis, {})
  }),
  secret: config.server.cookieKey
}));

app.use(passport.initialize());
app.use(passport.session());

require('./lib/boot')(app, {
  verbose: config.server.environment === 'development'
});

app.use(function(err, res, next) {
  res.status(400).render('404', { url: req.originalUrl });
});

if (config.server.environment === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.render('error', {
      message: err.message,
      error:   err
    });
  });
}

module.exports = app;
