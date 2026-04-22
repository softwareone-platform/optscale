import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { homepageInterceptions } from '../mocks/homepage.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { regressionOptions } from '../utils/test-helpers';

test.use(regressionOptions(homepageInterceptions));

test('FFC: Home — all dashboard blocks match screenshots', async ({ homePage }) => {
  await homePage.navigateToURL();
  await homePage.waitForAllBoxesToLoad();
  await homePage.fitViewportToFullPage();

  const blocks = [
    {
      name: 'Organization Expenses',
      locator: homePage.organizationExpensesBlock,
      snapshot: 'Home-Block--OrganizationExpenses.png',
    },
    { name: 'Top Resources', locator: homePage.topResourcesBlock, snapshot: 'Home-Block--TopResources.png' },
    { name: 'Recommendations', locator: homePage.recommendationsBlock, snapshot: 'Home-Block--Recommendations.png' },
    {
      name: 'Policy Violations',
      locator: homePage.policyViolationsBlock,
      snapshot: 'Home-Block--PolicyViolations.png',
    },
    {
      name: 'Pools Requiring Attn.',
      locator: homePage.poolsRequiringAttentionBlock,
      snapshot: 'Home-Block--PoolsRequiringAttention.png',
    },
  ];

  for (const { name, locator, snapshot } of blocks) {
    await test.step(`${name} block`, async () => {
      await roundElementDimensions(locator);
      await expect(locator).toHaveScreenshot(snapshot);
    });
  }
});
