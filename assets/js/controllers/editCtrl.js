myApp.controller('EditController', function($scope, userFactory, userService, $state) {

	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;

	$scope.phoneRegex = /^(\(?([0-9]{3})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	$scope.emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

	$scope.tab1 = false;
	$scope.tab2 = false;

	$scope.newPost = function() {
		var post = new userFactory($scope.postData);
		post.$create()
			.then(function() {
				userService.userList = userFactory.query();
			});
	};

	$scope.editUser = function() {
		$scope.editData.email = $scope.currentUser.email;
		userFactory.update({id:userService.currentUser._id}, $scope.editData)
			.$promise.then(function() {
				userService.userList = userFactory.query();
			});
	};
});