import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";
import InfoChip from "components/InfoChip";
import MfaMethodTile from "components/MfaMethodTile";
import { SPACING_2 } from "utils/layouts";

const METHOD_DESCRIPTION_MESSAGE_ID: Record<MfaMethodType, string> = {
  [MFA_METHOD_TYPE.TOTP]: "mfaSetup:authenticatorAppDescription",
  [MFA_METHOD_TYPE.EMAIL]: "mfaSetup:emailCodeDescription",
};

// Fixed order, the one the designs show.
const METHOD_TYPES: MfaMethodType[] = [MFA_METHOD_TYPE.TOTP, MFA_METHOD_TYPE.EMAIL];

type MfaMethodChoiceProps = {
  confirmedTypes: MfaMethodType[];
  onChoose: (type: MfaMethodType) => void;
};

const MfaMethodChoice = ({ confirmedTypes, onChoose }: MfaMethodChoiceProps) => (
  <Stack spacing={SPACING_2}>
    <Typography>
      <FormattedMessage id="mfaSetup:selectMethod" />
    </Typography>
    {METHOD_TYPES.map((type) => {
      // One e-mail method only — the service answers 409 for a second; any number of authenticator apps.
      const isConfirmed = type === MFA_METHOD_TYPE.EMAIL && confirmedTypes.includes(type);

      return (
        <MfaMethodTile
          key={type}
          type={type}
          description={<FormattedMessage id={METHOD_DESCRIPTION_MESSAGE_ID[type]} />}
          chip={
            isConfirmed && (
              <InfoChip
                label={<FormattedMessage id="mfaSetup:alreadySetUp" />}
                data-test-id={`chip_mfa_method_set_up_${type}`}
              />
            )
          }
          onClick={() => onChoose(type)}
          disabled={isConfirmed}
          testId={`btn_choose_mfa_method_${type}`}
        />
      );
    })}
  </Stack>
);

export default MfaMethodChoice;
