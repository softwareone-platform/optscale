import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import PowerOffOutlinedIcon from "@mui/icons-material/PowerOffOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import ActionBar from "components/ActionBar";
import AdvancedDataSourceDetails from "components/AdvancedDataSourceDetails";
import DataSourceDetails from "components/DataSourceDetails";
import PageContentWrapper from "components/PageContentWrapper";
import {
  DisconnectCloudAccountModal,
  UpdateDataSourceCredentialsModal,
  RenameDataSourceModal,
  KubernetesIntegrationModal,
  DataSourceBillingReimportModal
} from "components/SideModalManager/SideModals";
import SummaryGrid from "components/SummaryGrid";
import TabsWrapper from "components/TabsWrapper";
import DataSourceNodesContainer from "containers/DataSourceNodesContainer";
import DataSourceSkusContainer from "containers/DataSourceSkusContainer";
import UploadCloudReportDataContainer from "containers/UploadCloudReportDataContainer";
import { useAllDataSources } from "hooks/coreData/useAllDataSources";
import { useDataSources } from "hooks/useDataSources";
import { useIsFeatureEnabled } from "hooks/useIsFeatureEnabled";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { CLOUD_ACCOUNTS } from "urls";
import {
  AWS_CNR,
  KUBERNETES_CNR,
  SUMMARY_VALUE_COMPONENT_TYPES,
  SUMMARY_CARD_TYPES,
  CLOUD_ACCOUNT_DETAILS_PAGE_TABS,
  ENVIRONMENT,
  AZURE_TENANT,
  DATABRICKS,
  AZURE_CNR,
  GCP_CNR,
  ALIBABA_CNR,
  NEBIUS,
  GCP_TENANT
} from "utils/constants";
import { summarizeChildrenDetails } from "utils/dataSources";
import { MPT_SPACING_3, SPACING_2 } from "utils/layouts";
import { getPercentageChangeModule, round } from "utils/math";

const {
  DETAILS: DETAILS_TAB,
  UPLOAD: UPLOAD_TAB,
  NODES: NODES_TAB,
  ADVANCED: ADVANCED_TAB,
  PRICING: PRICING_TAB
} = CLOUD_ACCOUNT_DETAILS_PAGE_TABS;

const PageActionBar = ({ id, type, parentId, name, config, lastImportAt, isLoading }) => {
  const openSideModal = useOpenSideModal();

  // TODO: initial values from useDataSources are default ones, which means logo is empty, Icon is null, JSX error in console.
  // Additional check on Icon mount below.
  // Loading state is inconsistent, the title is not displayed at all on initial load
  const { logo, icon: Icon } = useDataSources(type);

  const getActionBarItems = () => {
    const getBillingReimportButton = () => {
      const hasPreviousImport = lastImportAt !== 0;

      const isEligibleForReimport =
        (type === AWS_CNR && !config.linked) || [AZURE_CNR, GCP_CNR, ALIBABA_CNR, NEBIUS].includes(type);

      return {
        show: isEligibleForReimport,
        getItem: () => ({
          key: "cloudAccountDetails-reimport-expenses",
          icon: <CloudDownloadOutlinedIcon fontSize="small" />,
          messageId: "billingReimportTitle",
          dataTestId: "btn_expenses_reimport_data_source_modal",
          type: "button",
          isLoading,
          action: () => openSideModal(DataSourceBillingReimportModal, { name, id, type, config }),
          requiredActions: ["MANAGE_CLOUD_CREDENTIALS"],
          disabled: !hasPreviousImport,
          tooltip: {
            show: !hasPreviousImport,
            value: <FormattedMessage id="dataSourceNoBillingReportsProcessedYet" />
          }
        })
      };
    };

    return [
      {
        show: type === KUBERNETES_CNR,
        getItem: () => ({
          key: "cloudAccountDetails-k8s-integration",
          icon: <SettingsIcon fontSize="small" />,
          messageId: "kubernetesIntegration",
          dataTestId: "btn_kubernetes_integration_modal",
          type: "button",
          isLoading,
          action: () =>
            openSideModal(KubernetesIntegrationModal, {
              dataSourceId: id,
              user: config.user
            })
        })
      },
      {
        show: true,
        getItem: () => ({
          key: "cloudAccountDetails-rename",
          icon: <SettingsIcon fontSize="small" />,
          messageId: "rename",
          dataTestId: "btn_rename_data_source_modal",
          type: "button",
          isLoading,
          action: () => openSideModal(RenameDataSourceModal, { name, id }),
          requiredActions: ["MANAGE_CLOUD_CREDENTIALS"]
        })
      },
      {
        show: type !== ENVIRONMENT,
        getItem: () => ({
          key: "cloudAccountDetails-update-credentials",
          icon: <SettingsIcon fontSize="small" />,
          messageId: "updateCredentials",
          dataTestId: "btn_update_data_source_credentials_modal",
          type: "button",
          isLoading,
          action: () => openSideModal(UpdateDataSourceCredentialsModal, { name, id, type, config }),
          requiredActions: ["MANAGE_CLOUD_CREDENTIALS"],
          disabled: parentId,
          tooltip: {
            show: parentId,
            value: <FormattedMessage id="updateChildDataSourceCredentialsWarning" />
          }
        })
      },
      getBillingReimportButton(),
      {
        show: type !== ENVIRONMENT,
        getItem: () => ({
          key: "cloudAccountDetails-disconnect",
          icon: <PowerOffOutlinedIcon fontSize="small" />,
          messageId: "disconnect",
          dataTestId: "btn_open_disconnect_data_source_modal",
          type: "button",
          isLoading,
          action: () => openSideModal(DisconnectCloudAccountModal, { name, id, type, parentId }),
          requiredActions: ["MANAGE_CLOUD_CREDENTIALS"]
        })
      }
    ]
      .map(({ show, getItem }) => (show ? getItem() : null))
      .filter((item) => item !== null);
  };

  const actionBarDefinition = {
    breadcrumbs: [
      <Link key={1} to={CLOUD_ACCOUNTS} component={RouterLink}>
        <FormattedMessage id="dataSourcesTitle" />
      </Link>
    ],
    title: {
      text: name,
      dataTestId: "lbl_cloud_name",
      isLoading,
      logo: logo
        ? {
            src: logo,
            alt: type,
            dataTestId: `img_${type}`
          }
        : // TODO: icon is used fro Environment only, replace with custom svg and keep only `logo`
          { icon: Icon && <Icon /> }
    },
    items: getActionBarItems()
  };

  return <ActionBar data={actionBarDefinition} />;
};

const Summary = ({ lastMonthCost, cost, forecast, isLoading }) => {
  const getSummaryData = () =>
    lastMonthCost
      ? [
          {
            key: "totalExpensesMonthToDate",
            type: SUMMARY_CARD_TYPES.EXTENDED,
            valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
            valueComponentProps: {
              value: cost
            },
            captionMessageId: "totalExpensesMonthToDate",
            relativeValueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedNumber,
            relativeValueComponentProps: {
              value: getPercentageChangeModule(cost, lastMonthCost) / 100,
              format: "percentage"
            },
            relativeValueCaptionMessageId: cost > lastMonthCost ? "moreThanForPreviousMonth" : "lessThanForPreviousMonth",
            dataTestIds: {
              cardTestId: "card_total_exp"
            },
            color: cost > lastMonthCost ? "error" : "success",
            isLoading
          },
          {
            key: "forecastForThisMonth",
            type: SUMMARY_CARD_TYPES.EXTENDED,
            valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
            valueComponentProps: {
              value: forecast
            },
            captionMessageId: "forecastForThisMonth",
            relativeValueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedNumber,
            relativeValueComponentProps: {
              value: getPercentageChangeModule(forecast, lastMonthCost) / 100,
              format: "percentage"
            },
            relativeValueCaptionMessageId: forecast > lastMonthCost ? "moreThanForPreviousMonth" : "lessThanForPreviousMonth",
            dataTestIds: {
              cardTestId: "card_forecast"
            },
            color: forecast > lastMonthCost ? "error" : "success",
            isLoading
          }
        ]
      : [
          {
            key: "totalExpensesMonthToDate",
            valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
            valueComponentProps: {
              value: cost
            },
            captionMessageId: "totalExpensesMonthToDate",
            dataTestIds: {
              cardTestId: "card_total_exp"
            },
            isLoading
          },
          {
            key: "forecastForThisMonth",
            valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
            valueComponentProps: {
              value: forecast
            },
            captionMessageId: "forecastForThisMonth",
            dataTestIds: {
              cardTestId: "card_forecast"
            },
            isLoading
          }
        ];

  return <SummaryGrid summaryData={getSummaryData()} summaryStyle="customBox" />;
};

const Tabs = ({
  id,
  accountId,
  parentId,
  type,
  lastImportAt,
  lastImportAttemptAt,
  lastImportAttemptError,
  lastMetricsRetrieval,
  lastMetricsRetrievalAttempt,
  lastGettingMetricAttemptError,
  discoveryInfos,
  config,
  isLoading,
  isTenant
}) => {
  const isAwsReportUploadEnabled = useIsFeatureEnabled("show_aws_upload_report");

  const tabs = [
    {
      title: DETAILS_TAB,
      dataTestId: "tab_details",
      node: !!id && <DataSourceDetails id={id} parentId={parentId} accountId={accountId} type={type} config={config} />,
      renderCondition: () => type !== ENVIRONMENT
    },
    {
      title: ADVANCED_TAB,
      dataTestId: "tab_advanced",
      node: !!id && (
        <AdvancedDataSourceDetails
          lastImportAt={lastImportAt}
          lastImportAttemptAt={lastImportAttemptAt}
          lastImportAttemptError={lastImportAttemptError}
          lastMetricsRetrieval={lastMetricsRetrieval}
          lastMetricsRetrievalAttempt={lastMetricsRetrievalAttempt}
          lastGettingMetricAttemptError={lastGettingMetricAttemptError}
          discoveryInfos={discoveryInfos}
        />
      ),
      renderCondition: () => !isTenant
    },
    {
      title: UPLOAD_TAB,
      dataTestId: "tab_upload",
      node: !!id && <UploadCloudReportDataContainer cloudAccountId={id} />,
      renderCondition: () => type === AWS_CNR && isAwsReportUploadEnabled
    },
    {
      title: NODES_TAB,
      dataTestId: "tab_cost_model",
      node: !!id && <DataSourceNodesContainer cloudAccountId={id} costModel={config.cost_model} />,
      renderCondition: () => type === KUBERNETES_CNR
    },
    {
      title: PRICING_TAB,
      dataTestId: "tab_pricing",
      node: !!id && <DataSourceSkusContainer dataSourceId={id} costModel={config.cost_model} />,
      renderCondition: () => type === DATABRICKS
    }
  ];

  return (
    <TabsWrapper
      headerSx={{ margin: `-${MPT_SPACING_3} -${MPT_SPACING_3} 0`, padding: `0 ${MPT_SPACING_3}` }}
      isLoading={isLoading}
      tabsProps={{
        tabs,
        name: "cloud-account",
        defaultTab: type === ENVIRONMENT ? ADVANCED_TAB : DETAILS_TAB
      }}
    />
  );
};

const CloudAccountDetails = ({ data = {}, isLoading = false }) => {
  const {
    id,
    name = "",
    type,
    parent_id: parentId,
    account_id: accountId,
    last_import_at: lastImportAt,
    last_import_attempt_at: lastImportAttemptAt,
    last_import_attempt_error: lastImportAttemptError,
    last_getting_metrics_at: lastMetricsRetrieval,
    last_getting_metric_attempt_at: lastMetricsRetrievalAttempt,
    last_getting_metric_attempt_error: lastGettingMetricAttemptError,
    details = {},
    config = {}
  } = data;

  const dataSources = useAllDataSources();

  const childrenDataSources = dataSources.filter(({ parent_id: accountParentId }) => accountParentId === id);

  const childrenDetails = summarizeChildrenDetails(childrenDataSources);

  const {
    cost = 0,
    last_month_cost: lastMonthCost = 0,
    forecast = 0,
    discovery_infos: discoveryInfos
  } = { ...details, ...childrenDetails };

  const isTenant = [AZURE_TENANT, GCP_TENANT].includes(type);
  const isChildSubscription = Boolean(parentId);
  const isSubscription = !isTenant && !isChildSubscription;

  return (
    <>
      <PageActionBar
        id={id}
        type={type}
        name={name}
        parentId={parentId}
        config={config}
        lastImportAt={lastImportAt}
        isLoading={isLoading}
      />
      <PageContentWrapper>
        <Grid container spacing={SPACING_2}>
          <Grid item>
            <Summary
              lastMonthCost={round(lastMonthCost, 2)}
              cost={round(cost, 2)}
              forecast={round(forecast, 2)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className={"MTPBoxShadow"}>
              <Tabs
                id={id}
                accountId={accountId}
                name={name}
                type={type}
                parentId={parentId}
                lastImportAt={lastImportAt}
                lastImportAttemptAt={lastImportAttemptAt}
                lastImportAttemptError={lastImportAttemptError}
                lastMetricsRetrieval={lastMetricsRetrieval}
                lastMetricsRetrievalAttempt={lastMetricsRetrievalAttempt}
                lastGettingMetricAttemptError={lastGettingMetricAttemptError}
                discoveryInfos={discoveryInfos}
                config={config}
                isLoading={isLoading}
                isTenant={isTenant}
                isChildSubscription={isChildSubscription}
                isSubscription={isSubscription}
              />
            </Box>
          </Grid>
        </Grid>
      </PageContentWrapper>
    </>
  );
};

export default CloudAccountDetails;
