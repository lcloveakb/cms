/**
* 导出服务器实例
*/

var express = require("express");
var bodyParser = require("body-parser");   //中间件-POST解析器

module.exports = function(){
	console.log("express init");
	var app = express();

	/* 使用中间件 */
	app.use(bodyParser.json())  //以json传入数据
	require("../app/routes/news.server.routes")(app);
	app.use(express.static("./public")); //中间件方式添加一个目录

	/* 屏蔽错误请求 */
	app.use(function(req, res, next){
		res.status(404);
		try {  //防止重复发送
			return res.json("Not Found.......");
		}catch(e) {
			console.log("404 set header after sent");
		}
	});

	app.use(function(err, req, res, next){
		if(!err){ return next();}
			res.status(500);
		try {  //防止重复发送
			return res.json(err.messags || "server error")
		}catch (e){
			console.log("500 set header after sent")
		}
	});

	return app;
}