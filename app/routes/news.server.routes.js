
var multer  = require('multer');
var upload = multer({ dest: './public/resources/' });

var newsController = require("../controllers/news.server.controller");

module.exports = function(app){
	app.route("/news").get(newsController.list).post(newsController.create);

	app.route("/news/:nid").get(newsController.get);

	app.route("/upload").post(newsController.upload);

	app.param("nid", newsController.getById);
};