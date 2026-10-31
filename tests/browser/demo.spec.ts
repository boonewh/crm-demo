import { test, expect, devices } from '@playwright/test';
import type { Page } from '@playwright/test';

const paths = ['/dashboard', '/clients', '/leads', '/projects', '/reports', '/calendar', '/accounts', '/vault', '/settings', '/help', '/admin/users', '/admin/leads', '/admin/clients', '/admin/interactions', '/admin/projects', '/admin/import', '/trash', '/clients/1', '/leads/1', '/projects/1'];

async function isolate(page: Page) {
  const blocked: string[] = [], errors: string[] = [];
  const base = new URL(test.info().project.use.baseURL!);
  await page.context().route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (url.href === 'https://rsms.me/inter/inter.css') return route.fulfill({ status: 200, contentType: 'text/css', body: '/* font fixture */' });
    if (url.origin === base.origin && ['GET', 'HEAD'].includes(request.method()) && !/^\/(api|contacts|interactions|users|storage|search)(\/|$)/.test(url.pathname) && ['document', 'script', 'stylesheet', 'image', 'font'].includes(request.resourceType())) return route.continue();
    blocked.push(`${request.method()} ${url.origin}${url.pathname}`);
    return route.abort();
  });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => { localStorage.setItem('token', 'malformed-stored-real-credential'); });
  return () => { expect(blocked, 'No backend or non-asset requests').toEqual([]); expect(errors, 'No runtime or console errors').toEqual([]); };
}

for (const device of ['desktop', 'mobile']) {
  test(`${device}: demo entry and twenty production routes stay isolated`, async ({ browser }) => {
    const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, ...(device === 'mobile' ? { ...devices['iPhone 13'], serviceWorkers: 'block' as const } : { viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' as const }) });
    const page = await context.newPage(), verify = await isolate(page);
    await page.goto('/login');
    await expect(page).toHaveURL(/\/dashboard$/);
    for (const path of paths) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).not.toContainText('Something went wrong');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true);
      expect(await page.locator('h1,h2').count(), path).toBeGreaterThan(0);
    }
    verify();
    await context.close();
  });
}

test('password forms explain simulations and never send requests', async ({ page }) => {
  const verify = await isolate(page);
  await page.goto('/forgot-password');
  await page.locator('input[type=email]').fill('fictional@example.invalid');
  await page.getByRole('button', { name: 'Send Reset Link' }).click();
  await expect(page.getByText('Demo reset request simulated. No email was sent.')).toBeVisible();
  await page.goto('/reset-password/fictional-token');
  await page.locator('input[type=password]').nth(0).fill('Fictional!12345');
  await page.locator('input[type=password]').nth(1).fill('Fictional!12345');
  await page.getByRole('button', { name: 'Reset Password', exact: true }).click();
  await expect(page.getByText(/Demo password reset simulated/)).toBeVisible();
  await page.goto('/change-password');
  for (const input of await page.locator('input[type=password]').all()) await input.fill('Fictional!12345');
  await page.locator('button[type=submit]').click();
  await expect(page.getByText('Demo password change simulated. No real account changed.')).toBeVisible();
  verify();
});

test('calendar download contains a local demo event', async ({ page }) => {
  const verify = await isolate(page);
  await page.goto('/calendar');
  await page.locator('.fc-event').first().click();
  const link = page.locator('a[download="demo-follow-up.ics"]');
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  expect(href).toMatch(/^data:text\/calendar/);
  expect(decodeURIComponent(href!.slice(href!.indexOf(',') + 1))).toContain('BEGIN:VEVENT\r\n');
  const download = page.waitForEvent('download');
  await link.click();
  expect((await download).suggestedFilename()).toBe('demo-follow-up.ics');
  verify();
});
