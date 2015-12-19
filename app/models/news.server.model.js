/* 命名规则: 实现新闻相关功能.后端文件.模型文件 */

var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
	title: String,
	content: String,
	createTime: {type: Date, default: Date.now}
});

var News = mongoose.model("News", NewsSchema);