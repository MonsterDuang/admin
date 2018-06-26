'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080', "webpack/hot/dev-server");
// config.entry.unshift('webpack-dev-server/client?http://192.168.0.172:2388', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());


// 这里配置：请求http://localhost:9090/api，
// 相当于通过本地node服务代理请求到了http://xxx.com/api
var proxy = [{ 
     path: "/ac-core/*",
     //target: "http://47.106.104.156:80/api",
     target: "http://192.168.0.172:2388",
     //host: "47.106.104.156:80/api"
     //target: "http://aworld.cn",
     //host: "47.106.104.156:80/api"
     host: "192.168.0.172:2388"
     //host: "aworld.cn"
}];

var port = '8080';
//启动服务
var app = new WebpackDevServer(webpack(config), {
    // publicPath: config.output.publicPath,
    publicPath: '/dist/',
    hot:true,
    historyApiFallback: true,
    proxy:proxy
});
app.listen(port);