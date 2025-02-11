import { useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
<<<<<<< HEAD
=======
import { FormattedMessage } from "react-intl";
import CapabilityWrapper from "components/CapabilityWrapper";
>>>>>>> upstream/integration
import CopyText from "components/CopyText";
import IconButton from "components/IconButton";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import Tooltip from "components/Tooltip";
import EditOrganizationFormContainer from "containers/EditOrganizationFormContainer";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
<<<<<<< HEAD
import { OPTSCALE_MODE } from "utils/constants";
import { MPT_SPACING_2, SPACING_1 } from "utils/layouts";
import InlineSeverityAlert from "../InlineSeverityAlert";
=======
import { OPTSCALE_CAPABILITY } from "utils/constants";
import { SPACING_1 } from "utils/layouts";
import { sliceByLimitWithEllipsis } from "utils/strings";
>>>>>>> upstream/integration
import OrganizationCurrency from "./OrganizationCurrency";

type OrganizationIdProps = {
  id: string;
};

type OrganizationNameProps = {
  name: string;
};

const MAX_ORGANIZATION_NAME_LENGTH = 64;

const OrganizationId = ({ id }: OrganizationIdProps) => (
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

const OrganizationName = ({ name }: OrganizationNameProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const enableEditMode = () => setIsEditMode(true);
  const disableEditMode = () => setIsEditMode(false);

  const isEditAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

<<<<<<< HEAD
  return isEditMode ? (
    <EditOrganizationFormContainer onCancel={disableEditMode} onSuccess={disableEditMode} />
  ) : (
    <Box display="flex" alignItems="center">
      <KeyValueLabel keyMessageId="name" isBoldKeyLabel value={name} sx={{ marginRight: 1 }} />
=======
  if (isEditMode) {
    return <EditOrganizationFormContainer onCancel={disableEditMode} onSuccess={disableEditMode} />;
  }

  const isNameLong = name.length > MAX_ORGANIZATION_NAME_LENGTH;

  return (
    <Box display="flex" alignItems="center" gap={SPACING_1} width="50%">
      <KeyValueLabel
        keyMessageId="name"
        value={
          <Tooltip title={isNameLong ? name : undefined} placement="top">
            <span>{isNameLong ? sliceByLimitWithEllipsis(name, MAX_ORGANIZATION_NAME_LENGTH) : name}</span>
          </Tooltip>
        }
      />
>>>>>>> upstream/integration
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
      <CapabilityWrapper capability={OPTSCALE_CAPABILITY.FINOPS}>
        <Box>
          <OrganizationCurrency currencyCode={currency} />
        </Box>
<<<<<<< HEAD
        <Box marginTop={MPT_SPACING_2}>
          <InlineSeverityAlert messageId="organizationCurrencyDescription" />
        </Box>
      </ModeWrapper>
=======
      </CapabilityWrapper>
>>>>>>> upstream/integration
    </Stack>
  );
};

export default OrganizationInfoSetting;
