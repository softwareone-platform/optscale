import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import ActionBar from "components/ActionBar";
import ClusterTypesTable from "components/ClusterTypesTable";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import PageContentWrapper from "components/PageContentWrapper";
import { DOCS_HYSTAX_CLUSTERS, RESOURCES } from "urls";
import { KU_SPACING_2 } from "../../utils/layouts";

const actionBarDefinition = {
  breadcrumbs: [
    <Link key={1} to={RESOURCES} component={RouterLink}>
      <FormattedMessage id="resources" />
    </Link>
  ],
  title: {
    text: <FormattedMessage id="clusterTypesTitle" />,
    dataTestId: "lbl_cluster_types"
  }
};

const ExplanationMessage = () => (
  <InlineSeverityAlert
    messageId="clusterTypesDescription"
    messageDataTestId="p_clusters_list"
    messageValues={{
      link: (chunks) => (
        <Link data-test-id="link_read_more" href={DOCS_HYSTAX_CLUSTERS} target="_blank" rel="noopener">
          {chunks}
        </Link>
      )
    }}
  />
);

const ClusterTypes = ({ clusterTypes, onUpdatePriority, isLoading = false }) => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <Grid direction="row" container spacing={3}>
        <Grid item xs={12} className={"KuBoxShadowRoot"}>
          <Box>
            <Box marginBottom={KU_SPACING_2}>
              <ExplanationMessage />
            </Box>
            <ClusterTypesTable clusterTypes={clusterTypes} onUpdatePriority={onUpdatePriority} isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>
    </PageContentWrapper>
  </>
);

export default ClusterTypes;
