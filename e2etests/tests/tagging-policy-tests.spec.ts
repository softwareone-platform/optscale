import { test } from '../fixtures/page.fixture';
import { expect, request } from '@playwright/test';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { deleteTaggingPolicies } from '../utils/teardown-utils';
import { ETaggingPolicyType } from '../types/enums';
import { InterceptionEntry } from '../types/interceptor.types';
import { TaggingPolicyViolationResponse } from '../mocks/tagging-policy-page.mocks';

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
  await deleteTaggingPolicies(restAPIRequest, token);
}

test.describe('[MPT-17042] Tagging Policy Tests', { tag: ['@ui', '@tagging-policies'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  test.beforeEach('Login admin user', async ({ taggingPoliciesPage }) => {
    await test.step('Login admin user', async () => {
      await taggingPoliciesPage.navigateToURL();
      await taggingPoliciesPage.waitForAllProgressBarsToDisappear();
    });
  });

  test('[232655] Verify that Sample data pop-up is visible when no policies exist', async ({ taggingPoliciesPage }) => {
    await test.step('Ensure all policies are deleted', async () => {
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (!(await taggingPoliciesPage.addRealDataBtn.isVisible())) {
        await deleteAllPolicies();
        await taggingPoliciesPage.page.reload();
        await taggingPoliciesPage.waitForAllProgressBarsToDisappear();
      }
    });

    await test.step('Verify Sample data pop-up visibility', async () => {
      await expect(taggingPoliciesPage.addRealDataBtn).toBeVisible();
    });
  });

  test('[232656] Verify that a user can create a required tagging policy', async ({ taggingPoliciesPage, taggingPoliciesCreatePage }) => {
    const policyName = `Required Tag Policy ${Date.now()}`;
    const tagName = 'AccountId';

    await test.step('Create required Tagging Policy page', async () => {
      await taggingPoliciesPage.navigateToCreateTaggingPolicy();
      await taggingPoliciesCreatePage.createTaggingPolicy(ETaggingPolicyType.requiredTag, policyName, tagName);
    });

    const targetPolicyRow = taggingPoliciesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);
    const date = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear()} 12:00 AM`;

    await test.step('Verify that the required tagging policy is created', async () => {
      await targetPolicyRow.waitFor();

      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect.soft(targetPolicyRow.locator('//td[3]')).toHaveText(`The ${tagName} tag is required starting from ${date}.`);
    });
  });

  test('[232657] Verify that a user can create a prohibited tagging policy', async ({ taggingPoliciesPage, taggingPoliciesCreatePage }) => {
    const policyName = `Prohibited Tag Policy ${Date.now()}`;
    const tagName = '__department';
    const filter = 'Activity';
    const filterOption = 'Active';

    await test.step('Create prohibited Tagging Policy page', async () => {
      await taggingPoliciesPage.navigateToCreateTaggingPolicy();
      await taggingPoliciesCreatePage.createTaggingPolicy(
        ETaggingPolicyType.prohibitedTag,
        policyName,
        tagName,
        undefined,
        filter,
        filterOption
      );
    });

    const targetPolicyRow = taggingPoliciesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);
    const date = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear()} 12:00 AM`;

    await test.step('Verify that the prohibited tagging policy is created', async () => {
      await targetPolicyRow.waitFor();

      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect.soft(targetPolicyRow.locator('//td[3]')).toHaveText(`Tag ${tagName} is prohibited starting from ${date}.`);
      await expect(targetPolicyRow.locator('//td[4]')).toHaveText(`${filter}: ${filterOption}`);
    });
  });

  test('[232658] Verify that a user can create a tags correlation tagging policy', async ({
    taggingPoliciesPage,
    taggingPoliciesCreatePage,
  }) => {
    const policyName = `Correlated Tag Policy ${Date.now()}`;
    const tagName = 'Instance';
    const secondaryTagName = 'Environment';

    await test.step('Create tags correlation Tagging Policy page', async () => {
      await taggingPoliciesPage.navigateToCreateTaggingPolicy();
      await taggingPoliciesCreatePage.createTaggingPolicy(ETaggingPolicyType.tagsCorrelation, policyName, tagName, secondaryTagName);
    });

    const targetPolicyRow = taggingPoliciesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);
    const date = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear()} 12:00 AM`;

    await test.step('Verify that the tags correlation tagging policy is created', async () => {
      await targetPolicyRow.waitFor();

      await expect.soft(targetPolicyRow.locator('//td[1]')).toHaveText(policyName);
      await expect
        .soft(targetPolicyRow.locator('//td[3]'))
        .toHaveText(`Resources tagged with ${tagName} must be tagged with ${secondaryTagName} starting from ${date}.`);
    });
  });

  test('[232659] Verify that user can delete a policy from the tagging policy details page', async ({
    taggingPoliciesPage,
    taggingPoliciesCreatePage,
  }) => {
    const policyName = `Policy To Be Deleted ${Date.now()}`;
    const tagName = 'Application';

    await test.step('Create a policy to be deleted', async () => {
      await taggingPoliciesPage.navigateToCreateTaggingPolicy();
      await taggingPoliciesCreatePage.createTaggingPolicy(ETaggingPolicyType.requiredTag, policyName, tagName);
    });

    const targetPolicyRow = taggingPoliciesPage.table.locator(`//td[.="${policyName}"]/ancestor::tr`);

    await test.step('Navigate to the created policy details page', async () => {
      await targetPolicyRow.waitFor();
      await taggingPoliciesPage.clickLocator(targetPolicyRow.locator('//a'));
      await taggingPoliciesPage.policyDetailsDiv.waitFor();
    });

    await test.step('Delete the policy from the details page', async () => {
      await taggingPoliciesPage.deletePolicyFromDetailsPage();
    });

    await test.step('Verify that the policy is deleted and no longer appears in the policies table', async () => {
      await expect(targetPolicyRow).toBeHidden();
    });
  });
});

test.describe('[MPT-17042] Mocked Tagging Policies Tests', { tag: ['@ui', '@tagging-policies'] }, () => {
  test.describe.configure({ mode: 'default' });

  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`,
      mock: TaggingPolicyViolationResponse,
    },
  ];

  test.use({
    restoreSession: true,
    interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: false },
  });

  test.beforeEach('Login admin user', async ({ taggingPoliciesPage }) => {
    await test.step('Login admin user', async () => {
      await taggingPoliciesPage.page.clock.setFixedTime(new Date('2026-01-29T15:00:00Z'));
      await taggingPoliciesPage.navigateToURL();
      await taggingPoliciesPage.waitForAllProgressBarsToDisappear();
    });
  });

  test('[232660] Verify that tagging policies are displayed with the correct status', async ({ taggingPoliciesPage }) => {
    const cancelIconXpath = '//*[@data-testid="CancelIcon"]';
    const checkCheckIconXpath = '//*[@data-testid="CheckCircleIcon"]';
    const correlatedTagStatus = taggingPoliciesPage.table.locator('(//a[contains(text(), "Correlated Tag")]/ancestor::tr/td[2]/div)[1]');
    const nonViolatingTagStatus = taggingPoliciesPage.table.locator('(//a[contains(text(), "Non-violating")]/ancestor::tr/td[2]/div)[1]');
    const prohibitedTagStatus = taggingPoliciesPage.table.locator('(//a[contains(text(), "Prohibited Tag")]/ancestor::tr/td[2]/div)[1]');
    const requiredTagStatus = taggingPoliciesPage.table.locator('(//a[contains(text(), "Required Tag")]/ancestor::tr/td[2]/div)[1]');

    await expect.soft(correlatedTagStatus.locator(cancelIconXpath)).toBeVisible();
    await expect.soft(correlatedTagStatus).toHaveText('1 violation right now');
    await expect.soft(nonViolatingTagStatus.locator(checkCheckIconXpath)).toBeVisible();
    await expect.soft(prohibitedTagStatus.locator(cancelIconXpath)).toBeVisible();
    await expect.soft(prohibitedTagStatus).toHaveText('2 violations right now');
    await expect.soft(requiredTagStatus.locator(cancelIconXpath)).toBeVisible();
    await expect.soft(requiredTagStatus).toHaveText('3185 violations right now');
  });
});
