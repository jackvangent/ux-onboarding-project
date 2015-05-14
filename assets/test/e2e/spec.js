describe('ux onboarding app', function() {

	beforeEach(function() {
		browser.get('http://0.0.0.0:8080');
	});

	describe('tests for ng-show and ng-hide', function() {
		it('should show user info and collapse listInfo onclick', function() {
			element.all(by.className('userRow')).first().click();
			expect(element.all(by.className('userRow')).first().isDisplayed()).toBeTruthy();
			expect(element(by.className('listInfo')).isDisplayed()).toBeFalsy();
		});

		it('should close user info and show listInfo onclick of close button', function() {
			element.all(by.className('userRow')).first().click();
			element(by.id('minButton')).click();
			expect(element(by.className('profileBox')).isDisplayed()).toBeFalsy();
			expect(element(by.className('listInfo')).isDisplayed()).toBeTruthy();
		});
	});

	//TODO: more ng-resource tests for all CRUD stuff, test forms, test filters

});