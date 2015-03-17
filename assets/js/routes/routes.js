myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('list');

	$stateProvider
		.state('profile', {
			url: '/profile',
			templateUrl: 'assets/templates/profile.html'
		})
		.state('edituser', {
			url: '/edit',
			templateUrl: 'assets/templates/edituser.html'
		})
		.state('new', {
			url:'/new',
			templateUrl: 'assets/templates/new.html'
		})
		.state('list', {
			url: '/list',
			templateUrl: 'assets/templates/list.html'
		})
});