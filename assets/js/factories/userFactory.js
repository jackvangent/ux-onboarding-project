myApp.factory('userFactory', function($resource) {
	return $resource('http://localhost:24149/users/:id', {}, {
		list: {
			method: 'GET',
			isArray: true
		},
		create: {
			method: 'POST'
		},
		update: {
			method: 'PUT',
			params: { id:'@id' }
		},
		get: {
			method: 'GET'
		},
		delete: {
			method: 'DELETE',
			params: { id:'@id' }
		}
	});
});