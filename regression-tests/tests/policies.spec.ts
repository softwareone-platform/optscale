import { test } from '@/fixtures/page.fixture';
import { anomaliesInterceptions, policyCreateFormInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Policies', () => {
  test.use({ interceptAPI: { entries: anomaliesInterceptions } });

  test('anomalies', async ({ anomaliesPage }) => {
    await anomaliesPage.navigateToURL();

    await test.step('Header', async () => {
      await captureScreenshot(anomaliesPage.header, 'PoliciesAnomalies-Header.png', { skipHover: true });
    });

    await test.step('List page', async () => {
      await anomaliesPage.waitForCanvas();
      await captureScreenshot(anomaliesPage.pageContentWrapper, 'PoliciesAnomalies-Container.png', {
        hoverAnchor: anomaliesPage.heading,
      });
    });
  });
});

test.describe('Policies', () => {
  test.use({ interceptAPI: { entries: policiesInterceptions } });

  test('quota and budget', async ({ policiesPage }) => {
    await policiesPage.navigateToURL();

    await test.step('Header', async () => {
      await captureScreenshot(policiesPage.header, 'PoliciesQuota-Header.png', { skipHover: true });
    });

    await test.step('List page', async () => {
      await captureScreenshot(policiesPage.pageContentWrapper, 'PoliciesQuota-Container.png', {
        hoverAnchor: policiesPage.heading,
      });
    });
  });
});

test.describe('Policies', () => {
  test.use({ interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('tagging', async ({ taggingPoliciesPage }) => {
    await taggingPoliciesPage.navigateToURL();

    await test.step('Header', async () => {
      await captureScreenshot(taggingPoliciesPage.header, 'PoliciesTagging-Header.png', { skipHover: true });
    });

    await test.step('List page', async () => {
      await captureScreenshot(taggingPoliciesPage.pageContentWrapper, 'PoliciesTagging-Container.png', {
        hoverAnchor: taggingPoliciesPage.heading,
      });
    });
  });
});

test.describe('Policies', () => {
  test.use({ interceptAPI: { entries: policyCreateFormInterceptions } });

  test('create form', async ({ createPoliciesPage }) => {
    await createPoliciesPage.navigateToURL();

    await test.step('Header', async () => {
      await captureScreenshot(createPoliciesPage.header, 'PoliciesCreate-Header.png', { skipHover: true });
    });

    await test.step('Create form', async () => {
      await captureScreenshot(createPoliciesPage.pageContentWrapper, 'PoliciesCreate-Container.png');
    });
  });
});
