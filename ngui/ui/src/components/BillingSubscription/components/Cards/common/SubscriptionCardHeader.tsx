import { ReactNode } from "react";
import { Box } from "@mui/material";
import { BillingSubscriptionStatus } from "graphql/__generated__/hooks/restapi";
import { SPACING_1 } from "utils/layouts";
import StatusBadge from "../../StatusBadge";

type SubscriptionCardHeaderProps = {
  content: ReactNode;
  status: BillingSubscriptionStatus;
};

const SubscriptionCardHeader = ({ content, status }: SubscriptionCardHeaderProps) => (
  <Box display="flex" gap={SPACING_1} alignItems="center">
    <Box>{content}</Box>
    <StatusBadge status={status} />
  </Box>
);

export default SubscriptionCardHeader;
