require('rootpath')();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var mongoose   = require('mongoose');
// mongoose.connect(''); // connect to our database
var router = express.Router();
var app = express();
const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/app', express.static('./fr_src/'));
app.get('/app/*', (req, res) => res.sendfile('index.html',
 	{root: path.join(__dirname,'./fr_src/')}));

   app.get('/', function (req, res) {
    return res.redirect('/app');
  }); 

  //APi Route
var pdfRoute = require('./bk_src/pdfApi/pdf.route');
app.use('/api/pdf', pdfRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err.inner);}

});




app.listen(PORT, () => console.log('Magic happens on port 3000'))


module.exports = app;
