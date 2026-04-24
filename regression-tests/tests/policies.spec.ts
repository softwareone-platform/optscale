import { test } from '@/fixtures/page.fixture';
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe(() => {
  test.use({ interceptAPI: { entries: anomaliesInterceptions } });

  test('FFC: Policy Anomalies', async ({ anomaliesPage }) => {
    await anomaliesPage.navigateToURL();

    await test.step('List page', async () => {
      await anomaliesPage.waitForCanvas();
      await captureScreenshot(anomaliesPage.main, 'Policies-Anomalies--Container.png', {
        hoverAnchor: anomaliesPage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: policiesInterceptions } });

  test('FFC: Quota and Budget Policies', async ({ policiesPage }) => {
    await policiesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesPage.main, 'Policies-Quota--Container.png', {
        hoverAnchor: policiesPage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('FFC: Tagging Policies', async ({ taggingPoliciesPage }) => {
    await taggingPoliciesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(taggingPoliciesPage.main, 'Policies-TaggingPolicies--Container.png', {
        hoverAnchor: taggingPoliciesPage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: anomaliesInterceptions } });

  test('FFC: Policy Create form', async ({ createPoliciesPage }) => {
    await createPoliciesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(createPoliciesPage.main, 'Policies-Create-Container.png', {});
    });
  });
});
