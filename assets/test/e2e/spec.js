//spec.js
describe('ux onboarding app', function() {
	it('should have a title', function() {
		browser.get('http://0.0.0.0:8080/#/list');
		expect(browser.getTitle()).toEqual('User Profile');
	});
});