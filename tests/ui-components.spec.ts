import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input field interactions', async ({ page }) => {
        await expect(page.getByText('Inline form')).toBeVisible();

        const emailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await emailInput.fill('email1@test.com');
        await emailInput.clear();
        await emailInput.pressSequentially('email22@test.com', { delay: 200 });

        // assert that the input value is correct
        const inputValue = await emailInput.inputValue();
        expect(inputValue).toEqual('email22@test.com');
    });

    
});