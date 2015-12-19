/* 找到模块.把控制器附加给模块 */
angular.module("webapp").controller("newsController", ["$scope", "newsService", '$sce', NewsController]);

function NewsController($scope, newsService, $sce){
	$scope.list = [];
	$scope.current = {};
	$scope.news = {};

	$scope.save = function(){
		if (!$scope.news.title) {
			$scope.editorMessage = "Title is required";
			return;
		}

		$scope.news.content = $("#editor").val();
		console.log($scope.news.content);

/*   使用textearea, 现个改为simditor使用上面赋值
		if (!$scope.news.content) {
			$scope.editorMessage = "Content is required";
			return;
		}
*/

		$scope.editorMessage = "";

		newsService.save($scope.news).then(function(data){
			$("#modal-editor").modal("hide");
			$scope.loadNews();
		}, function(err){
			$scope.editorMessage = err;
		});
	}

	$scope.createNews = function(){
		
		$("#modal-editor").modal("show");
	}

	$scope.openNewsDetail = function(id){
		$scope.loadDetail(id);
		$("#modal-detail").modal("show");
	}

	$scope.loadDetail = function(id){
		newsService.detail(id).then(function(data){
			//取消对html转义
			data.content = $sce.trustAsHtml(data.content);
			$scope.current = data;
		}, function(err){});
	}

	$scope.formatTime = function(time){
		return moment(time).format("l");
	}

	$scope.loadNews = function(){
		newsService.list().then(
				function(data){
					$scope.list = data;
				},
				function(err){}
			);
	}

	$scope.loadNews();  //一访问端口便执行查询所有操作
}