describe('Tests for controllers', function() {

	beforeEach(module('myApp'));

	var mockUser = {firstName: 'Jane', lastName: 'Doe', phone: '3198301234', email: 'janedoe@gmail.com'};

	describe('Tests for EditController', function() {

		var EditController, ctrlScope, userFactory;

		beforeEach(inject(function($rootScope, $controller, _userFactory_) {
			ctrlScope = {};
			EditController = $controller('EditController', { $scope: ctrlScope });
			userFactory = _userFactory_;
		}));

		it('should remove spaces and hyphens from a 10 digit phone number', function() {
			expect(ctrlScope.formatPhoneNumber('319 830-1628')).toEqual('3198301628');
		});

		it ('should remove spaces and hyphens from a 7 digit phone number', function() {
			expect(ctrlScope.formatPhoneNumber('830 1628')).toEqual('8301628');
		});

		it ('should be able to go to list state', inject(function($state) {
			state = $state;
			spyOn(state, 'go');
			ctrlScope.toListState();
			expect(state.go).toHaveBeenCalled;
		}));

		//add user
		// it ('should add a user', function() {
		// 	spyOn(userFactory, 'create');
		// 	ctrlScope.newPost(mockUser);
		// 	expect(userFactory.create).toHaveBeenCalled();
		// });

		//edit user

	});

	describe('Tests for ListController', function() {

		var ListController, ctrlScope;

		beforeEach(inject(function($rootScope, $controller) {
			ctrlScope = {};
			EditController = $controller('EditController', { $scope: ctrlScope });
		}));

	})

});