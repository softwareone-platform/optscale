import { test } from '../fixtures/page.fixture';
import { RI_BreakdownResponse, RI_SP_DataSourcesResponse, RI_SP_OrganizationsResponse, SP_BreakdownResponse } from '../mocks/ri-sp-coverage-page.mock';
import { InterceptionEntry } from '../types/interceptor.types';

test.describe('Mocked RI/SP coverage page test', { tag: ['@ui', '@risp-coverage'] }, () => {
  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/organizations/[^/]+/ri_breakdown\\?end_date`,
      mock: RI_BreakdownResponse,
    },
    {
      url: `/v2/organizations/[^/]+/sp_breakdown\\?end_date`,
      mock: SP_BreakdownResponse,
    },
    {
      gql: 'DataSources',
      mock: RI_SP_DataSourcesResponse,
    },
    {
      gql: 'Organizations',
      mock: RI_SP_OrganizationsResponse,
    },
  ];

  test.use({ restoreSession: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });


  test('Verify mocked table data is displayed on the RI/SP coverage page', async ({ recommendationsPage, riSpCoveragePage }) => {
    await test.step('Navigate to the RI/SP coverage page from recommendations page', async () => {
      await recommendationsPage.page.clock.setFixedTime(new Date('2026-02-10T00:00:00Z'));
      await recommendationsPage.navigateToURL();
      await recommendationsPage.clickRI_SPCard();
    });

    await test.step('Verify that the RI SP breakdown table displays the mocked data', async () => {
      await riSpCoveragePage.waitForAllCanvases();
      await riSpCoveragePage.table.waitFor();
    });
  });
});
