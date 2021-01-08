var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
var logger = require('morgan')
var userroute = require('./routes/file')

app.use(cookieParser());

app.use(logger('dev'));

var mongourl = "mongodb://localhost:27017/express"
mongoose.connect(mongourl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => { if (!err) { console.log('conected to mongodb..') } else { console.log(err.message) } });

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var port = 3000;


// app.get('/', (req, res) => {

//     res.send("hello ")

// })

app.use('/user', userroute)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})