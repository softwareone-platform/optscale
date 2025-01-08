import { expect } from '@playwright/test';
import test from "../fixtures/fixture";

test('Login as FinOps user', async ({ loginPage, header }) => {

  await test.step('Login as FinOps user', async () => {
    await loginPage.navigateToURL(true);
    await loginPage.emailInput.fill('FinOpsTest1@outlook.com');
    await loginPage.passwordInput.fill('Ci8W2ue7rYS5-AK');
    await loginPage.loginBtn.click();
  } );

  await test.step('Verify user is logged as a member of the QA Test Org', async () => {
    const organizationName = await header.organizationSelect.innerText();
    expect(organizationName).toContain('QA Test Organization');
  } );

});

