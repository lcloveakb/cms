/**
* 根据当前系统变量来读取相应配置文件
* 在生产环境中配置系统变量让项目自己读取配置
*/

var config = null;

if(process && process.env && process.env.NODE_ENV) {  //用nodejs提供的全局变量process读取环境变量env
	config = require("./env/" + process.env.NODE_ENV );	
} else {  //没有设置环境变量 即开发环境
	config = require("./env/development.js");
}							

module.exports = config;