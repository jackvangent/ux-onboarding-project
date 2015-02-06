myApp.controller('MinimizeController', function($scope) {
	$scope.minimized = false;
	$scope.$watch('minimized', function() {
		$scope.buttonText = $scope.minimized ? 'expand' : 'collapse';
	})
});