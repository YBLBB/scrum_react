const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
    entry: "./src/index",
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
        publicPath: '/',
    },

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port:  8080,
        hot: true,
        proxy: {
            '/api': 'http://localhost:7001',
        },
        historyApiFallback: true,
        client: {
            overlay: {
              errors: true,
              warnings: false,
            },
          },
        // magicHtml: true,
    },

    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                // MiniCssExtractPlugin.loader,
                'style-loader',
                "css-loader",
                // "./loader",
                // "postcss-loader",
                // {
                //     loader: "less-loader",
                // },
            ],
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            }
        },
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
        },],
    },
};

// module.exports = smp.wrap(config);
module.exports = config;