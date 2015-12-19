/**
* Angular service部分 
* 所有与服务器通讯操作
* 
*/

/* 导入主模块.找到service("名字",[依赖注入列表]) */
angular.module("webapp").service("newsService", ["$http", "$q", NewsService]);

/*   */
function NewsService($http, $q){
	/* 公用方法 处理所有与服务器请求相关 */
	function handleRequest(method, url, data){
		var defered = $q.defer();
		var config = {
			method: method,
			url: url
		};

		if("POST" === method){
			config.data = data;
		}else if("GET"=== method){
			config.params = data;
		}

		/* 发起请求 */
		$http(config).success(function(data){
			defered.resolve(data);
		}).error(function(err){
			defered.reject(err);
		});
		return defered.promise;
	}

	/* 方法 */
	return {
		list: function(params){
			return handleRequest("GET", "/news", params);
		},
		save: function(data){
			return handleRequest("POST", "/news", data);
		},
		detail: function(id){
			return handleRequest("GET", "/news/" + id);
		}
	}	

}
