myApp.controller('ListController', function($scope, userService, userFactory, $state) {

	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;
	$scope.userList = userService.userList;

	$scope.setCurrent = function(user) {
		userService.currentUser = user;
		userService.userSelected = true;
		$scope.currentUser = user;
		$scope.userSelected = true;
	};

	$scope.toEditState = function() {
		$state.go('edituser');
	};

	$scope.toNewState = function() {
		$state.go('new');
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
			$scope.currentUser = null;
			$scope.userSelected = false;
		};
	};
});