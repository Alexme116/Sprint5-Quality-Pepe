import { test, expect, chromium, Browser, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const email = 'alexmoncada16@hotmail.com';
const password = 'Playwright123';

// Test data for parameterized testing
const loginTestData = [
  {
    testId: 'auth-param-1',
    email: 'alexmoncada16@hotmail.com',
    password: 'Playwright123',
    expectedResult: 'success',
    expectedText: '| Oracle Manager',
    description: 'Valid Manager Credentials'
  },
  {
    testId: 'auth-param-2',
    email: 'invalid@test.com',
    password: 'wrongpassword',
    expectedResult: 'error',
    expectedText: 'find your account',
    description: 'Invalid Credentials'
  },
  {
    testId: 'auth-param-3',
    email: 'alexmoncada16@hotmail.com',
    password: 'WrongPassword123',
    expectedResult: 'error',
    expectedText: 'Password is incorrect',
    description: 'Valid Email, Wrong Password'
  }
];

// This test suite is to signup and login to the application as a new user.
test.describe('Creating and logging as a new user to test the auth', { tag: '@auth' }, () => {
  let browser: Browser;
  let page: Page;

  // This test suite assumes that the application is running on http://localhost:3000
  // The login is going to be done to test all the end-to-end authentication features
  test.beforeAll(async () => { // Here we make beforeAll the test the login
    browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/auth/',
            size: { width: 1280, height: 720 },
        },
    });
    page = await context.newPage();
    await page.goto('http://localhost:3000');
  });

  test.afterAll(async () => { // Here we close the browser after all tests are done and wait for a while to ensure everything is captured in the video
    await page.waitForTimeout(2000);
    await browser.close();
  });

  test.afterEach(async ({}, testInfo) => { // This will save the video of each test with the test title as the filename
  const videoPath = await page.video()?.path();
  if (videoPath) {
    const targetPath = path.join('videos/auth/', `${testInfo.title.replace(/\s+/g, '_')}.webm`);
    fs.mkdirSync('videos/auth/', { recursive: true });
    fs.renameSync(videoPath, targetPath);
  }
});

  // Test ID: auth1
  test('Signup test', { tag: ['@smoke', '@signup', '@critical'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'auth1' },
      { type: 'feature', description: 'User Registration' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'Team 24' }
    );

    // This test is to ensure that the signup works correctly detecting bots trying to create accounts
    const authContainer = page.locator('.auth-main-container');
    await expect(authContainer).toBeVisible();
    const signupLink = page.getByRole('link', { name: 'Sign up' });
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/signup-link-clicked.png', fullPage: true });
    // ------------------
    
    const firstNameInput = page.getByRole('textbox', { name: 'First name' });
    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill('Test');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/first-name-input-filled.png', fullPage: true });
    // ------------------

    const lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    await expect(lastNameInput).toBeVisible();
    await lastNameInput.fill('Testing');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/last-name-input-filled.png', fullPage: true });
    // ------------------

    const emailInput = page.getByRole('textbox', { name: 'Email address' });
    await expect(emailInput).toBeVisible();
    await emailInput.fill('testuser@example.com');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/email-input-filled.png', fullPage: true });
    // ------------------
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('Testpassword123');
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/password-input-filled.png', fullPage: true });
    // ------------------

    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/signup-test/verify-human-popup.png', fullPage: true });
    // ------------------
  });

  // Test ID: auth2
  test('Login test successfully', { tag: ['@smoke', '@login', '@critical', '@e2e'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'auth2' },
      { type: 'feature', description: 'User Authentication - Success Flow' },
      { type: 'severity', description: 'critical' },
      { type: 'owner', description: 'Team 24' },
      { type: 'bug', description: 'Related to AUTH-001 if exists' }
    );

    // This test is to ensure that the login works correctly with the new user
    await page.getByRole('heading', { name: 'Sign in to MyTodoList' }).waitFor();
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/email-input-filled.png', fullPage: true });
    // ------------------

    await page.getByRole('textbox', { name: 'Password' }).waitFor();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Continue' }).click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/password-input-filled.png', fullPage: true });
    // ------------------

    await expect(page.getByText('| Oracle Manager')).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/login-success.png', fullPage: true });
    // ------------------
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/all-data-loaded.png', fullPage: true });
    // ------------------

    const profileButton = page.getByRole('button', { name: 'Open user button' });
    await expect(profileButton).toBeVisible();
    await profileButton.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/profile-button-clicked.png', fullPage: true });
    // ------------------
    const signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
    await expect(signOutButton).toBeVisible();
    await signOutButton.click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/sign-out-button-clicked.png', fullPage: true });
    // ------------------

    const signInHeading = page.getByRole('heading', { name: 'Sign in to MyTodoList' });
    await expect(signInHeading).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-successfully/logout-successfully.png', fullPage: true });
    // ------------------
  });

  // Test ID: auth3
  test('Login test incorrectly', { tag: ['@negative', '@login', '@validation'] }, async () => {
    // Annotations for test metadata
    test.info().annotations.push(
      { type: 'test-id', description: 'auth3' },
      { type: 'feature', description: 'User Authentication - Error Handling' },
      { type: 'severity', description: 'high' },
      { type: 'owner', description: 'Team 24' },
      { type: 'test-type', description: 'negative-testing' }
    );

    // This test is to ensure that the login fails if the user tries to login with incorrect credentials
    await page.getByRole('heading', { name: 'Sign in to MyTodoList' }).waitFor();
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-incorrectly/email-input-filled.png', fullPage: true });
    // ------------------

    await page.getByRole('textbox', { name: 'Password' }).waitFor();
    await page.getByRole('textbox', { name: 'Password' }).fill('IncorrectPassword');
    await page.getByRole('button', { name: 'Continue' }).click();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-incorrectly/password-input-filled.png', fullPage: true });
    // ------------------

    await expect(page.getByText('Password is incorrect. Try')).toBeVisible();
    // --- screenshot ---
    await page.screenshot({ path: 'screenshots/auth/login-test-incorrectly/login-error.png', fullPage: true });
    // ------------------
  });

  // PARAMETERIZED TEST - Test ID: auth-param-X
  loginTestData.forEach((data, index) => {
    test(`Parameterized login test ${index + 1}: ${data.description}`, 
      { tag: ['@parameterized', '@login', '@data-driven'] }, 
      async () => {
        // Annotations for test metadata
        test.info().annotations.push(
          { type: 'test-id', description: data.testId },
          { type: 'feature', description: 'Parameterized Login Testing' },
          { type: 'severity', description: 'medium' },
          { type: 'owner', description: 'Team 24' },
          { type: 'dataset', description: `Dataset ${index + 1} - ${data.description}` },
          { type: 'expected-result', description: data.expectedResult }
        );

        // Navigate to login page
        await page.goto('http://localhost:3000');
        await page.getByRole('heading', { name: 'Sign in to MyTodoList' }).waitFor();
        
        // Fill email
        await page.getByRole('textbox', { name: 'Email address' }).fill(data.email);
        await page.getByRole('button', { name: 'Continue' }).click();
        // --- screenshot ---
        await page.screenshot({ 
          path: `screenshots/auth/parameterized-login/dataset-${index + 1}-email-filled.png`, 
          fullPage: true 
        });
        // ------------------

        // Fill password
        await page.getByRole('textbox', { name: 'Password' }).waitFor();
        await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
        await page.getByRole('button', { name: 'Continue' }).click();
        // --- screenshot ---
        await page.screenshot({ 
          path: `screenshots/auth/parameterized-login/dataset-${index + 1}-password-filled.png`, 
          fullPage: true 
        });
        // ------------------

        // Verify expected outcome
        if (data.expectedResult === 'success') {
          await expect(page.getByText(data.expectedText)).toBeVisible();
          await page.waitForLoadState('networkidle');
          await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();
          
          // --- screenshot ---
          await page.screenshot({ 
            path: `screenshots/auth/parameterized-login/dataset-${index + 1}-login-success.png`, 
            fullPage: true 
          });
          // ------------------
          
          // Logout for next iteration
          const profileButton = page.getByRole('button', { name: 'Open user button' });
          await expect(profileButton).toBeVisible();
          await profileButton.click();
          const signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
          await expect(signOutButton).toBeVisible();
          await signOutButton.click();
          
          const signInHeading = page.getByRole('heading', { name: 'Sign in to MyTodoList' });
          await expect(signInHeading).toBeVisible();
          
        } else {
          // Expect error message
          await expect(page.getByText(data.expectedText)).toBeVisible();
          
          // --- screenshot ---
          await page.screenshot({ 
            path: `screenshots/auth/parameterized-login/dataset-${index + 1}-login-error.png`, 
            fullPage: true 
          });
          // ------------------
        }
      }
    );
  });
});