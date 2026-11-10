import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.js';

test('positive log in', async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.login('student', 'Password123');

	await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//);
	await expect(page.getByText(/congratulations|successfully logged in/i)).toBeVisible();
	await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});

test('negative log in with incorrect username', async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.login('incorrectUser', 'Password123');
	await loginPage.expectError('Your username is invalid!');
});

test('negative log in with incorrect password', async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.login('student', 'incorrectPassword');
	await loginPage.expectError('Your password is invalid!');
});
