import { expect } from '@playwright/test';
import { loginSelectors } from '../selctors/seclotors.js';
import { Navigation } from './navigation.js';

export class LoginPage {
	constructor(page) {
		this.page = page;
		this.navigation = new Navigation(page);
		this.usernameInput = page.getByLabel(loginSelectors.username);
		this.passwordInput = page.getByLabel(loginSelectors.password);
		this.submitButton = page.getByRole('button', { name: loginSelectors.submitButton });
		this.errorMessage = page.locator(loginSelectors.errorMessage);
	}

	async goto() {
		await this.navigation.goToLoginPage();
	}

	async login(username, password) {
		await this.usernameInput.pressSequentially(username, { delay: 90 });
		await this.waitRandomly();
		await this.passwordInput.pressSequentially(password, { delay: 90 });
		await this.waitRandomly();
		await this.submitButton.click();
	}

	async waitRandomly() {
		const waitMs = 250 + Math.floor(Math.random() * 401);
		await this.page.waitForTimeout(waitMs);
	}

	async expectError(message) {
		await expect(this.errorMessage).toHaveText(message);
	}
}
