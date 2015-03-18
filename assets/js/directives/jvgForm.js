myApp.directive('jvgForm', function() {
	return {
		require: 'ngModel',
		restrict: 'E',
		link: function(scope, element, attrs) {
			scope.makeTemplateUrl = function() {
				return 'assets/templates/forms/' + attrs.formType + 'Form.html';
			},
			scope.newUser = function(postData) {
				scope.newPost(postData);
			}
			scope.editCurrent = function(editData) {
				scope.editUser(editData);
			}
		},
		template: '<div ng-include="makeTemplateUrl()"></div>',
	}
});