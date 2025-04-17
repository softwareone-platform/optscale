import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import Stack from "@mui/material/Stack";
import ActionBar from "components/ActionBar";
import DataSourceMultiSelect from "components/DataSourceMultiSelect";
import Mocked, { MESSAGE_TYPES } from "components/Mocked";
import PageContentWrapper from "components/PageContentWrapper";
import RecommendationsOverviewContainer from "containers/RecommendationsOverviewContainer";
import RecommendationsOverviewContainerMocked from "containers/RecommendationsOverviewContainer/RecommendationsOverviewContainerMocked";
import { useAllDataSources } from "hooks/coreData/useAllDataSources";
import { useIsNebiusConnectionEnabled } from "hooks/useIsNebiusConnectionEnabled";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";
import { useSyncQueryParamWithState } from "hooks/useSyncQueryParamWithState";
import RecommendationsOverviewService from "services/RecommendationsOverviewService";
import { ARCHIVED_RECOMMENDATIONS } from "urls";
import { AWS_CNR, AZURE_CNR, ALIBABA_CNR, GCP_CNR, NEBIUS } from "utils/constants";
import { SPACING_2 } from "utils/layouts";

const DATA_SOURCES_QUERY_NAME = "dataSourceId";

// Always included in recommendations
const RECOMMENDABLE_DATA_SOURCES_BASE = [AWS_CNR, AZURE_CNR, ALIBABA_CNR, GCP_CNR];

const RecommendationsPage = ({ isMock }) => {
  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const dataSources = useAllDataSources();

  const isNebiusConnectionEnabled = useIsNebiusConnectionEnabled();
  const [selectedDataSourceIds, setSelectedDataSourceIds] = useSyncQueryParamWithState({
    queryParamName: DATA_SOURCES_QUERY_NAME,
    defaultValue: [],
    parameterIsArray: true
  });

  const selectedDataSourceTypes: string[] = Array.from(
    new Set(
      dataSources
        .filter((cloudAccount) => selectedDataSourceIds.includes(cloudAccount.id))
        .map((cloudAccount) => cloudAccount.type)
    )
  );

  const { forceCheck, isForceCheckAvailable } = RecommendationsOverviewService().useForceCheck();

  const recommendationsActionBar = {
    title: {
      messageId: "recommendations",
      dataTestId: "lbl_recommendations"
    },
    items: [
      {
        key: "archive",
        dataTestId: "btn_archive",
        icon: <RestoreOutlinedIcon />,
        messageId: "archive",
        type: "button",
        color: "primary",
        link: ARCHIVED_RECOMMENDATIONS
      },
      {
        key: "forceCheck",
        dataTestId: "btn_force_check",
        icon: <CachedOutlinedIcon />,
        messageId: "forceCheck",
        type: "button",
        color: "primary",
        disabled: isRestricted || !isForceCheckAvailable,
        action: forceCheck,
        tooltip: {
          show: isRestricted,
          value: restrictionReasonMessage
        }
      }
    ]
  };

  return (
    <>
      <ActionBar data={recommendationsActionBar} />
      <PageContentWrapper>
        <Stack spacing={SPACING_2} sx={{ minHeight: "100%", width: "100%" }}>
          <div>
            <DataSourceMultiSelect
              allDataSources={dataSources.filter((dataSource) =>
                [...RECOMMENDABLE_DATA_SOURCES_BASE, ...(isNebiusConnectionEnabled ? [NEBIUS] : [])].includes(dataSource.type)
              )}
              dataSourceIds={selectedDataSourceIds}
              onChange={setSelectedDataSourceIds}
              displayEmpty
            />
          </div>
          <div style={{ minHeight: "100%" }}>
            {isMock ? (
              <RecommendationsOverviewContainerMocked />
            ) : (
              <RecommendationsOverviewContainer
                selectedDataSourceIds={selectedDataSourceIds}
                selectedDataSourceTypes={selectedDataSourceTypes}
              />
            )}
          </div>
        </Stack>
      </PageContentWrapper>
    </>
  );
};

const Recommendations = () => (
  <Mocked backdropMessageType={MESSAGE_TYPES.RECOMMENDATIONS} mock={<RecommendationsPage isMock />}>
    <RecommendationsPage />
  </Mocked>
);

export default Recommendations;
