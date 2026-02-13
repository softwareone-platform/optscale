import { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Theme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Hidden from "components/Hidden";
import IconButton from "components/IconButton";
import Selector, { Button, Divider, Item, ItemContent } from "components/Selector";
import { useIsDownMediaQuery } from "hooks/useMediaQueries";
import { ORGANIZATIONS_OVERVIEW } from "urls";
import { getOrganizationDisplayName } from "utils/organization";
import { MPT_BRAND_TYPE } from "../../utils/layouts";

const HIDDEN_SELECTOR_SX = { visibility: "hidden", maxWidth: 0, minWidth: 0 };

const MAX_ORGANIZATION_NAME_LENGTH = 24;

const SELECTOR_SX = {
  "&.MuiFormControl-root": {
    /**
     * Empirically selected minWidth to prevent selector width change when
     * switching between organizations with different name lengths
     */
    minWidth: 270,
    "& label": {
      color: (theme: Theme) => theme.palette.info.main
    },
    "& div": {
      color: (theme: Theme) => theme.palette.common.black,
      "&.Mui-focused": {
        "& fieldset": {
          borderColor: (theme: Theme) => theme.palette.info.main
        }
      }
    },
    "& svg": {
      color: (theme: Theme) => theme.palette.common.black
    },
    "& fieldset": {
      borderColor: (theme: Theme) => theme.palette.info.main
    },
    "&:hover fieldset": {
      borderColor: (theme: Theme) => theme.palette.info.main
    }
  }
};

type OrganizationSelectorProps = {
  organizations: {
    id: string;
    name: string;
    disabled?: boolean;
  }[];
  organizationId?: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

const OrganizationSelector = ({
  organizations,
  organizationId = "",
  onChange,
  isLoading = false
}: OrganizationSelectorProps) => {
  const navigate = useNavigate();

  const isDownSm = useIsDownMediaQuery("sm");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box display="flex" alignItems="center">
      <Hidden mode="up" breakpoint="sm">
        <IconButton
          dataTestId={"icon_expand_more"}
          sx={{ color: MPT_BRAND_TYPE }}
          icon={<ExpandMoreOutlinedIcon />}
          onClick={handleOpen}
        />
      </Hidden>
      <Selector
        id="organization-selector"
        labelMessageId="organization"
        value={organizationId}
        onChange={onChange}
        compact
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isLoading={isLoading}
        sx={isDownSm ? HIDDEN_SELECTOR_SX : SELECTOR_SX}
      >
        {[...organizations]
          .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
          .map((organization) => {
            const { displayName, isNameLong, originalName } = getOrganizationDisplayName({
              name: organization.name,
              isInactive: organization.disabled,
              maxLength: MAX_ORGANIZATION_NAME_LENGTH
            });

            const tooltip = isNameLong
              ? {
                  title: originalName
                }
              : undefined;

            return (
              <Item key={organization.id} value={organization.id}>
                <ItemContent
                  icon={{
                    IconComponent: ApartmentIcon
                  }}
                  tooltip={tooltip}
                >
                  {displayName}
                </ItemContent>
              </Item>
            );
          })}
        <Divider />
        <Button
          icon={{
            IconComponent: VisibilityOutlinedIcon
          }}
          onClick={() => navigate(ORGANIZATIONS_OVERVIEW)}
          dataTestId="orgs_dashboard"
        >
          <FormattedMessage id="organizationsOverview" />
        </Button>
      </Selector>
    </Box>
  );
};

export default OrganizationSelector;
