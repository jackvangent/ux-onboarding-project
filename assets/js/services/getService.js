myApp.factory('getService', function($q, userFactory) {

	//This file is not necessary with the way the app currently works

	function getUsers() {
		return userFactory.list().$promise;
	}

	return {
		list: getUsers
	};
});