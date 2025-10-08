import { test, expect } from '@playwright/test';

test.describe('Basic Form on IndexPage', () => {
  test('should render, validate and submit form', async ({ page }) => {
    // ไปหน้าแรกของแอป
    await page.goto('/');

    // ฟอร์มควรมีหัวข้อ
    await expect(page.getByText('Basic Form')).toBeVisible();

    // ระบุตัวแปรของ input ต่าง ๆ
    const firstName = page.getByLabel('First name');
    const lastName = page.getByLabel('Last name');
    const email = page.getByLabel('Email');
    const note = page.getByLabel('Note');

    // ตรวจว่าช่อง input ทั้งหมดมองเห็น
    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
    await expect(email).toBeVisible();
    await expect(note).toBeVisible();

    // 🚨 กด Submit โดยไม่กรอกข้อมูล → ต้องขึ้น error 2 จุด (first / last)
    await page.getByRole('button', { name: 'Submit' }).click();

    // กระตุ้น blur ให้ทั้ง 2 ช่องเพื่อให้แสดง error ครบ
    await firstName.click();
    await lastName.click();
    await page.getByText('Basic Form').click();

    await expect(page.locator('.q-field--error')).toHaveCount(2);

    // 🚨 ใส่อีเมลไม่ถูกต้อง → ต้องแสดงข้อความ Invalid email
    await email.fill('not-an-email');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Invalid email')).toBeVisible();

    // ✅ กรอกข้อมูลถูกต้องทั้งหมด
    await firstName.fill('Tinnapob');
    await lastName.fill('Puangmala');
    await email.fill('tin@example.com');
    await note.fill('Hello from Playwright');

    // กด Submit → ไม่ควรเหลือ error ใด ๆ
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.q-field--error')).toHaveCount(0);

    // ✅ กด Reset → ฟิลด์ทั้งหมดต้องว่าง
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(firstName).toHaveValue('');
    await expect(lastName).toHaveValue('');
    await expect(email).toHaveValue('');
    await expect(note).toHaveValue('');
  });
});

