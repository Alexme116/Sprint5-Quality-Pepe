import { test, expect } from '@playwright/test';

test('Login Loaded', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const title = page.getByText('Sign in to MyTodoList');
  await expect(title).toBeVisible();

  const emailInput = page.getByPlaceholder('Enter your email address');
  await expect(emailInput).toBeVisible();
});