const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/instagram.js"
    },
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    stats: "only-error",
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(jpeg|jpg|png|svg|ico|psd|pdf)$/,
                use: ["file-loader"]
            }
        ]
    }
}