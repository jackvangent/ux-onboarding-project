myApp.controller('ListController', function($scope, userService, userFactory) {

	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;
	$scope.userList = userService.userList;
	
	/*getService.list()
		.then(function(result) {
			$scope.userList = result;
		});*/

	$scope.setCurrent = function(user) {
		userService.currentUser = user;
		userService.userSelected = true;
		$scope.currentUser = user;
		$scope.userSelected = true;
	};

	$scope.deleteUser = function() {
		if (confirm ("Are you sure you want to delete " + 
			$scope.currentUser.firstName + " " + $scope.currentUser.lastName + "?")) {
			userFactory.delete({id:userService.currentUser._id})
				.$promise.then(function() {
					$scope.userList = userFactory.query();
				});
			userService.currentUser = null;
			userService.userSelected = false;
		};
	};
});