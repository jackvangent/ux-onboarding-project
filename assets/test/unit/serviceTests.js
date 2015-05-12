describe('Tests controller methods that use $resource', function() {

	var LarsHoneytoast = {
		_id: 9123,
		firstName: 'Lars',
		lastName: 'Honeytoast',
		phone: '1239875647',
		email: 'lars@honey.toast'
	};
	var CliveBixby = {
		_id: 9123103,
		firstName: 'Clive',
		lastName: 'Bixby',
		phone: '8329102392',
		email: 'buzz@gmail.com'
	};
	var NewGuy = {
		firstName: 'New',
		lastName: 'Guy',
		phone: '1230815',
	};
	var userList = [LarsHoneytoast, CliveBixby];

	beforeEach(module('myApp'));
	beforeEach(inject(function(_$httpBackend_, _userFactory_) {
		$httpBackend = _$httpBackend_;
		userFactory = _userFactory_;
		getRequestHandler = $httpBackend.whenGET('http://localhost:24149/users').respond(userList);
		delRequestHandler = $httpBackend.whenDELETE('http://localhost:24149/users/9123').respond(userList[1]);
		postRequestHandler = $httpBackend.whenPOST('http://localhost:24149/users').respond(CliveBixby);
		putRequestHandler = $httpBackend.whenPUT('http://localhost:24149/users').respond(CliveBixby);
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('in ListController:', function() {

		beforeEach(inject(function($controller) {
			listScope = {};
			ListController = $controller('ListController', {
				$scope: listScope
			});
		}));

		it('should get the list of all users', function() {
			$httpBackend.expectGET('http://localhost:24149/users');
			userFactory.query();
			$httpBackend.flush();
		});

		it('should delete a single user', function() {
			$httpBackend.expectDELETE('http://localhost:24149/users/9123');
			listScope.setCurrent(LarsHoneytoast);
			spyOn(window, 'confirm').and.callFake(function() {
				return true;
			});
			listScope.deleteUser();
			$httpBackend.flush();
		});

	});

	describe('in EditController:', function() {

		beforeEach(inject(function($controller) {
			editScope = {};
			editScope.currentUser = {email: 'an@email.com'};
			editScope.currentUser.email = 'an@email.com';
			EditController = $controller('EditController', {
				$scope: editScope
			});
		}));

		it('should add a new user', function() {
			$httpBackend.expectPOST('http://localhost:24149/users');
			editScope.newPost(NewGuy);
			$httpBackend.flush();
		});

		it('should edit a user\'s info', function() {
			$httpBackend.expectPUT('http://localhost:24149/users');
			editScope.editUser(NewGuy);
			$httpBackend.flush();
		});

	});

});