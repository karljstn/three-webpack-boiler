const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    //first place webpack looks to start building the bundle
    entry: './src/js/index.js',
    //where to output the assets and bundles
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Karl Justiniano',
            //  favicon: path.resolve(__dirname, 'public/'),
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: './dist',
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.(glb|gltf|mp3)$/i,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src',
                    encoding: 'base64',
                },
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                use: ['raw-loader', 'glslify-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
}

module.exports = config
