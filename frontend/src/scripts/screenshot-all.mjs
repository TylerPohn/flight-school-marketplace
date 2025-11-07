import { chromium } from '@playwright/test';

const pages = [
  { url: 'http://localhost:5173/', name: '1-home-directory', waitFor: 'text=Flight School Directory' },
  { url: 'http://localhost:5173/schools/school-001', name: '2-school-profile', waitFor: 'text=AeroFlight Academy' },
  { url: 'http://localhost:5173/find-my-school', name: '3-ai-matching', waitFor: 'text=Find Your Perfect Flight School' },
  { url: 'http://localhost:5173/compare?schools=school-001,school-002,school-003', name: '4-comparison', waitFor: 'text=School Comparison' },
  { url: 'http://localhost:5173/financing-calculator', name: '5-financing', waitFor: 'text=Flight Training Financing Calculator' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  for (const pageInfo of pages) {
    console.log(`\nCapturing: ${pageInfo.name}`);
    console.log(`URL: ${pageInfo.url}`);
    
    try {
      await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForSelector(pageInfo.waitFor, { timeout: 10000 }).catch(() => {
        console.log(`  Warning: Could not find "${pageInfo.waitFor}"`);
      });
      await page.waitForTimeout(2000);
      
      const path = `./screenshots/${pageInfo.name}.png`;
      await page.screenshot({ path, fullPage: true });
      console.log(`  ✓ Saved: ${path}`);
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots complete!');
})();
