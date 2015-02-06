var dotenv = require('dotenv');
var test = dotenv.load();

var http     = require('http'),
    fs       = require('fs'),
    yaml     = require('js-yaml'),
    path     = require('path'),
    config   = require('./config'),
    express  = require('express'),
    passport = require('passport'),
    session  = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose');

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);

app.set('port', process.env.PORT || 9000);

app.use(session({
  secret: config.secrets.session,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/../public')));

app.use('/api/users', require('./api/user'));
app.use('/auth', require('./auth'));

// app.get('/api/languages', function (req, res) {
//   var doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'languages.yml'), 'utf8'));
//   res.status(200).json(doc);
// });

app.all('*', function (req, res) {
  res.sendFile('index.html', { root: __dirname + '/../public/' });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server running on port ' + app.get('port'));
});
