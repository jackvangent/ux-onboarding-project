myApp.factory('userService', function(userFactory) {

	return {
		currentUser: null,
		userSelected: false,
		userList: userFactory.query()
	}
});