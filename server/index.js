
//const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

// database 
const database = require('./config/database');
// routers
const usuariosRouter = require('./routes/usuario.router');
const negociosRouter = require('./routes/negocio.router');
const adminRouter = require('./routes/admin.router');
//mongo connection
database.mongoConnect();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//router 
app.use('api/users', usuariosRouter);
app.use('api/negocio', negociosRouter);
app.use('api/admin', adminRouter);



//cath 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

//eror handler
app.use((err, req, res,) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env' === 'develoment' ? err: {});

    // render the error page
    const CODE = 500
    res.status(err.status || CODE);
    res.render('error');
}); 

module.exports = app;

