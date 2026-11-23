import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FormattedMessage, useIntl } from "react-intl";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import { MfaMethodDetails } from "api/auth/mfaMethods";
import InfoChip from "components/InfoChip";
import MfaMethodTile, { MfaMethodDescription } from "components/MfaMethodTile";

type MfaMethodCardProps = {
  method: MfaMethodDetails;
  onSetDefault: () => void;
  onRename: () => void;
  onRemove: () => void;
  /** Why the method cannot be removed, shown on the disabled menu item; `null` when it can. */
  removeBlockedMessageId: string | null;
  isBusy: boolean;
};

const MfaMethodCard = ({ method, onSetDefault, onRename, onRemove, removeBlockedMessageId, isBusy }: MfaMethodCardProps) => {
  const intl = useIntl();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const runAndClose = (action: () => void) => () => {
    setMenuAnchor(null);
    action();
  };

  return (
    <MfaMethodTile
      type={method.type}
      description={method.label && <MfaMethodDescription type={method.type} label={method.label} />}
      chip={
        method.is_default && (
          <InfoChip label={<FormattedMessage id="default" />} data-test-id={`chip_default_mfa_method_${method.type}`} />
        )
      }
      action={
        <>
          <IconButton
            aria-label={intl.formatMessage({ id: "mfaSettings:moreActions" })}
            disabled={isBusy}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
            data-test-id={`btn_mfa_method_actions_${method.type}`}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
            {!method.is_default && (
              <MenuItem onClick={runAndClose(onSetDefault)} data-test-id={`btn_set_default_mfa_method_${method.type}`}>
                <FormattedMessage id="mfaSettings:setAsDefault" />
              </MenuItem>
            )}
            {/* An e-mail method is named by its address. */}
            {method.type === MFA_METHOD_TYPE.TOTP && (
              <MenuItem onClick={runAndClose(onRename)} data-test-id={`btn_rename_mfa_method_${method.type}`}>
                <FormattedMessage id="rename" />
              </MenuItem>
            )}
            <MenuItem
              disabled={removeBlockedMessageId !== null}
              onClick={runAndClose(onRemove)}
              data-test-id={`btn_remove_mfa_method_${method.type}`}
            >
              <ListItemText
                primary={<FormattedMessage id="mfaSettings:remove" />}
                secondary={removeBlockedMessageId && <FormattedMessage id={removeBlockedMessageId} />}
                secondaryTypographyProps={{ sx: { whiteSpace: "normal", maxWidth: 260 } }}
              />
            </MenuItem>
          </Menu>
        </>
      }
      testId={`mfa_method_card_${method.type}`}
    />
  );
};

export default MfaMethodCard;
