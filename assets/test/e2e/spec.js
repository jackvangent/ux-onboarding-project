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

	describe('tests for ui-router', function() {
		it('should initially load to list state', function() {
			expect(browser.getCurrentUrl()).toContain('list');
		});

		it('should switch to new state onclick of createButton, and go back to list state onclick of cancelBtn', function() {
			element(by.className('createButton')).click();
			expect(browser.getCurrentUrl()).toContain('new');
			element(by.id('cancelBtn')).click();
			expect(browser.getCurrentUrl()).toContain('list');
		});

		it('should switch to edit state onclick of editButton, and go back to list state onclick of cancelBtn', function() {
			element.all(by.className('editButton')).first().click();
			expect(browser.getCurrentUrl()).toContain('edit');
			element.all(by.id('cancelBtn')).first().click();
			expect(browser.getCurrentUrl()).toContain('list');
		});

		it('should switch to edit state onclick of editBtnLeft', function() {
			element.all(by.className('userRow')).first().click();
			element(by.id('editBtnLeft')).click();
			expect(browser.getCurrentUrl()).toContain('edit');
		});
	});

});