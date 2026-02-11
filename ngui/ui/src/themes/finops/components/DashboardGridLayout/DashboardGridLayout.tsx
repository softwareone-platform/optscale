import { type ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2 } from "@theme/utils/layouts";
import CapabilityWrapper from "components/CapabilityWrapper";
import { OPTSCALE_CAPABILITY } from "utils/constants";

type DashboardGridLayoutProps = {
  topResourcesExpensesCard: ReactNode;
  policiesCard: ReactNode;
  organizationExpenses: ReactNode;
  recommendationsCard: ReactNode;
  poolsRequiringAttentionCard: ReactNode;
  recentTasksCard: ReactNode;
  recentModelsCard: ReactNode;
};

const DashboardGridLayout = ({
  topResourcesExpensesCard,
  policiesCard,
  organizationExpenses,
  recommendationsCard,
  poolsRequiringAttentionCard,
  recentTasksCard,
  recentModelsCard
}: DashboardGridLayoutProps) => {
  const squareNodes = [
    {
      key: "recentModelsCard",
      node: recentModelsCard,
      capability: OPTSCALE_CAPABILITY.MLOPS
    },
    {
      key: "recentTasksCard",
      node: recentTasksCard,
      capability: OPTSCALE_CAPABILITY.MLOPS
    },
    { key: "organizationExpenses", node: organizationExpenses },
    {
      key: "topResourcesExpensesCard",
      node: topResourcesExpensesCard,
      capability: OPTSCALE_CAPABILITY.FINOPS
    },
    { key: "recommendationsCard", node: recommendationsCard },
    {
      key: "policiesCard",
      node: policiesCard,
      capability: OPTSCALE_CAPABILITY.FINOPS
    },
    {
      key: "poolsRequiringAttentionCard",
      node: poolsRequiringAttentionCard,
      capability: OPTSCALE_CAPABILITY.FINOPS
    }
  ].filter(({ node }) => Boolean(node));

  return (
    <Grid spacing={3} borderRight={"none"} borderLeft={"none"} container>
      {squareNodes.map(({ key, node, capability }) => (
        <CapabilityWrapper capability={capability} key={key}>
          <Grid sx={{ "& > .MuiCard-root": MPT_BOX_WHITE_SHADOW_RADIUS_2 }} item xs={12} lg={6}>
            {node}
          </Grid>
        </CapabilityWrapper>
      ))}
    </Grid>
  );
};

export default DashboardGridLayout;
