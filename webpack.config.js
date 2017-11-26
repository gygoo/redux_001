const path = require('path');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const distDir = path.resolve(__dirname, 'dist');


console.log(distDir);

module.exports = {
    entry: "./index.js",
    output: {
        path: distDir,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {
                        minimize: true
                    }}
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        //new UglifyJSPlugin()
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     Popper: ['popper.js', 'default'],
        // })
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default']
        })
    ],
    devServer: {
        contentBase: distDir
    }
}