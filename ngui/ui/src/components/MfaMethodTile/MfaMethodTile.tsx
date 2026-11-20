import { ReactNode } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MfaMethodType } from "api/auth/mfaMethod";
import MfaMethodIcon, { MFA_METHOD_NAME_MESSAGE_ID } from "components/MfaMethodIcon";
import { SPACING_1 } from "utils/layouts";
import useStyles from "./MfaMethodTile.styles";

type MfaMethodTileProps = {
  type: MfaMethodType;
  /** Under the name: the method's label, or what the type is for. */
  description?: ReactNode;
  /** Beside the name, e.g. an `InfoChip`. */
  chip?: ReactNode;
  /** Before the icon, e.g. a radio — the tile is then a `label`, so a click anywhere picks it. */
  start?: ReactNode;
  /** At the right edge, e.g. a menu button. */
  action?: ReactNode;
  /** Makes the whole tile a button. */
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  testId: string;
};

/** A method as one bordered tile — the challenge's picker and code entry, the add dialog and the Security page share it. */
const MfaMethodTile = ({
  type,
  description,
  chip,
  start,
  action,
  onClick,
  disabled,
  isSelected = false,
  testId
}: MfaMethodTileProps) => {
  const { classes, cx } = useStyles();

  const isInteractive = Boolean(onClick || start);
  const className = cx(classes.tile, isInteractive && classes.interactive, isSelected && classes.selected);

  const content = (
    <>
      {start}
      <MfaMethodIcon type={type} />
      <Stack spacing={SPACING_1} className={classes.details}>
        <Stack direction="row" spacing={SPACING_1} alignItems="center">
          <Typography className={classes.name}>
            <FormattedMessage id={MFA_METHOD_NAME_MESSAGE_ID[type]} />
          </Typography>
          {chip}
        </Stack>
        {description && <Typography variant="body2">{description}</Typography>}
      </Stack>
      {action}
    </>
  );

  if (onClick) {
    return (
      <ButtonBase className={className} onClick={onClick} disabled={disabled} data-test-id={testId}>
        {content}
      </ButtonBase>
    );
  }

  const Root = start ? "label" : "div";

  return (
    <Root className={className} data-test-id={testId}>
      {content}
    </Root>
  );
};

export default MfaMethodTile;
