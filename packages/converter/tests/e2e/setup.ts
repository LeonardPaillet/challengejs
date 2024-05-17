import { test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
await context.route('https://api.freecurrencyapi.com/v1/currencies*', async (route) => {
await route.fulfill({ json: {} });
});

await context.route('https://api.freecurrencyapi.com/v1/latest*', async (route) => {
await route.fulfill({ json: {} });
});

const fakeNow = new Date(2024, 4, 15, 13, 30, 48).valueOf();

await context.addInitScript(`{
  Date.now = () => {
    return ${fakeNow};
  }
  Date = class extends Date {
    constructor(...args) {
      (args.length === 0) ? super(${fakeNow}) : super(...args)
    }
  }
}`);
});