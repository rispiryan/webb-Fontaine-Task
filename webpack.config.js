const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCSS = new ExtractTextPlugin("app.css");
const webpack = require("webpack");

const config = {
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        host: "0.0.0.0",
        inline: true,
        port: 3002
    },
    mode: "development",
    devtool: "source-map",
    entry: ["babel-polyfill", "./src/"],
    resolve: {
        extensions: [".js", ".jsx", ".css", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                loader: "url-loader?limit=5120&name=./images/[hash].[ext]"
            },
            {
                test: /\.(mp3)$/,
                loader: "file-loader"
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        ExtractCSS,
        new HtmlWebpackPlugin({
            title: "Webfontain Task",
            template: "index.ejs",
            hash: true
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;