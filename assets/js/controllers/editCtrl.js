myApp.controller('EditController', function($scope, userFactory, userService, $state) {

	$scope.userSelected = userService.userSelected;
	$scope.currentUser = userService.currentUser;


	$scope.phoneRegex = /^(\(?([0-9]{3})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	$scope.emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

	$scope.toListState = function() {
		$state.go('list');
	};

	$scope.newPost = function(postData) {
		postData.phone = $scope.formatPhoneNumber(postData.phone);
		var post = new userFactory(postData);
		post.$create()
			.then(function(newUser) {
				userService.userList.push(newUser);
				$scope.toListState();
				userService.currentUser = newUser;
			});
	};

	$scope.editUser = function(editData) {
		editData.phone = $scope.formatPhoneNumber(editData.phone);
		editData.email = $scope.currentUser.email;
		userFactory.update({id:userService.currentUser._id}, editData)
			.$promise.then(function() {
				var index = userService.userList.indexOf($scope.currentUser);
				var editMe = userService.userList[index];
				editMe.firstName = editData.firstName;
				editMe.lastName = editData.lastName;
				editMe.phone = editData.phone;
				userService.userList[index] = editMe;
				$scope.toListState();
			});
	};

	$scope.formatPhoneNumber = function(phoneNumber) {
		//removes spaces and hyphens from phone number before storage
		return phoneNumber.replace(/ |-/g, '')
	};
});