import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input field', async ({ page }) => {
        await expect(page.getByText('Inline form')).toBeVisible();

        const emailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await emailInput.fill('email1@test.com');
        await emailInput.clear();
        await emailInput.pressSequentially('email22@test.com', { delay: 200 });

        // assert that the input value is correct
        const inputValue = await emailInput.inputValue();
        expect(inputValue).toEqual('email22@test.com');
    });

    test('Radio button', async ({ page }) => {
        const radioButton = page.locator('nb-card', { hasText: 'Using the Grid' }).getByLabel('Option 1');

        await expect(radioButton).toBeVisible();
        await radioButton.click({ force: true });

        // assert that the radio button is checked
        let isChecked = await radioButton.isChecked();
        expect(isChecked).toBeTruthy();

        const radioButton2 = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('radio', { name: 'Option 2' });
        await radioButton2.click({ force: true });
        const isChecked2 = await radioButton2.isChecked();
        expect(isChecked2).toBeTruthy();
        isChecked = await radioButton.isChecked();
        expect(isChecked).toBeFalsy();
    });

    
});