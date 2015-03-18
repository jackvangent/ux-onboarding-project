myApp.controller('EditController', function($scope, userFactory, userService, $state) {

	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;

	$scope.phoneRegex = /^(\(?([0-9]{3})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	$scope.emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

	$scope.tab1 = false;
	$scope.tab2 = false;

	$scope.newPost = function(postData) {
		var post = new userFactory(postData);
		post.$create()
			.then(function() {
				userService.userList = userFactory.query();
			});
	};

	$scope.editUser = function(editData) {
		editData.email = $scope.currentUser.email;
		userFactory.update({id:userService.currentUser._id}, editData)
			.$promise.then(function() {
				userService.userList = userFactory.query();
			});
	};
});