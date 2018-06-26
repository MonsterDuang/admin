'use strict'

require('shelljs/global');
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ENV = process.env.NODE_ENV || 'local';

// new ExtractTextPlugin({
//     filename: '[name].[hash].css',
//     allChunks: true
// })
//只要不是dev都是生产
var isProduction = function () {
    return ENV !== 'local';
};

var styleCssPath = "style.css";
var entry = ['./src/js/main'],
    distDir = "/dist/",
    buildPath = __dirname + distDir,
    publishPath = "dist/";

//静态依赖组件，依赖了require没办法使用webpack打包
var assetsPath = path.join('dist', '/static');
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'src/js/libs/*', assetsPath);

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin(styleCssPath, {
        allChunks: true,
        disable: false
    }),
    new webpack.DefinePlugin({
        win_env:JSON.stringify(ENV),
    })
];

//编译输出路径
module.exports = {
    debug: false,
    entry: entry,
    output: {
        path: buildPath,
        filename: 'build.js',
        publicPath: publishPath,
        chunkFilename: "[name].build.js?[chunkhash]"
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            }

            , {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader", "css-loader?sourceMap!cssnext-loader")
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap!cssnext-loader")
            }, {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist/,
                loader: 'babel'
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: "file-loader?name=images/[hash].[ext]"
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/js/filters')
        }
    },
    plugins: plugins,
    devtool: isProduction() ? false : '#source-map'
};