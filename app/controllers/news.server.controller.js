var mongoose =  require("mongoose");
var News = mongoose.model("News");

module.exports = {
	create: function(req, res, next){
		var news = new News(req.body);
		news.save(function(err){
			if(err) return next(err);

			return res.json(news);
		});
	},

	list: function(req, res, next){
		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;

		News.find().skip((pagestart-1) * pagesize).limit(pagesize).exec(function(err, docs){
			if(err) return next(err);
			return res.json(docs);
		});
	},

	getById: function(req, res, next, id){
		if(!id) return next(new Error("Not Found"));

		News.findOne({_id: id}).exec(function(err, doc){
			if(err) return next(err);

			if(!doc) return next(new Error("News Not Found"));

			req.news = doc;
			return next(); 
		});
	},

	get: function(req, res, next){
		return res.json(req.news);
	},

	upload: function(req, res, next){
		console.log("kkkkk===="+(typeof req.body));
		var object = Object.keys(req.body);
		console.log(object.length);
		console.log(req.body, req.query);

	}
	
};