const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.tsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.tsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader',
                // options: {
                //     presets: [
                //         '@babel/preset-react',
                //         'babel-preset-env'
                //     ]
                // }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed
        }),
        new htmlPlugin({
            template: './src/index.html',
        })
    ]
}
