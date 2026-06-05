import { test, expect } from '@playwright/test';

test.describe('LocalStorage state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('container starts dark on initial load', async ({ page }) => {
    const container = page.locator('.local-storage');
    await expect(container).toHaveClass(/dark/);
  });

  test('container respects dark theme from localStorage on reload', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();
    await expect(page.locator('.local-storage')).toHaveClass(/dark/);
  });

  // BUG: AppComponent constructor always sets 'dark', overriding any existing localStorage value on reload
  test.fail('container respects light theme from localStorage on reload', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
    await expect(page.locator('.local-storage')).toHaveClass(/light/);
  });

  test('clicking the container toggles theme to light in localStorage', async ({ page }) => {
    const container = page.locator('.local-storage');

    await container.click();

    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');
  });

  test('clicking the container twice restores dark theme in localStorage', async ({ page }) => {
    const container = page.locator('.local-storage');

    await container.click();
    await container.click();

    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  // BUG: AppComponent constructor always sets 'dark', overriding any existing localStorage value on reload
  test.fail('light theme persists and renders correctly after reload', async ({ page }) => {
    const container = page.locator('.local-storage');

    await container.click();
    const themeAfterClick = await page.evaluate(() => localStorage.getItem('theme'));
    expect(themeAfterClick).toBe('light');

    await page.reload();

    await expect(page.locator('.local-storage')).toHaveClass(/light/);
  });

  test('localStorage state does not affect signal or subject blocks', async ({ page }) => {
    const container = page.locator('.local-storage');

    await container.click();

    for (const block of await page.locator('.signal').all()) {
      await expect(block).toHaveClass(/dark/);
    }
    for (const block of await page.locator('.subject').all()) {
      await expect(block).toHaveClass(/dark/);
    }
  });
});
