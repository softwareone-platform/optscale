import { FormEvent, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethod } from "api/auth/mfaMethod";
import FullWidthButton from "components/FullWidthButton";
import InfoChip from "components/InfoChip";
import MfaMethodTile from "components/MfaMethodTile";
import { SPACING_2, SPACING_3 } from "utils/layouts";

type MfaMethodPickerProps = {
  methods: MfaMethod[];
  initiallySelectedMethodId: string | null;
  onUseSelectedMethod: (methodId: string) => void;
  onBack: () => void;
};

const TITLE_ID = "mfa_method_picker_title";

const MfaMethodPicker = ({ methods, initiallySelectedMethodId, onUseSelectedMethod, onBack }: MfaMethodPickerProps) => {
  const [selectedMethodId, setSelectedMethodId] = useState(initiallySelectedMethodId ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedMethodId) {
      onUseSelectedMethod(selectedMethodId);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={SPACING_3}>
        <Typography id={TITLE_ID} fontWeight="bold" data-test-id="p_verify_your_identity">
          <FormattedMessage id="signIn:verifyYourIdentity" />
        </Typography>
        <RadioGroup
          aria-labelledby={TITLE_ID}
          value={selectedMethodId}
          onChange={(_, methodId) => setSelectedMethodId(methodId)}
          sx={{ gap: SPACING_2 }}
        >
          {methods.map((method) => (
            <MfaMethodTile
              key={method.id}
              type={method.type}
              description={method.label}
              chip={
                method.is_default && <InfoChip label={<FormattedMessage id="default" />} data-test-id="chip_default_method" />
              }
              start={<Radio value={method.id} />}
              isSelected={method.id === selectedMethodId}
              testId={`mfa_method_option_${method.id}`}
            />
          ))}
        </RadioGroup>
        <Stack spacing={SPACING_2}>
          <FullWidthButton
            type="submit"
            disabled={!selectedMethodId}
            messageId="signIn:useSelectedMethod"
            dataTestId="btn_use_selected_method"
          />
          <FullWidthButton color="secondary" onClick={onBack} messageId="back" dataTestId="btn_back_from_method_picker" />
        </Stack>
      </Stack>
    </form>
  );
};

export default MfaMethodPicker;
