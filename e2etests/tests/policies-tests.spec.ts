/* eslint-disable no-irregular-whitespace */
import { expect, request } from '@playwright/test';
import { test } from '../fixtures/page.fixture';
import { formatCurrency } from '../utils/currency-formatter';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { deletePolicies } from '../utils/teardown-utils';
import { InterceptionEntry } from '../types/interceptor.types';
import {
  EmptyLimitHitsResponse,
  ExpiringBudgetOverLimitHitsResponse,
  ExpiringBudgetOverLimitResponse,
  ExpiringBudgetUnderLimitResponse,
  PoliciesDefaultResponse,
  RecurringBudgetOverLimitHitsResponse,
  RecurringBudgetOverLimitResponse,
  RecurringBudgetUnderLimitResponse,
  ResourceOverLimitHitsResponse,
  ResourceOverLimitResponse,
  ResourceUnderLimitResponse,
} from '../mocks/policies-page.mocks';

async function deleteAllPolicies() {
  const apiContext = await request.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL,
  });
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;
  const authRequest = new AuthRequest(apiContext);
  const restAPIRequest = new RestAPIRequest(apiContext);
  const token = await authRequest.getAuthorizationToken(email, password);
  await deletePolicies(restAPIRequest, token);
}

test.describe('[MPT-16366] Policies Tests', { tag: ['@ui', '@policies'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  test.beforeEach('Login admin user', async ({ policiesPage }) => {
    await test.step('Login admin user', async () => {
      await policiesPage.navigateToURL();
      await policiesPage.waitForAllProgressBarsToDisappear();
    });
  });

  test('[232286] Verify that Sample data pop-up is visible when no policies exist', async ({ policiesPage }) => {
    await test.step('Ensure all policies are deleted', async () => {
      // eslint-disable-next-line playwright/no-conditional-in-test
      if(!await policiesPage.realDataAddBtn.isVisible()) {
        await deleteAllPolicies();
        await policiesPage.page.reload();
        await policiesPage.waitForAllProgressBarsToDisappear();
      }
    });

    await test.step('Verify Sample data pop-up visibility', async () => {
      await expect(policiesPage.realDataAddBtn).toBeVisible();
    });
  });

  test('[232287] Verify that user can add a resource quota policy', async ({ policiesPage, policiesCreatePage }) => {
    const policyName = `Resource Policy ${Date.now()}`;
    const resourceCount = 10;
    const filterOption = 'West Europe';
    const filterData = `Region: .a{fill:url(#a);}
            .b{fill:#0078d4;}
            .c{fill:url(#b);}
            .d{fill:url(#c);} ${filterOption}`;

    await test.step('Create Resource Policy', async () => {
      await policiesPage.navigateToCreatePolicy();
      await policiesCreatePage.createResourcePolicy(policyName, resourceCount, policiesCreatePage.regionFilter, filterOption);
    });

    const targetPolicyRow = policiesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);

    await test.step('Verify that the new policy is displayed in the policies table', async () => {
      await targetPolicyRow.waitFor();

      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect.soft(targetPolicyRow.locator('//td[3]')).toHaveText(`Resource count must not exceed ${resourceCount}.`);
      await expect.soft(targetPolicyRow.locator('//td[4]')).toContainText(filterData);
    });

    await test.step('Navigate to the created policy details page', async () => {
      await policiesPage.clickLocator(targetPolicyRow.locator('//a'));
      await policiesPage.policyDetailsDiv.waitFor();
    });

    await test.step('Verify policy details', async () => {
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Name: ${policyName}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText('Type: Resource quota');
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Resource count: ${resourceCount}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Filters:${filterData}`);
    });
  });

  test('[232288] Verify that user can create a recurring budget policy', async ({ policiesPage, policiesCreatePage }) => {
    const policyName = `Recurring Budget ${Date.now()}`;
    const budgetAmount = 1000;
    const formattedAmount = formatCurrency(budgetAmount);
    const filterOption = 'Active';

    await test.step('Create Recurring Budget Policy', async () => {
      await policiesPage.navigateToCreatePolicy();
      await policiesCreatePage.createRecurringBudgetPolicy(policyName, budgetAmount, policiesCreatePage.activityFilter, filterOption);
    });

    const targetPolicyRow = policiesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);

    await test.step('Verify that the new policy is displayed in the policies table', async () => {
      await targetPolicyRow.waitFor();
      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect.soft(targetPolicyRow.locator('//td[3]')).toHaveText(`Current month expenses must not exceed ${formattedAmount}.`);
      await expect.soft(targetPolicyRow.locator('//td[4]')).toContainText(`Activity: ${filterOption}`);
    });

    await test.step('Navigate to the created policy details page', async () => {
      await policiesPage.clickLocator(targetPolicyRow.locator('//a'));
      await policiesPage.policyDetailsDiv.waitFor();
    });

    await test.step('Verify policy details', async () => {
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Name: ${policyName}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText('Type: Recurring budget');
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Current month expenses budget: ${formattedAmount}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Filters:Activity: ${filterOption}`);
    });
  });

  test('[232289] Verify that user can create an expiring budget policy', async ({ policiesPage, policiesCreatePage }) => {
    const policyName = `Expiring Budget ${Date.now()}`;
    const budgetAmount = 500;
    const formattedAmount = formatCurrency(budgetAmount);
    const startDate = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear()} 12:00 AM`;

    await test.step('Create Expiring Budget Policy', async () => {
      await policiesPage.navigateToCreatePolicy();
      await policiesCreatePage.createExpiringBudgetPolicy(policyName, budgetAmount);
    });

    const targetPolicyRow = policiesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);

    await test.step('Verify that the new policy is displayed in the policies table', async () => {
      await targetPolicyRow.waitFor();
      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect
        .soft(targetPolicyRow.locator('//td[3]'))
        .toHaveText(`Total expenses from ${startDate} must not exceed ${formattedAmount}.`);
      await expect.soft(targetPolicyRow.locator('//td[4]')).toHaveText('-');
    });

    await test.step('Navigate to the created policy details page', async () => {
      await policiesPage.clickLocator(targetPolicyRow.locator('//a'));
      await policiesPage.policyDetailsDiv.waitFor();
    });

    await test.step('Verify policy details', async () => {
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Name: ${policyName}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText('Type: Expiring budget');
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Start date: ${startDate}`);
      await expect.soft(policiesPage.policyDetailsDiv).toContainText(`Budget: ${formattedAmount}`);
      await expect.soft(policiesPage.policyDetailsDiv).not.toContainText('Filters:');
    });
  });

  test('[232290] Verify that user can delete a policy from the policy details page', async ({ policiesPage, policiesCreatePage }) => {
    const policyName = `Policy To Be Deleted ${Date.now()}`;
    const resourceCount = 5;

    await test.step('Create a policy to be deleted', async () => {
      await policiesPage.navigateToCreatePolicy();
      await policiesCreatePage.createResourcePolicy(policyName, resourceCount);
    });

    const targetPolicyRow = policiesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);

    await test.step('Navigate to the created policy details page', async () => {
      await targetPolicyRow.waitFor();
      await policiesPage.clickLocator(targetPolicyRow.locator('//a'));
      await policiesPage.policyDetailsDiv.waitFor();
    });

    await test.step('Delete the policy from the details page', async () => {
      await policiesPage.deletePolicyFromDetailsPage();
    });

    await test.step('Verify that the policy is deleted and no longer appears in the policies table', async () => {
      await expect(targetPolicyRow).toBeHidden();
    });
  });
});

test.describe('[MPT-16366] Mocked Policies Tests', { tag: ['@ui', '@policies'] }, () => {
  test.describe.configure({ mode: 'default' });

  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
      mock: PoliciesDefaultResponse,
    },
    {
      gql: 'GetOrganizationConstraint',
      mock: ExpiringBudgetOverLimitResponse,
      variableMatch: { constraintId: 'e0f96d76-bdb2-4c7e-906b-fb6966dd4c23' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: ExpiringBudgetOverLimitHitsResponse,
      variableMatch: { constraintId: 'e0f96d76-bdb2-4c7e-906b-fb6966dd4c23' },
    },
    {
      gql: 'GetOrganizationConstraints',
      mock: ExpiringBudgetUnderLimitResponse,
      variableMatch: { constraintId: 'b02c5879-9ca0-4942-9b2f-0f97502b5bcd' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: EmptyLimitHitsResponse,
      variableMatch: { constraintId: 'b02c5879-9ca0-4942-9b2f-0f97502b5bcd' },
    },
    {
      gql: 'GetOrganizationConstraint',
      mock: RecurringBudgetOverLimitResponse,
      variableMatch: { constraintId: '9aecf307-1ceb-4416-957b-817ae115d9d0' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: RecurringBudgetOverLimitHitsResponse,
      variableMatch: { constraintId: '9aecf307-1ceb-4416-957b-817ae115d9d0' },
    },
    {
      gql: 'GetOrganizationConstraint',
      mock: RecurringBudgetUnderLimitResponse,
      variableMatch: { constraintId: '767e8724-fb96-4404-a8a6-f485b403cbed' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: EmptyLimitHitsResponse,
      variableMatch: { constraintId: '767e8724-fb96-4404-a8a6-f485b403cbed' },
    },
    {
      gql: 'GetOrganizationConstraint',
      mock: ResourceOverLimitResponse,
      variableMatch: { constraintId: '96e9f47b-4cac-40d9-a9fb-37cc7c50e43a' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: ResourceOverLimitHitsResponse,
      variableMatch: { constraintId: '96e9f47b-4cac-40d9-a9fb-37cc7c50e43a' },
    },
    {
      gql: 'GetOrganizationConstraint',
      mock: ResourceUnderLimitResponse,
      variableMatch: { constraintId: 'aaa8654e-0c83-48e9-93f5-d5831f6fa0e7' },
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: EmptyLimitHitsResponse,
      variableMatch: { constraintId: 'aaa8654e-0c83-48e9-93f5-d5831f6fa0e7' },
    },
  ];

  test.use({
    restoreSession: true,
    interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: false },
  });

  test.beforeEach('Login admin user', async ({ policiesPage }) => {
    await test.step('Login admin user', async () => {
      await policiesPage.page.clock.setFixedTime(new Date('2026-01-08T14:00:00Z'));
      await policiesPage.navigateToURL();
      await policiesPage.waitForAllProgressBarsToDisappear();
    });
  });

  test('[232337] Verify that statuses are displayed correctly from each policy type when over and under limit', async ({
    policiesPage,
  }) => {
    expect(await policiesPage.getColorFromElement(policiesPage.resourceUnderLimitStatus)).toBe(policiesPage.successColor);
    expect(await policiesPage.getColorFromElement(policiesPage.resourceOverLimitStatus)).toBe(policiesPage.errorColor);
    expect(await policiesPage.getColorFromElement(policiesPage.recurringBudgetUnderLimitStatus)).toBe(policiesPage.successColor);
    expect(await policiesPage.getColorFromElement(policiesPage.recurringBudgetOverLimitStatus)).toBe(policiesPage.errorColor);
    expect(await policiesPage.getColorFromElement(policiesPage.expiringBudgetUnderLimitStatus)).toBe(policiesPage.successColor);
    expect(await policiesPage.getColorFromElement(policiesPage.expiringBudgetOverLimitStatus)).toBe(policiesPage.errorColor);
  });

  test('[232338] Verify that expiring budget over limit displays violation in violation history table', async ({ policiesPage }) => {
    await policiesPage.expiringBudgetOverLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    const firstViolatedAtTableCell = policiesPage.table.locator('//td[1]');
    const firstBudgetActualExpensesTableCell = policiesPage.table.locator('//td[2]');

    await expect(policiesPage.policyViolationsHistoryHeading).toBeVisible();
    await expect(firstViolatedAtTableCell).toHaveText('01/08/2026 09:20 AM');
    await expect(firstBudgetActualExpensesTableCell).toHaveText('$1 ⟶ $48,646.2');
  });

  test('[232339] Verify that expiring budget under limit shows no violations in violation history table', async ({ policiesPage }) => {
    await policiesPage.expiringBudgetUnderLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    await expect(policiesPage.policyViolationsHistoryHeading).toBeHidden();
    await expect(policiesPage.table).toBeHidden();
  });

  test('[232340] Verify that recurring budget over limit displays violation in violation history table', async ({ policiesPage }) => {
    await policiesPage.recurringBudgetOverLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    const firstViolatedAtTableCell = policiesPage.table.locator('//td[1]');
    const firstBudgetActualExpensesTableCell = policiesPage.table.locator('//td[2]');

    await expect(policiesPage.policyViolationsHistoryHeading).toBeVisible();
    await expect(firstViolatedAtTableCell).toHaveText('01/08/2026 09:15 AM');
    await expect(firstBudgetActualExpensesTableCell).toHaveText('$10 ⟶ $48,646.2');
  });

  test('[232341] Verify that recurring budget under limit shows no violations in violation history table', async ({ policiesPage }) => {
    await policiesPage.recurringBudgetUnderLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    await expect(policiesPage.policyViolationsHistoryHeading).toBeHidden();
    await expect(policiesPage.table).toBeHidden();
  });

  test('[232342] Verify that resource quota over limit displays violation in violation history table', async ({ policiesPage }) => {
    await policiesPage.resourceOverLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    const firstViolatedAtTableCell = policiesPage.table.locator('//td[1]');
    const firstQuotaActualResourceCountTableCell = policiesPage.table.locator('//td[2]');

    await expect(policiesPage.policyViolationsHistoryHeading).toBeVisible();
    await expect(firstViolatedAtTableCell).toHaveText('01/08/2026 09:15 AM');
    await expect(firstQuotaActualResourceCountTableCell).toHaveText('1 ⟶ 3,012');
  });

  test('[232343] Verify that resource quota under limit shows no violations in violation history table', async ({ policiesPage }) => {
    await policiesPage.resourceUnderLimitLink.click();
    await policiesPage.policyDetailsDiv.waitFor();

    await expect(policiesPage.policyViolationsHistoryHeading).toBeHidden();
    await expect(policiesPage.table).toBeHidden();
  });
});
