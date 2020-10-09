const path = require('path')
// const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const commonConfig = require('./webpack.common.config.js')

// const appDirectory = fs.realpathSync(process.cwd())
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// const appTsConfig = resolveApp('jsconfig.json')
// const appSrc = resolveApp('src')
// const appPackageJson = resolveApp('package.json')

const devConfig = {
    devtool: 'inline-source-map',
    /* 入口 */
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', path.join(__dirname, 'src/index.js')],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'],
    },

    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'less-loader',
                        // options: {
                        //     modifyVars: {
                        //         'primary-color': '#1DA57A',
                        //         'link-color': '#1DA57A',
                        //         'border-radius-base': '2px',
                        //     },
                        //     javascriptEnabled: true,
                        // }, // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.css$/,
                /**
                 * css 不使用modules的原因是
                 * 1、打包antd的样式时，把antd的样式也打包为css modules 导致antd的样式失效
                 * 2、将本地的css文件作为全局样式使用，见 less/app.css 使用
                 * 3、css module 导致错误 'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]',
                 */
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        // port: '',
        host: '0.0.0.0', // 手机通过ip地址可访问
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                pathRewrite: { '^/api': '/api' },
                changeOrigin: true,
                // bypass: req => {
                //     if (req.headers && req.headers.referer)
                //         req.headers.referer = req.headers.referer.replace(
                //             /(.*\d+)(\/\w+)(.*)/g,
                //             ($1, $2, $3) => $2 + $3,
                //         )
                // },
            },
        },
        historyApiFallback: true,
        hot: true,
    },
    resolve: {
        // modules: ['node_modules'],
        // modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {
            src: path.join(__dirname, 'src'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
        }),
        // new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080',
        }),
    ],
}
module.exports = devConfig
// module.exports = merge(commonConfig, devConfig)
