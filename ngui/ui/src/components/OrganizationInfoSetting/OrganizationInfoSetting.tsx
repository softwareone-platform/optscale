import { useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import CopyText from "components/CopyText";
import IconButton from "components/IconButton";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import ModeWrapper from "components/ModeWrapper";
import EditOrganizationFormContainer from "containers/EditOrganizationFormContainer";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { OPTSCALE_MODE } from "utils/constants";
import { MPT_SPACING_2, SPACING_1 } from "utils/layouts";
import InlineSeverityAlert from "../InlineSeverityAlert";
import OrganizationCurrency from "./OrganizationCurrency";

const OrganizationId = ({ id }) => (
  <KeyValueLabel
    isBoldKeyLabel
    keyMessageId="id"
    value={
      <CopyText
        variant="inherit"
        text={id}
        sx={{
          fontWeight: "inherit"
        }}
      >
        {id}
      </CopyText>
    }
  />
);

const OrganizationName = ({ name }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const enableEditMode = () => setIsEditMode(true);
  const disableEditMode = () => setIsEditMode(false);

  const isEditAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return isEditMode ? (
    <EditOrganizationFormContainer onCancel={disableEditMode} onSuccess={disableEditMode} />
  ) : (
    <Box display="flex" alignItems="center">
      <KeyValueLabel keyMessageId="name" isBoldKeyLabel value={name} sx={{ marginRight: 1 }} />
      {isEditAllowed && (
        <IconButton
          icon={<CreateOutlinedIcon />}
          onClick={enableEditMode}
          tooltip={{
            show: true,
            messageId: "edit"
          }}
        />
      )}
    </Box>
  );
};

const OrganizationInfoSetting = () => {
  const { name: organizationName, organizationId, currency } = useOrganizationInfo();

  return (
    <Stack spacing={SPACING_1}>
      <Box>
        <OrganizationId id={organizationId} />
      </Box>
      <Box display="flex">
        <OrganizationName name={organizationName} />
      </Box>
      <ModeWrapper mode={OPTSCALE_MODE.FINOPS}>
        <Box>
          <OrganizationCurrency currencyCode={currency} />
        </Box>
        <Box marginTop={MPT_SPACING_2}>
          <InlineSeverityAlert messageId="organizationCurrencyDescription" />
        </Box>
      </ModeWrapper>
    </Stack>
  );
};

export default OrganizationInfoSetting;
