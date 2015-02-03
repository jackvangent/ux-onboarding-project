myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/profile");
	$stateProvider
		.state('Profile', {
			url: "/profile",
			templateUrl: "assets/templates/userProf.html"
		})
		.state('EditProfile', {
			url: "/edit",
			templateUrl: "assets/templates/userEdit.html"
		})
		.state('UserList', {
			url: "/list",
			templateUrl: "assets/templates/userList.html"
		});
});