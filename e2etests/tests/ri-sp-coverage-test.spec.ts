import { test } from '../fixtures/page.fixture';
import {
  AllowedActionsResponse,
  CurrentEmployeeResponse,
  GeminisResponse,
  OptimizationsLimitsResponse,
  OrganizationFeaturesResponse,
  OrganizationPerspectivesResponse,
  OrganizationThemeSettingsResponse,
  RecommendationsDownloadResponse,
  RecommendationsOptionsResponse,
  RecommendationsSummaryExpenseResponse,
  RI_BreakdownResponse,
  RI_SP_DataSourcesResponse,
  RI_SP_OrganizationsResponse,
  SP_BreakdownResponse,
} from '../mocks/ri-sp-coverage-page.mock';
import { InterceptionEntry } from '../types/interceptor.types';
import { expect } from '@playwright/test';

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
    {
      url: `/v2/organizations/[^/]+/geminis`,
      mock: GeminisResponse,
    },
    {
      url: `/v2/organizations/[^/]+/options/recommendations_download_options`,
      mock: RecommendationsDownloadResponse,
    },
    {
      url: `/v2/organizations/[^/]+/options\\?with_values=true`,
      mock: RecommendationsOptionsResponse,
    },
    {
      url: `/v2/organizations/[^/]+/summary_expenses\\?end_date`,
      mock: RecommendationsSummaryExpenseResponse,
    },
    {
      gql: 'OrganizationAllowedActions',
      mock: AllowedActionsResponse,
    },
    {
      gql: 'CurrentEmployee',
      mock: CurrentEmployeeResponse,
    },
    {
      gql: 'OrganizationFeatures',
      mock: OrganizationFeaturesResponse,
    },
    {
      gql: 'OrganizationThemeSettings',
      mock: OrganizationThemeSettingsResponse,
    },
    {
      gql: 'OrganizationPerspectives',
      mock: OrganizationPerspectivesResponse,
    },
    {
      url: `/v2/organizations/[^/]+/optimizations\\?limit=3&overview=true`,
      mock: OptimizationsLimitsResponse,
    }

  ];

  test.use({ restoreSession: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test('[232683] Verify mocked table data is displayed on the RI/SP coverage page', async ({ recommendationsPage, riSpCoveragePage }) => {
    let savingsValue: number;

    await test.step('Navigate to the RI/SP coverage page from recommendations page', async () => {
      await recommendationsPage.page.clock.setFixedTime(new Date('2026-02-10T00:00:00Z'));
      await recommendationsPage.navigateToURL();
      savingsValue = await recommendationsPage.getSavedWithCommitmentsValue();
      await recommendationsPage.clickRI_SPCard();
    });

    await test.step('Verify that the RI SP breakdown table displays the mocked data', async () => {
      await riSpCoveragePage.waitForAllCanvases();
      await riSpCoveragePage.table.waitFor();
      const tableSavingsValue = riSpCoveragePage.parseCurrencyValue(await riSpCoveragePage.targetSavingsTableCell.textContent());

      await expect(riSpCoveragePage.targetSP_UsageTableCell).toContainText('2393.2 hours');
      await expect(riSpCoveragePage.targetRI_UsageTableCell).toContainText('662 hours');
      await expect(riSpCoveragePage.targetTotalUsageTableCell).toContainText('3979.2 hours');
      await expect(riSpCoveragePage.targetSP_ExpensesTableCell).toContainText('$3,557.07');
      await expect(riSpCoveragePage.targetRI_ExpensesTableCell).toContainText('$266.65');
      expect(tableSavingsValue).toBe(savingsValue);
      await expect(riSpCoveragePage.targetTotalExpensesCell).toContainText('$10,238.65');
    });
  });
});
