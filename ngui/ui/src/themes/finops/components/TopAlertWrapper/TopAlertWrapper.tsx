import { useCallback, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { updateOrganizationTopAlert as updateOrganizationTopAlertActionCreator } from "@main/components/TopAlertWrapper/actionCreators";
import { useAllAlertsSelector } from "@main/components/TopAlertWrapper/selectors";
import TopAlert from "@main/components/TopAlertWrapper/TopAlert";
import type { AlertType, StoredAlert, TopAlertWrapperProps } from "@main/components/TopAlertWrapper/types";
import { useAllDataSources } from "hooks/coreData/useAllDataSources";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { AZURE_TENANT, ENVIRONMENT } from "utils/constants";
import { ALERT_TYPES } from "./constants";

const getEligibleDataSources = (dataSources) => dataSources.filter(({ type }) => ![ENVIRONMENT, AZURE_TENANT].includes(type));

const TopAlertWrapper = ({ blacklistIds = [] }: TopAlertWrapperProps) => {
  const dispatch = useDispatch();

  const { organizationId, isInactive: isOrganizationDisabled } = useOrganizationInfo();

  const storedAlerts = useAllAlertsSelector(organizationId);

  const dataSources = useAllDataSources();

  const eligibleDataSources = getEligibleDataSources(dataSources);

  const hasDataSourceInProcessing = eligibleDataSources.some(({ last_import_at: lastImportAt }) => lastImportAt === 0);

  const updateOrganizationTopAlert = useCallback(
    (alert: StoredAlert) => {
      dispatch(updateOrganizationTopAlertActionCreator(organizationId, alert));
    },
    [dispatch, organizationId]
  );

  useEffect(() => {
    const isDataSourcedProcessingAlertClosed = storedAlerts.some(
      ({ id, closed }) => id === ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING && closed
    );

    // "recharging" message about processing if closed, when no items are been processed
    if (!hasDataSourceInProcessing && isDataSourcedProcessingAlertClosed) {
      updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING, closed: false });
    }
  }, [hasDataSourceInProcessing, storedAlerts, updateOrganizationTopAlert]);

  const alerts = useMemo(() => {
    const isDataSourcesAreProceedingAlertTriggered = storedAlerts.some(
      ({ id, triggered }) => id === ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING && triggered
    );

    const isTriggered = (alertId: AlertType) => {
      const { triggered = false } = storedAlerts.find(({ id }) => id === alertId) || {};
      return triggered;
    };

    return [
      {
        id: ALERT_TYPES.INACTIVE_ORGANIZATION,
        condition: organizationId && isOrganizationDisabled,
        getContent: () => <FormattedMessage id="inactiveOrganization" />,
        onClose: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.INACTIVE_ORGANIZATION, closed: true });
        },
        type: "info",
        triggered: isTriggered(ALERT_TYPES.INACTIVE_ORGANIZATION),
        onTrigger: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.INACTIVE_ORGANIZATION, triggered: true });
        },
        dataTestId: "top_alert_inactive_organization"
      },
      {
        id: ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING,
        condition: hasDataSourceInProcessing,
        getContent: () => <FormattedMessage id="someDataSourcesAreProcessing" />,
        onClose: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING, closed: true });
        },
        triggered: isTriggered(ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING),
        onTrigger: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING, triggered: true });
        },
        dataTestId: "top_alert_data_processing"
      },
      {
        id: ALERT_TYPES.DATA_SOURCES_PROCEEDED,
        condition: !hasDataSourceInProcessing && isDataSourcesAreProceedingAlertTriggered,
        getContent: () => <FormattedMessage id="allDataSourcesProcessed" />,
        type: "success",
        triggered: isTriggered(ALERT_TYPES.DATA_SOURCES_PROCEEDED),
        onTrigger: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_PROCEEDED, triggered: true });
        },
        onClose: () => {
          updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING, closed: false, triggered: false });
          updateOrganizationTopAlert({ id: ALERT_TYPES.DATA_SOURCES_PROCEEDED, closed: false, triggered: false });
        },
        dataTestId: "top_alert_data_proceeded"
      }
    ];
  }, [storedAlerts, organizationId, isOrganizationDisabled, hasDataSourceInProcessing, updateOrganizationTopAlert]);

  const currentAlert = useMemo(
    () =>
      alerts
        .filter(({ condition }) => condition)
        // white list of notifications which might be showed on login page
        .filter(({ id }) => !blacklistIds.includes(id))
        // alerts are processed in order as they present in array => we show first non closed alert
        .find((alertDefinition) => {
          const { closed } = storedAlerts.find(({ id }) => id === alertDefinition.id) || {};
          return !closed;
        }),
    [alerts, blacklistIds, storedAlerts]
  );

  return currentAlert ? <TopAlert alert={currentAlert} /> : null;
};

export default TopAlertWrapper;
