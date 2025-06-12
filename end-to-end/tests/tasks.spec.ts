import { test, expect } from '@playwright/test';

test('Login Loaded', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const title = page.getByText('Oracules Manager');
  await expect(title).toBeVisible();
});