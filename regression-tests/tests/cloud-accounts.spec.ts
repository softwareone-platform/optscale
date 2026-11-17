import { test } from '@/fixtures/page.fixture';
import { cloudAccountsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Cloud accounts', () => {
  test.use({ interceptAPI: { entries: cloudAccountsInterceptions } });

  test('list page', async ({ cloudAccountsPage }) => {
    await cloudAccountsPage.navigateToURL();
    await captureScreenshot(cloudAccountsPage.header, 'CloudAccounts-Header.png', { skipHover: true });
    await captureScreenshot(cloudAccountsPage.pageContentWrapper, 'CloudAccounts-Container.png', {
      hoverAnchor: cloudAccountsPage.heading,
    });
  });

  test('connect — AWS', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    const connect = cloudAccountsConnectPage;
    await connect.prepareConnectPageForScreenshot(cloudAccountsPage);

    await test.step('Header', async () => {
      await captureScreenshot(connect.header, 'CloudAccountsConnect-Header.png', { skipHover: true });
    });

    await connect.awsRootBtn.click();

    await test.step('Management — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsManagementAssumedRole.png', {
        skipHover: true,
        fitViewport: true,
      });
    });

    await test.step('Management — Access key', async () => {
      await connect.btnAccessKey.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsManagementAccessKey.png', {
        skipHover: true,
        fitViewport: true,
      });
    });

    await connect.btnMember.click();

    await test.step('Member — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsMemberAssumedRole.png', {
        skipHover: true,
        fitViewport: true,
      });
    });

    await test.step('Member — Access key', async () => {
      await connect.btnAccessKey.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsMemberAccessKey.png', {
        skipHover: true,
        fitViewport: true,
      });
    });

    await connect.btnStandalone.click();

    await test.step('Standalone — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsStandaloneAssumedRole.png', {
        skipHover: true,
        fitViewport: true,
      });
    });

    await test.step('Standalone — Access key', async () => {
      await connect.btnAccessKey.click();
      await captureScreenshot(connect.pageContentWrapper, 'CloudAccountsConnect-Container--AwsStandaloneAccessKey.png', {
        skipHover: true,
        fitViewport: true,
      });
    });
  });

  test('connect — Azure tenant', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.azureTenantBtn.click();
    await captureScreenshot(cloudAccountsConnectPage.pageContentWrapper, 'CloudAccountsConnect-Container--AzureTenant.png', {
      skipHover: true,
      fitViewport: true,
    });
  });

  test('connect — Google Cloud', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.googleCloudBtn.click();
    await captureScreenshot(cloudAccountsConnectPage.pageContentWrapper, 'CloudAccountsConnect-Container--GoogleCloud.png', {
      skipHover: true,
      fitViewport: true,
    });
  });
});
