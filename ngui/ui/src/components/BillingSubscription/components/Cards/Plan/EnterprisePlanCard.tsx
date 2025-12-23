import { Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { SPACING_2 } from "utils/layouts";
import { ContactSalesButton } from "../../Actions";
import { EnterprisePlanFeatures } from "../../Features";
import { BaseCard, PlanName } from "../common";

const EnterprisePlanCard = () => (
  <BaseCard
    header={<PlanName name={<FormattedMessage id="enterprise" />} />}
    body={
      <Stack spacing={SPACING_2}>
        <Typography variant="body2" fontWeight="bold">
          <FormattedMessage id="everythingInProPlus" />
        </Typography>
        <EnterprisePlanFeatures />
      </Stack>
    }
    footer={<ContactSalesButton />}
  />
);

export default EnterprisePlanCard;
