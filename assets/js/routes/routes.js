myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('list');

	$stateProvider
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