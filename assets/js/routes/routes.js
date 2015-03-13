myApp.config(function($stateProvider, $urlRouterProvider) {

	//Having trouble getting a default nested state to work, commented out stuff
	// is stuff I've tried

	$urlRouterProvider.otherwise('/profile');
	//$urlRouterProvider.when('/edit', '/edit/new'); //this only works on /edit page refresh

	$stateProvider
		.state('profile', {
			url: '/profile',
			templateUrl: 'assets/templates/profile.html'
		})
		.state('edit', {
			url: '/edit',
			templateUrl: 'assets/templates/edit.html',
			//abstract: true
			//params: {
			//	autoActivateChild: 'edit.new'
			//}
		})
		.state('edit.edituser', {
			//parent: 'EditProfileParent',
			url: '/existing',
			templateUrl: 'assets/templates/edituser.html'
		})
		.state('edit.new', {
			//parent: 'EditProfileParent',
			url:'/new',
			templateUrl: 'assets/templates/new.html'
		})
		.state('list', {
			url: '/list',
			templateUrl: 'assets/templates/list.html'
		})
});