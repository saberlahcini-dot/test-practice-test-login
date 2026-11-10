export class Navigation {
	constructor(page) {
		this.page = page;
	}

	async goToLoginPage() {
		await this.page.goto('https://practicetestautomation.com/practice-test-login/');
	}
}