import { test, expect, request } from '@playwright/test';

test.describe('SauceDemo API checks', () => {
  test('Backtrace unique events endpoint should not allow anonymous', async ({ request }) => {
    const res = await request.post(
      'https://events.backtrace.io/api/unique-events/submit?universe=UNIVERSE&token=TOKEN',
      { data: { some: 'payload' } }
    );

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error.message).toContain('Unauthorized');
  });

  test('Backtrace summed events endpoint should not allow anonymous', async ({ request }) => {
    const res = await request.post(
      'https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN',
      { data: { some: 'payload' } }
    );

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe(6);
  });

  test('Home page is accessible', async ({ request }) => {
    const res = await request.get('https://www.saucedemo.com/');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('Swag Labs'); // sanity check
  });
});