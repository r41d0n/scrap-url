//Dependencies

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';




//webpack configuration
import webpackConfig from '../../../webpack.config.babel';

//Congig server 
const config = require('../config/config');

//Server port
const port = config.port;

//Enviroment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isDevelopment = process.env.NODE_ENV !== 'production';


//Express app
const app = express();

//public
app.use(express.static(path.join(__dirname, '../../front-end/public')));

// conectar a MongoDB
mongoose.connect(config.database);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token ");
    next();
});

//server routes
let scrap = require('../routes/scrappromise');
let search = require('../routes/search');

app.use('/search', search);
app.use('/promise', scrap);

// Webpack compiler
const webpackCompiler = webpack(webpackConfig);
// Webpack middlewares
if (isDevelopment) {
    app.use(webpackDevMiddleware(webpackCompiler));
    app.use(webpackHotMiddleware(webpackCompiler));
}

//Sending  trafic to react
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});




// Iniciar servidor
app.listen(port, err => {
    console.log('La magia esta en el puerto ' + port);
    console.log("esta en: ", process.env.NODE_ENV);
    if (!err) {
        open(`http://127.0.0.1:${port}`);
    }
});