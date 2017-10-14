//Dependencies
import webpack from 'webpack';
import path from 'path';
import chunksPlugin from 'webpack-split-chunks';

//Enviroment
process.env.NODE_ENV = 'production';
const isDevelopment = process.env.NODE_ENV !== 'production';
//Paths
const PATH = {
    index: path.join(__dirname, 'src/front-end/index.js'),
    bild: path.join(__dirname, '/src/front-end/public'),
    src: path.join(__dirname, 'src/front-end')
}


const getDevtool = () => 'cheap-module-eval-source-map';
const getEntry = () => {
    const entry = [
        PATH.index
    ];
    if (isDevelopment) {
        entry.push('webpack-hot-middleware/client?reload=true');
    }
    return entry;
};
const getOutput = () => ({
    path: PATH.bild,
    publicPath: '/',
    filename: '[name].bundle.js'
});

const getPlugins = () => {

    const plugins = []
    new chunksPlugin({
        to: 'vendor',
        test: /node_modules/
    });
    if (isDevelopment) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );
    } else {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                }
            })
        );
    }

    return plugins;
};

const getLoaders = () => ({
    loaders: [{
            test: /\.js?$/,
            loaders: ['babel-loader'],
            include: PATH.src
        },
        {
            test: /(\.css)$/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loaders: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
    ]
});

//Webpack config

export default {
    devtool: getDevtool(),
    entry: getEntry(),
    output: getOutput(),
    plugins: getPlugins(),
    module: getLoaders()
};