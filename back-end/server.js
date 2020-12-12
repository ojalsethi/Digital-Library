var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');

var cors = require('cors');

// Routes for Books
var bookrouter = require('./routers/bookRoutes');

// Routes for Users
var userrouter = require('./routers/userRoutes');

//Routes for Notifications
var notifirouter = require('./routers/notificationRoutes');

const config = require('./config/database');

mongoose.connect(config.database);

// db connection status
mongoose.connection
    .on('connected', () => {
        console.log('connected to database : ' + config.database);
    })
    .on('error', (error) => {
        console.log('error on connecting to database: ' + error);
    });

var app = express();

// Morgan to log all requests 
app.use(logger('dev'));

// CORS Middleware
app.use(cors());

// Body-parser Middleware
// parse application/x-www-form-urlencoded: use x-www-form-urlencoded for parsing data
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());


// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
app.use('/api', bookrouter);
app.use('/user', userrouter);
app.use('/notification', notifirouter);


app.listen(port, function () {
    console.log('server is running on port : ' + port);
});

module.exports = app; // for testing