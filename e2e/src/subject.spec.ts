import { test, expect } from '@playwright/test';

test.describe('Subject/Service state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('each subject block starts dark', async ({ page }) => {
    const blocks = page.locator('.subject');
    for (const block of await blocks.all()) {
      await expect(block).toHaveClass(/dark/);
    }
  });

  test('clicking one subject block toggles all subject blocks', async ({ page }) => {
    const blocks = page.locator('.subject');
    const first = blocks.nth(0);

    await first.click();

    for (const block of await blocks.all()) {
      await expect(block).toHaveClass(/light/);
    }
  });

  test('clicking a subject block twice returns all to dark', async ({ page }) => {
    const blocks = page.locator('.subject');
    const first = blocks.nth(0);

    await first.click();
    await first.click();

    for (const block of await blocks.all()) {
      await expect(block).toHaveClass(/dark/);
    }
  });

  test('toggling from any subject block affects all others', async ({ page }) => {
    const blocks = page.locator('.subject');
    const second = blocks.nth(1);
    const third = blocks.nth(2);

    await third.click();
    await expect(second).toHaveClass(/light/);

    await second.click();
    await expect(third).toHaveClass(/dark/);
  });

  test('subject blocks do not affect signal blocks', async ({ page }) => {
    const subjectBlock = page.locator('.subject').first();
    const signalBlocks = page.locator('.signal');

    await subjectBlock.click();

    for (const block of await signalBlocks.all()) {
      await expect(block).toHaveClass(/dark/);
    }
  });
});
