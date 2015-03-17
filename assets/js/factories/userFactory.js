myApp.factory('userFactory', function($resource) {
	return $resource('http://localhost:24149/users/:id', {}, {
		create: {
			method: 'POST'
		},
		update: {
			method: 'PUT',
			params: { id:'@id' }
		}
	});
});