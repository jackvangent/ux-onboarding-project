describe('Tests simple controller methods', function() {

	beforeEach(module('myApp'));

	var mockUser = {
		firstName: 'Jane',
		lastName: 'Doe',
		phone: '3198301234',
		email: 'janedoe@gmail.com'
	};

	describe('for EditController:', function() {

		var EditController, ctrlScope;

		beforeEach(inject(function($controller, _userFactory_) {
			ctrlScope = {};
			EditController = $controller('EditController', {
				$scope: ctrlScope
			});
		}));

		it('should remove spaces and hyphens from a 10 digit phone number', function() {
			expect(ctrlScope.formatPhoneNumber('319 830-1628')).toEqual('3198301628');
		});

		it('should remove spaces and hyphens from a 7 digit phone number', function() {
			expect(ctrlScope.formatPhoneNumber('830 1628')).toEqual('8301628');
		});

		it('should be able to go to list state', inject(function($state) {
			state = $state;
			spyOn(state, 'go');
			ctrlScope.toListState();
			expect(state.go).toHaveBeenCalledWith('list');
		}));

	});

	describe('for ListController:', function() {

		var ListController, ctrlScope;

		beforeEach(inject(function($controller) {
			ctrlScope = {};
			ListController = $controller('ListController', {
				$scope: ctrlScope
			});
		}));

		it('should be able to go to edit state', inject(function($state) {
			state = $state;
			spyOn(state, 'go');
			ctrlScope.toEditState();
			expect(state.go).toHaveBeenCalledWith('edituser');
		}));

		it('should be able to go to new state', inject(function($state) {
			state = $state;
			spyOn(state, 'go');
			ctrlScope.toNewState();
			expect(state.go).toHaveBeenCalledWith('new');
		}));

		it('should be able to set a current user', inject(function(userService) {
			ctrlScope.setCurrent(mockUser);
			expect(ctrlScope.currentUser).toEqual(mockUser);
			expect(ctrlScope.userSelected).toBe(true);
			expect(userService.currentUser).toEqual(mockUser);
			expect(userService.userSelected).toBe(true);
		}));

		it('should be able to forget its current user', inject(function(userService) {
			ctrlScope.minimize();
			expect(ctrlScope.currentUser).toBe(null);
			expect(ctrlScope.userSelected).toBe(false);
			expect(userService.currentUser).toBe(null);
			expect(userService.userSelected).toBe(false);
		}));

	})

});