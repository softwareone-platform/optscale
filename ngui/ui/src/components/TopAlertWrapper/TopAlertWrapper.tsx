import { useCallback, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useAllDataSources } from "hooks/coreData/useAllDataSources";
// import { useGetToken } from "hooks/useGetToken";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { AZURE_TENANT, ENVIRONMENT } from "utils/constants";
import { updateOrganizationTopAlert as updateOrganizationTopAlertActionCreator } from "./actionCreators";
import { ALERT_TYPES } from "./constants";
import { useAllAlertsSelector } from "./selectors";
import TopAlert from "./TopAlert";
import type { AlertType, StoredAlert, TopAlertWrapperProps } from "./types";

const getEligibleDataSources = (dataSources) => dataSources.filter(({ type }) => ![ENVIRONMENT, AZURE_TENANT].includes(type));

// MPT_TODO: disabled optScale github buttons
// const GitHubInlineButton = ({ children, ariaLabelMessageId, href, dataIcon }) => {
//   const intl = useIntl();
//   const anchorRef = useCallback((anchor) => {
//     if (anchor && anchor.parentNode) {
//       renderGithubButton(anchor, (el) => {
//         anchor.parentNode.replaceChild(el, anchor);
//       });
//     }
//   }, []);
//   return (
//     <Box display="inline-block" sx={{ verticalAlign: "middle" }} mx={SPACING_1}>
//       <a
//         href={href}
//         data-icon={dataIcon}
//         aria-label={intl.formatMessage({ id: ariaLabelMessageId })}
//         data-show-count
//         ref={anchorRef}
//       >
//         {children}
//       </a>
//     </Box>
//   );
// };

const TopAlertWrapper = ({ blacklistIds = [] }: TopAlertWrapperProps) => {
  const dispatch = useDispatch();

  const { organizationId, isInactive: isOrganizationDisabled } = useOrganizationInfo();

  // const { userId } = useGetToken();

  const storedAlerts = useAllAlertsSelector(organizationId);

  // const { rootData: isExistingUser = false } = useRootData(IS_EXISTING_USER);

  const dataSources = useAllDataSources();

  // const { isDataReady: isDataSourceReady } = useApiState(GET_DATA_SOURCES, organizationId);

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
      // MPT_TODO: disabled openSourceAnnouncement
      // {
      //   id: ALERT_TYPES.OPEN_SOURCE_ANNOUNCEMENT,
      //   // isExistingUser — true only if user was logged in/visited optscale before. Set in migrations.
      //   // organizationId — wont be presented on initial load (so storedAlerts will be empty, so even if banner was closed, we would not know that,
      //   //                  so we need to wait for organizationId. But if user is not logged in — there also wont be organizationId, so we use next flag)
      //   // userId — presented after login
      //   // this check means "condition: not logged in new user (!isExistingUser && !userId) OR new user and we know organization id (!isExistingUser && organizationId)"
      //   condition: !isExistingUser && (!userId || organizationId),
      //   getContent: () => (
      //     <Box sx={{ textAlign: "center" }}>
      //       <FormattedMessage
      //         id="openSourceAnnouncement"
      //         values={{
      //           star: (chunks) => (
      //             <GitHubInlineButton
      //               ariaLabelMessageId="starHystaxOnGithub"
      //               dataIcon="octicon-star"
      //               href={GITHUB_HYSTAX_OPTSCALE_REPO}
      //             >
      //               {chunks}
      //             </GitHubInlineButton>
      //           )
      //         }}
      //       />
      //     </Box>
      //   ),
      //   type: "info",
      //   triggered: isTriggered(ALERT_TYPES.OPEN_SOURCE_ANNOUNCEMENT),
      //   onClose: () => {
      //     updateOrganizationTopAlert({ id: ALERT_TYPES.OPEN_SOURCE_ANNOUNCEMENT, closed: true });
      //   },
      //   dataTestId: "top_alert_open_source_announcement"
      // },
      // {
      //   id: ALERT_TYPES.MLOPS_REMOVAL_ANNOUNCEMENT,
      //   condition: userId && organizationId,
      //   type: "info",
      //   triggered: isTriggered(ALERT_TYPES.MLOPS_REMOVAL_ANNOUNCEMENT),
      //   getContent: () => (
      //     <FormattedMessage
      //       id="mlopsFunctionalityRemovalAnnouncement"
      //       values={{
      //         email: <MailTo email={EMAIL_SUPPORT} text={EMAIL_SUPPORT} color="white" />
      //       }}
      //     />
      //   ),
      //   onClose: () => {
      //     updateOrganizationTopAlert({ id: ALERT_TYPES.MLOPS_REMOVAL_ANNOUNCEMENT, closed: true });
      //   },
      //   dataTestId: "top_alert_mlops_removal_announcement"
      // }
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
