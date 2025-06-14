import { test, expect, chromium, Browser, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// This test suite is designed to test the tasks functionality of the application as a Manager.
test.describe('Creating, updating, and deleting tasks as a Manager', { tag: '@tasks' }, () => {
  let browser: Browser;
  let page: Page;

  // This test suite assumes that the application is running on http://localhost:3000
  // The login is going to be done to test all the end-to-end tasks
  test.beforeAll(async () => { // Here we make beforeAll the test the login
    browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/tasks/',
            size: { width: 1280, height: 720 },
        },
    });
    page = await context.newPage();
    await page.goto('http://localhost:3000');

    await page.getByRole('heading', { name: 'Sign in to MyTodoList' }).waitFor();
    await page.getByRole('textbox', { name: 'Email address' }).fill('alexmoncada16@hotmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).waitFor();
    await page.getByRole('textbox', { name: 'Password' }).fill('Playwright123');
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  test.afterAll(async () => { // Here we close the browser after all tests are done and wait for a while to ensure everything is captured in the video
    await page.waitForTimeout(2000);
    await browser.close();
  });

  test.afterEach(async ({}, testInfo) => { // This will save the video of each test with the test title as the filename
  const videoPath = await page.video()?.path();
  if (videoPath) {
    const targetPath = path.join('videos/tasks/', `${testInfo.title.replace(/\s+/g, '_')}.webm`);
    fs.mkdirSync('videos/tasks/', { recursive: true });
    fs.renameSync(videoPath, targetPath);
  }
});

  // Test ID: tasks1
  test('Login test', { tag: ['@smoke', '@login', '@setup'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks1' },
      { type: 'feature', description: 'Task Management - Authentication' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'Team 24' }
    );

    // This test is to ensure that the login works correctly
    await expect(page.getByText('| Oracle Manager')).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/login-test/login-success.png', fullPage: true });
    // ------------------
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/login-test/all-data-loaded.png', fullPage: true });
    // ------------------
  });

  // Test ID: tasks2
  test('Filter by sprint', { tag: ['@filter', '@functionality', '@medium'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks2' },
      { type: 'feature', description: 'Task Management - Sprint Filtering' },
      { type: 'severity', description: 'medium' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'functional-testing' }
    );

    // This test is to ensure that the filter by sprint works correctly
    await page.waitForLoadState('networkidle');
    const filterBySprint = page.getByTestId('filter-module-select');
    await expect(filterBySprint).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/filter-by-sprint-test/filter-visible.png', fullPage: true });
    // ------------------

    await filterBySprint.selectOption({ value: '62' });
    await expect(page.getByText('OCIΩΩΩ and Cloud Native Study')).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/filter-by-sprint-test/sprint-1-selected.png', fullPage: true });
    // ------------------

    await filterBySprint.selectOption({ value: '63' });
    await expect(page.getByText('Implement login')).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/filter-by-sprint-test/sprint-2-selected.png', fullPage: true });
    // ------------------
  });

  // Test ID: tasks3
  test('Create a new task', { tag: ['@crud', '@create', '@critical', '@e2e'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks3' },
      { type: 'feature', description: 'Task Management - Task Creation' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'crud-operation' }
    );

    // This test is to ensure that a new task can be created successfully
    await page.waitForLoadState('networkidle');
    const titleInput = page.getByPlaceholder('Title');
    await page.waitForLoadState('networkidle');
    await expect(titleInput).toBeVisible();
    await titleInput.fill('Test Task Playwright New');
    await expect(titleInput).toHaveValue('Test Task Playwright New');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/title-input-filled.png', fullPage: true });
    // ------------------

    const descriptionInput = page.getByPlaceholder('Description');
    await expect(descriptionInput).toBeVisible();
    await descriptionInput.fill('This is a test task description for Playwright. New');
    await expect(descriptionInput).toHaveValue('This is a test task description for Playwright. New');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/description-input-filled.png', fullPage: true });
    // ------------------

    const responibleSelect = page.getByTestId('responsible-select');
    await expect(responibleSelect).toBeVisible();
    await responibleSelect.selectOption({ value: '3' });
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/responsible-selected.png', fullPage: true });
    // ------------------

    const storyPointsInput = page.getByPlaceholder('Story Points');
    await expect(storyPointsInput).toBeVisible();
    await storyPointsInput.fill('5');
    await expect(storyPointsInput).toHaveValue('5');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/story-points-input-filled.png', fullPage: true });
    // ------------------

    const hoursInput = page.getByPlaceholder('Hours');
    await expect(hoursInput).toBeVisible();
    await hoursInput.fill('7');
    await expect(hoursInput).toHaveValue('7');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/hours-input-filled.png', fullPage: true });
    // ------------------

    const sprintSelect = page.getByTestId('module-select');
    await expect(sprintSelect).toBeVisible();
    await sprintSelect.selectOption({ value: '66' });
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/sprint-selected.png', fullPage: true });
    // ------------------

    const addButton = page.getByText('Add');
    await expect(addButton).toBeVisible();
    await addButton.click();

    const newTaskTitle = page.getByText('Test Task Playwright New');
    await expect(newTaskTitle).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/create-new-task/task-added-successfully.png', fullPage: true });
    // ------------------
  });

  // Test ID: tasks4
  test('Change last task created status to Done', { tag: ['@crud', '@update', '@status', '@high'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks4' },
      { type: 'feature', description: 'Task Management - Status Update to Done' },
      { type: 'severity', description: 'high' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'status-transition' }
    );

    // This test is to ensure that the last task created can be changed to Done status
    await page.waitForLoadState('networkidle');
    const doneButtonLastTask = page.getByRole('button', { name: 'Done' });
    await expect(doneButtonLastTask).toBeVisible();
    await doneButtonLastTask.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-done/done-button-clicked.png', fullPage: true });
    // ------------------

    const hourCompletedPopupTitle = page.getByText('Task Completion Time');
    await expect(hourCompletedPopupTitle).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-done/real-hours-popup-shown.png', fullPage: true });
    // ------------------

    const hourCompletedInput = page.getByPlaceholder('Real Hours');
    await expect(hourCompletedInput).toBeVisible();
    await hourCompletedInput.fill('12');
    await expect(hourCompletedInput).toHaveValue('12');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-done/hours-input-filled.png', fullPage: true });
    // ------------------

    const saveButton = page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    const lastTaskCreated = page.getByRole('row', { name: 'Test Task Playwright New This is' });
    await page.waitForTimeout(5000);
    await expect(lastTaskCreated).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-done/task-updated-to-done-successfully.png', fullPage: true });
    // ------------------
  });

  // Test ID: tasks5
  test('Change last task created status to toDo', { tag: ['@crud', '@update', '@status', '@undo'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks5' },
      { type: 'feature', description: 'Task Management - Status Revert to ToDo' },
      { type: 'severity', description: 'medium' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'status-reversion' }
    );

    // This test is to ensure that the last task created can be changed back to To Do status
    await page.waitForLoadState('networkidle');
    const lastTaskCreatedDone = page.getByRole('row', { name: 'Test Task Playwright New This is' });
    await expect(lastTaskCreatedDone).toBeVisible();

    const undoButtonlastTask = page.getByRole('row', { name: 'Test Task Playwright New This is' }).getByRole('button').first();
    await expect(undoButtonlastTask).toBeVisible();
    await undoButtonlastTask.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-todo/undo-button-clicked.png', fullPage: true });
    // ------------------
    
    const lastTaskCreatedToDo = page.getByRole('cell', { name: 'Test Task Playwright New' });
    await page.waitForTimeout(5000);
    await expect(lastTaskCreatedToDo).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/change-task-status-to-todo/task-updated-to-todo-successfully.png', fullPage: true });
    // ------------------
  });

  // Test ID: tasks6
  test('Delete the last task created', { tag: ['@crud', '@delete', '@critical', '@cleanup'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'tasks6' },
      { type: 'feature', description: 'Task Management - Task Deletion' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'delete-operation' }
    );

    // This test is to ensure that the last task created can be deleted successfully
    await page.waitForLoadState('networkidle');
    const lastTaskCreated = page.getByRole('cell', { name: 'Test Task Playwright New' });
    await expect(lastTaskCreated).toBeVisible();

    const deleteButtonLastTask = page.getByRole('cell', { name: 'Done' }).getByRole('button').nth(1);
    await expect(deleteButtonLastTask).toBeVisible();
    await deleteButtonLastTask.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/delete-created-task/delete-button-clicked.png', fullPage: true });
    // ------------------

    await expect(lastTaskCreated).not.toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/tasks/delete-created-task/task-deleted-successfully.png', fullPage: true });
    // ------------------
  });
});