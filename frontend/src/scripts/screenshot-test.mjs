import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Log console messages
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', error => console.log('ERROR:', error.message));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });

  console.log('Waiting for content...');
  await page.waitForTimeout(5000);

  console.log('Taking screenshot...');
  await page.screenshot({
    path: './screenshots/home-test.png',
    fullPage: true
  });

  console.log('Screenshot saved!');
  await browser.close();
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
