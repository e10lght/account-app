const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3008', // サーバーサイドのアプリがリッスンしているポート
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
