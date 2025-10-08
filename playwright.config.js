import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // รันบน Chromium เป็นหลัก (เพิ่ม browser อื่นได้ภายหลัง)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // ให้ Playwrightสตาร์ท dev server ของ Quasar ให้อัตโนมัติ
  webServer: {
    command: 'quasar dev -p 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
});
