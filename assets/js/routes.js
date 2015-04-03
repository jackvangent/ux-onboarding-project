myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('list');

	$stateProvider
		.state('edituser', {
			url: '/edit',
			templateUrl: 'templates/edituser.html'
		})
		.state('new', {
			url:'/new',
			templateUrl: 'templates/new.html'
		})
		.state('list', {
			url: '/list',
			templateUrl: 'templates/list.html'
		})
});