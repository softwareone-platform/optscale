import { test } from '@/fixtures/page.fixture';
import { homepageInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.use({ interceptAPI: { entries: homepageInterceptions } });

test('FFC: Home', async ({ homePage }) => {
  await homePage.navigateToURL();
  await homePage.waitForAllBoxesToLoad();
  await homePage.fitViewportToFullPage();

  const blocks = [
    { label: 'Organization Expenses block', locator: homePage.organizationExpensesBlock, snapshot: 'Home-Block--OrganizationExpenses.png' },
    { label: 'Top Resources block', locator: homePage.topResourcesBlock, snapshot: 'Home-Block--TopResources.png' },
    { label: 'Recommendations block', locator: homePage.recommendationsBlock, snapshot: 'Home-Block--Recommendations.png' },
    { label: 'Policy Violations block', locator: homePage.policyViolationsBlock, snapshot: 'Home-Block--PolicyViolations.png' },
    {
      label: 'Pools Requiring Attention block',
      locator: homePage.poolsRequiringAttentionBlock,
      snapshot: 'Home-Block--PoolsRequiringAttention.png',
    },
  ];

  for (const { label, locator, snapshot } of blocks) {
    await test.step(label, async () => {
      await captureScreenshot(locator, snapshot, { skipHover: true });
    });
  }
});
