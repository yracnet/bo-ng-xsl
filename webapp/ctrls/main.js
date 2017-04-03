app.controller('MainCtrl', function ($scope) {
	$scope.page = 'panel.html';
	$scope.name = 'World';
	$scope.form = {};
	$scope.refresh = function () {
		$scope.pageInclude = '/views/' + $scope.page + '?id=' + new Date();
	};
	$scope.refresh();
});

