import { test, expect } from '@playwright/test';

const API_BASE = 'https://forum-api.dicoding.dev/v1';

test.describe('Login flow', () => {
  test('shows validation errors on empty submit without calling the API', async ({
    page,
  }) => {
    let loginCalled = false;
    await page.route(`${API_BASE}/login`, (route) => {
      loginCalled = true;
      route.continue();
    });

    await page.goto('/login');
    await page.getByRole('button', { name: 'Masuk' }).click();

    await expect(page.getByText('Email wajib diisi')).toBeVisible();
    await expect(page.getByText('Kata sandi wajib diisi')).toBeVisible();
    expect(loginCalled).toBe(false);
  });

  test('shows an error message on invalid credentials', async ({ page }) => {
    await page.route(`${API_BASE}/login`, (route) => route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'fail',
        message: 'email or password is wrong',
      }),
    }));

    await page.goto('/login');
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Kata sandi').fill('wrongpassword');
    await page.getByRole('button', { name: 'Masuk' }).click();

    await expect(page.getByText('email or password is wrong')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('logs the user in and redirects to the home page on valid credentials', async ({
    page,
  }) => {
    await page.route(`${API_BASE}/login`, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'ok',
        data: { token: 'fake-token' },
      }),
    }));

    await page.route(`${API_BASE}/users/me`, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
        },
      }),
    }));

    await page.route(`${API_BASE}/threads`, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'ok',
        data: { threads: [] },
      }),
    }));

    await page.route(`${API_BASE}/users`, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: 'ok',
        data: { users: [] },
      }),
    }));

    await page.goto('/login');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Kata sandi').fill('secret123');
    await page.getByRole('button', { name: 'Masuk' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Keluar' })).toBeVisible();
  });
});
