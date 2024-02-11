import { test, expect } from '@playwright/test';

test('create delete course list', async ({ page }) => {
  // Клик по элементу body страницы для активации окна
  await page.locator('body').click();
  // Переход на главную страницу
  await page.goto('/');
  // Клик по полю для ввода названия курса
  await page.getByPlaceholder('название').click();
  // Ввод текста 'Test course' в поле для ввода названия курса
  await page.getByPlaceholder('название').fill('Test course');
  // Клик по полю для ввода описания курса
  await page.getByPlaceholder('описание').click();
  // Ввод текста 'Test description' в поле для ввода описания курса
  await page.getByPlaceholder('описание').fill('Test description');
  // Клик по кнопке 'Добавить'
  await page.getByRole('button', { name: 'Добавить' }).click();
  // Ожидание появления элемента с текстом 'Test courseTest descriptionУдалить'
  await expect(
    page.getByText('Test courseTest descriptionУдалить')
  ).toBeVisible();

  // Клик по кнопке 'Удалить'
  await page.getByRole('button', { name: 'Удалить' }).click();

  // Ожидание исчезновения элемента с текстом 'Test courseTest descriptionУдалить'
  await expect(
    page.getByText('Test courseTest descriptionУдалить')
  ).not.toBeVisible();
});
