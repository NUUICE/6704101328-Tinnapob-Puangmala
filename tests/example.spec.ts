import { test, expect } from '@playwright/test';

test.describe('Basic Form on IndexPage', () => {
  test('should render, validate and submit form', async ({ page }) => {
    await page.goto('/');

    // ฟอร์มควรมีหัวข้อ
    await expect(page.getByText('Basic Form')).toBeVisible();

    const firstName = page.getByLabel('First name');
    const lastName  = page.getByLabel('Last name');
    const email     = page.getByLabel('Email');
    const note      = page.getByLabel('Note');

    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
    await expect(email).toBeVisible();
    await expect(note).toBeVisible();

    // กด Submit แบบค่าว่าง → ต้องมี field error 2 จุด (first/last)
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.q-field--error')).toHaveCount(2);

    // ใส่อีเมลไม่ถูกต้อง -> ต้องมี error email
    await email.fill('not-an-email');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Invalid email')).toBeVisible();

    // กรอกข้อมูลที่ถูกต้องทั้งหมด
    await firstName.fill('Tinnapob');
    await lastName.fill('Puangmala');
    await email.fill('tin@example.com');
    await note.fill('Hello from Playwright');

    // ส่งฟอร์มอีกครั้ง → ไม่ควรมี .q-field--error เหลือ
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.q-field--error')).toHaveCount(0);

    // Reset แล้วค่าควรกลายเป็นค่าว่าง
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(firstName).toHaveValue('');
    await expect(lastName).toHaveValue('');
    await expect(email).toHaveValue('');
    await expect(note).toHaveValue('');
  });
});
