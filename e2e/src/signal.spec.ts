import { test, expect } from '@playwright/test';

test.describe('Signal state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('each signal block starts dark', async ({ page }) => {
    const blocks = page.locator('.signal');
    for (const block of await blocks.all()) {
      await expect(block).toHaveClass(/dark/);
    }
  });

  test('clicking one signal block toggles only that block', async ({ page }) => {
    const blocks = page.locator('.signal');
    const first = blocks.nth(0);
    const second = blocks.nth(1);
    const third = blocks.nth(2);

    await first.click();

    await expect(first).toHaveClass(/light/);
    await expect(second).toHaveClass(/dark/);
    await expect(third).toHaveClass(/dark/);
  });

  test('clicking the same signal block twice returns it to dark', async ({ page }) => {
    const block = page.locator('.signal').first();

    await block.click();
    await expect(block).toHaveClass(/light/);

    await block.click();
    await expect(block).toHaveClass(/dark/);
  });

  test('signal blocks toggle independently', async ({ page }) => {
    const blocks = page.locator('.signal');
    const first = blocks.nth(0);
    const second = blocks.nth(1);

    await first.click();
    await second.click();

    await expect(first).toHaveClass(/light/);
    await expect(second).toHaveClass(/light/);

    await first.click();

    await expect(first).toHaveClass(/dark/);
    await expect(second).toHaveClass(/light/);
  });
});
