const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.common.config.js')

const publicConfig = {
    devtool: 'cheap-module-source-map',
    // entry: {
    // 	app: [path.join(__dirname, 'src/index.js')],
    // 	vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    // },
    // output: {
    // 	path: path.join(__dirname, './dist'),
    // 	filename: '[name].[chunkhash].js',
    // 	chunkFilename: '[name].[chunkhash].js',
    // 	publicPath: '/'
    // },
    module: {
        rules: [
            // {
            // 	test: /\.js$/,
            // 	use: ['babel-loader'],
            // 	include: path.join(__dirname, 'src')
            // },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[name]-[local]-[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                        },
                    ],
                }),
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                // 将css打包到一个文件中
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                }),
            },
            // {
            // 	test: /\.(png|jpg|gif)$/,
            // 	use: [
            // 		{
            // 			loader: 'url-loader',
            // 			options: {
            // 				limit: 8192
            // 			}
            // 		}
            // 	]
            // }
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin({
        // 	filename: 'index.html',
        // 	template: path.join(__dirname, 'src/index.html')
        // }),
        // 提取公共库 react、react-dom等，减少主文件体积
        // new webpack.optimize.CommonsChunkPlugin({
        // 	name: 'vendor'
        // }),
        new UglifyJSPlugin(),
        // 注入全局变量 process.NODE_ENV
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        // vendor.xxx.js 优化缓存 保证每次修改文件打包后，vendor的hash值始终不变
        // new webpack.HashedModuleIdsPlugin(),
        // 避免打包后的filename的hash和chunkfileName的hash一样
        // new webpack.optimize.CommonsChunkPlugin({
        // 	name: 'runtime'
        // }),
        // 打包前删除dist文件夹下的内容
        new CleanWebpackPlugin(),
        // 将css打包到单独的css文件
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true,
        }),
    ],

    // resolve: {
    // 	alias: {
    // 		pages: path.join(__dirname, 'src/pages'),
    // 		component: path.join(__dirname, 'src/component'),
    // 		router: path.join(__dirname, 'src/router'),
    // 		actions: path.join(__dirname, 'src/redux/actions'),
    // 		reducers: path.join(__dirname, 'src/redux/reducers')
    // 	}
    // }
}
module.exports = merge(commonConfig, publicConfig)
