import { test, expect } from '@playwright/test';

test.describe('FormNote E2E Test', () => {

  test('should add a new note', async ({ page }) => {
    await page.goto('/create');
    
    await page.fill('.input-title', 'Title test');
    await page.fill('textarea[name="content"]', 'Content test.');

    await page.click('.btn-submit');
    await page.click('.btn-accueil');
    await page.goto('/');

    const noteTitle = await page.textContent('.note-card>h2');

    expect(noteTitle).toBe('Title test');
  });

});
