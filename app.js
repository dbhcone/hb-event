require('dotenv/config')
var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./routes/auth');
const publisher = require('./routes/publisher/adSpace');
const advertiser = require('./routes/advertiser/ads');
const contactus = require('./routes/contactus');
const marketPlace = require('./routes/marketPlace');
const anad = require('./routes/anad');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('^(?!/api/)', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', auth);
app.use('/api/marketplace', marketPlace);
app.use('/api/publisher', publisher);
app.use('/api/advertiser', advertiser);
app.use('/api/fetch', anad);
app.use('/api/', contactus);

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
});

try {
    mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false}, (err)=>{
      if(err){
        console.log({error: err.message});
      }else{
      console.log("Database Connection Successful");
      }
    })
} catch (error) {
  console.log(error);
}

module.exports = app;
