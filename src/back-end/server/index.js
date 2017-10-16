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
import exphbs from 'express-handlebars';

//Config
import config from '../../config';

//webpack configuration
import webpackConfig from '../../../webpack.config.babel';

//API
import scrapApi from '../routes/scrappromise';
import searchApi from '../routes/search';

// Helpers
import * as hbsHelper from '../../lib/handelbars';

//Utils
import {
    isMovile
} from '../../lib/utils/device';

//Enviroment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isDevelopment = process.env.NODE_ENV !== 'production';

//Express app
const app = express();

//public
app.use(express.static(path.join(__dirname, '../../front-end/public')));

//Handlebars setup
app.engine(config.views.engine, exphbs({
    extname: config.views.extension,
    helpers: hbsHelper
}));

//View Engine Setup
app.set('views', path.join(__dirname, config.views.path));
app.set('view engine', '.hbs');

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

// Webpack compiler
const webpackCompiler = webpack(webpackConfig);

// Webpack middlewares
// if (isDevelopment) {
//     app.use(webpackDevMiddleware(webpackCompiler));
//     app.use(webpackHotMiddleware(webpackCompiler));
// }
    app.use(webpackDevMiddleware(webpackCompiler));
    app.use(webpackHotMiddleware(webpackCompiler));

// Device  detector
app.use((req, res, next) => {
    res.locals.isMobile = isMovile(req.headers['user-agent']);
    return next();
});

//API dispath
app.use('/api/search', searchApi);
app.use('/api/scrap', scrapApi);


//Sending  trafic to react
app.get('/', (req, res) => {
    res.render('frontend/index', {
        layout: false
    })
});

// Iniciar servidor
app.listen(config.serverPort, err => {
    if (!err) {
        open(`${config.baseUrl}`);
    }
});