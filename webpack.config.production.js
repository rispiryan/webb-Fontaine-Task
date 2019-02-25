const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', "./src"],
    devtool: "",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"]
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 5120,
                    name: "./images/[hash].[ext]",
                }

            },
            {
                test: /\.(mp3)$/,
                loader: "file-loader"
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[hash].[ext]"
                }
            }
        ]
    },
    output: {
        chunkFilename: "js/[name]-chunk_[chunkhash].js",
        filename: `js/[name]_[chunkhash].js`,
        path: __dirname + "/public",
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true
    },
    plugins: [
        new CleanWebpackPlugin(['./public'], {allowExternal: true}),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            mode: process.env.NODE_ENV,
            title: "Webfontain Task",
            template: "index.ejs",
            hash: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
};
