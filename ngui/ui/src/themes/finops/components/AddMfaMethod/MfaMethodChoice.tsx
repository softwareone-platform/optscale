import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethodType } from "@theme/api/auth/mfaMethod";
import MfaMethodTile from "@theme/components/MfaMethodTile";
import InfoChip from "@theme/shared/components/InfoChip";
import { SPACING_2 } from "utils/layouts";

const METHOD_DESCRIPTION_MESSAGE_ID: Record<MfaMethodType, string> = {
  [MFA_METHOD_TYPE.TOTP]: "mfaSetup:authenticatorAppDescription",
  [MFA_METHOD_TYPE.EMAIL]: "mfaSetup:emailCodeDescription"
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
      // A type can be set up once; the service answers 409 for a second one.
      const isConfirmed = confirmedTypes.includes(type);

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
