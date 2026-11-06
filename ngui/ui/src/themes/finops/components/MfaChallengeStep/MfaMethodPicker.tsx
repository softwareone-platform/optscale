import { FormEvent, useState } from "react";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethod } from "@theme/api/auth/signIn";
import Button from "components/Button";
import { SPACING_1, SPACING_2, SPACING_3 } from "utils/layouts";
import { MFA_METHOD_NAME_MESSAGE_ID } from "./constants";
import useStyles from "./MfaChallengeStep.styles";
import MfaMethodIcon from "./MfaMethodIcon";

type MfaMethodPickerProps = {
  methods: MfaMethod[];
  initiallySelectedMethodId: string | null;
  onUseSelectedMethod: (methodId: string) => void;
  onBack: () => void;
};

const TITLE_ID = "mfa_method_picker_title";

const MfaMethodPicker = ({ methods, initiallySelectedMethodId, onUseSelectedMethod, onBack }: MfaMethodPickerProps) => {
  const { classes, cx } = useStyles();

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
            <FormControlLabel
              key={method.id}
              value={method.id}
              className={cx(
                classes.methodCard,
                classes.selectableMethodCard,
                method.id === selectedMethodId && classes.selectedMethodCard
              )}
              control={<Radio />}
              data-test-id={`mfa_method_option_${method.id}`}
              label={
                <Stack direction="row" spacing={SPACING_2} alignItems="center">
                  <MfaMethodIcon type={method.type} />
                  <div>
                    <Stack direction="row" spacing={SPACING_1} alignItems="center">
                      <Typography className={classes.methodName}>
                        <FormattedMessage id={MFA_METHOD_NAME_MESSAGE_ID[method.type]} />
                      </Typography>
                      {method.is_default && (
                        <Chip
                          size="small"
                          className={classes.defaultMethodChip}
                          label={<FormattedMessage id="default" />}
                          data-test-id="chip_default_method"
                        />
                      )}
                    </Stack>
                    <Typography variant="body2">{method.label}</Typography>
                  </div>
                </Stack>
              }
            />
          ))}
        </RadioGroup>
        <Stack spacing={SPACING_2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!selectedMethodId}
            messageId="signIn:useSelectedMethod"
            dataTestId="btn_use_selected_method"
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={onBack}
            messageId="back"
            dataTestId="btn_back_from_method_picker"
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default MfaMethodPicker;
