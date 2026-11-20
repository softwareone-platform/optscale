import { useCallback, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import MenuList from "@mui/material/MenuList";
import Skeleton from "@mui/material/Skeleton";
import Typography, { TypographyOwnProps } from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useStyles from "@main/components/ProfileMenu/ProfileMenu.styles";
import { useIsFeatureEnabled } from "@theme/hooks/useIsFeatureEnabled";
import { PROFILE } from "@theme/urls";
import MenuItem from "components/MenuItem";
import Tooltip from "components/Tooltip";
import { useSignOut } from "hooks/useSignOut";
import { getInitials, isEllipsisActive } from "utils/strings";

type ProfileMenuProps = {
  name: string;
  email: string;
  isLoading?: boolean;
  /** Called after an item that navigates, so the hosting popover can close. */
  onItemClick?: () => void;
};

type ProfileItemLabelProps = {
  variant: TypographyOwnProps["variant"];
  label: string;
  dataTestId: string;
};

const ProfileItemLabel = ({ variant, label, dataTestId }: ProfileItemLabelProps) => {
  const [isOverflow, setIsOverflow] = useState(false);

  const ref = useCallback((node: HTMLSpanElement | null) => {
    if (node !== null) {
      setIsOverflow(isEllipsisActive(node));
    }
  }, []);

  const getLabel = (
    <Typography style={{ display: "block" }} data-test-id={dataTestId} variant={variant} noWrap ref={ref}>
      {label}
    </Typography>
  );

  return isOverflow ? <Tooltip title={label}>{getLabel}</Tooltip> : getLabel;
};

const ProfileMenu = ({ name, email, isLoading = false, onItemClick }: ProfileMenuProps) => {
  const { classes } = useStyles();

  const getProfileIcon = () => (name ? getInitials(name) : <AccountCircleOutlinedIcon />);

  const signOut = useSignOut();
  const navigate = useNavigate();
  const isMfaEnabled = useIsFeatureEnabled("mfa_login");

  const menuItems = [
    // The Profile page holds the MFA settings, so it exists only with the MFA work on.
    ...(isMfaEnabled
      ? [
          {
            messageId: "profile",
            icon: PersonOutlineIcon,
            onClick: () => {
              navigate(PROFILE);
              onItemClick?.();
            },
            dataTestId: "btn_profile_page",
            key: "profileKey"
          }
        ]
      : []),
    {
      messageId: "signOut",
      icon: ArrowForwardIosIcon,
      onClick: () => {
        signOut();
      },
      dataTestId: "btn_signout",
      key: "signOutKey"
    }
  ];

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar data-test-id="img_avatar" aria-label="recipe">
              {getProfileIcon()}
            </Avatar>
          )
        }
        title={
          isLoading ? (
            <>
              <Skeleton />
              <Skeleton height={16} />
            </>
          ) : (
            <>
              <ProfileItemLabel label={name} dataTestId="p_user_name" variant="subtitle1" />
              <ProfileItemLabel label={email} dataTestId="p_user_email" variant="caption" />
            </>
          )
        }
      />
      <CardContent className={classes.cardContent}>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem
              dataTestId={item.dataTestId}
              key={item.key}
              messageId={item.messageId}
              onClick={item.onClick}
              icon={item.icon}
            />
          ))}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default ProfileMenu;
