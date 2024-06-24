// e2e/toConvert.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('Currency Conversion', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto('/');
    await context.route('https://api.freecurrencyapi.com/v1/currencies*', async (route) => {
      await route.fulfill({ json: {} });
      });
      
    await context.route('https://api.freecurrencyapi.com/v1/latest*', async (route) => {
      await route.fulfill({ json: {
          data: {
              USD: 1.0702396871
          }
      }});
    });
  });

  test('should convert currency correctly and add to history', async ({ page }) => {

    // Simulation de l'utilisateur de la sélection des devises et du montant
    await page.selectOption('select[name=deviseToConverter]', 'EUR');
    await page.selectOption('select[name=deviseConverter]', 'USD');
    await page.fill('input[name=priceToConverter]', '10');

    // Simulation du click du bouton
    await page.click('input[type=submit]');
    await page.waitForTimeout(1000)
    // Simulation de l'affichage du bon résultat
    const result = await page.inputValue("input[name=resultConvert][type=number]")
    expect(result).toBe('10.68649883')

    // Vérification de l'historique
    const history = await page.textContent('div#history .grid:last-child');
    expect(history).toContain('10'); 
    expect(history).toContain('EUR'); 
    expect(history).toContain('USD'); 
    expect(history).toContain('10.68649883'); 

    // Vérification  de la date
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()-1).padStart(2, '0');

    const formattedDate =  `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    expect(history).toContain(formattedDate); 
  });
});
