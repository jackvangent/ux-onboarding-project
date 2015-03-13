myApp.controller('ProfileController', function($scope, userService) {
	
	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;

	$scope.minimized = false;
	$scope.$watch('minimized', function() {
		$scope.buttonText = $scope.minimized ? 'expand' : 'collapse';
	});

});