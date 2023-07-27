const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Buildtype
const TARGET = process.env.npm_lifecycle_event;

const devMode = process.env.NODE_ENV === 'development';

const outputDir = {
    development: 'dist/devOutput',
    production: 'dist',
};

const statsOutputSettings = {
    colors: true,
    chunks: false,
    modules: false,
};

const webpackConfig = {
    mode: devMode ? 'development' : 'production',
    devtool: 'source-map',
    entry: ['core-js', './src/index.js'],
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
    },
    stats: statsOutputSettings,
    devServer: {
        //stats: statsOutputSettings,
        static: path.join(__dirname, 'public'),
        historyApiFallback: true,
        hot: true,
        proxy: [
            {
                context: ['/api', '/internal', '/me', '/config'],
                target: 'http://localhost:8081',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': devMode ? '"development"' : '"production"',
            'process.env.CLIENT_VERSION': JSON.stringify(pkg.version) || '""',
            'process.env.REST_URL':
                '"http://d26jbsl01372.test.local:8443/ezbrev/rest"',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
        }),
        devMode && new ReactRefreshWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
            timers: require.resolve('timers-browserify'),
        },
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules/')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [devMode && 'react-refresh/babel'].filter(
                                Boolean,
                            ),
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader?{"globalVars":{"nodeModulesPath":"\'~\'", "coreModulePath":"\'~\'"}}',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // images
                test: /\.(ico|jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
};

// If dev build
if (TARGET === 'build-dev') {
    webpackConfig.output = {
        path: path.join(__dirname, outputDir.development),
        filename: 'bundle.js',
        publicPath: '/' + outputDir.development + '/',
    };
}

// If production build
if (TARGET === 'build') {
    webpackConfig.devtool = 'none';
    webpackConfig.output = {
        path: path.join(__dirname, outputDir.production),
        filename: 'bundle.js',
        publicPath: '/',
    };
}

module.exports = webpackConfig;
