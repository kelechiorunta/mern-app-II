var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientRouter = require('./routes/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname)
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle all other routes by serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// app.post('/', (req, res) => {
//   fs.readFile(path.join(__dirname, 'client/build/clients.json'), (err, data) => {
//       if (data && !err) {
//           var parsedData = JSON.parse(data)
//           parsedData.push(req.body)
//           console.log(parsedData)
//           fs.writeFile(path.join(__dirname, 'client/build/clients.json'), JSON.stringify(parsedData, null, 2), (err) => {
//               if (err) {
//                   return res.status(500).json({msg: "Unable to save"})
//               }
//                   return res.status(200).json({msg:"Saved successfully"})
              
//           })
//       }else{
//           var parsedData = []
//           parsedData.push(req.body)
//           console.log(parsedData)
//           fs.writeFile(path.join(__dirname, 'client', 'build', 'clients.json'), JSON.stringify(parsedData, null, 2), (err) => {
//               if (err) {
//                   return res.status(500).json({msg: "Unable to save"})
//               }
//                   return res.status(200).json({msg:"Saved successfully"})
              
          
//       })
//   }
//   })
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/client', clientRouter);

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



module.exports = app;
