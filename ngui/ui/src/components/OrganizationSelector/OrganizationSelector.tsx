import { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Hidden from "components/Hidden";
import IconButton from "components/IconButton";
import Selector, { Button, Divider, Item, ItemContent } from "components/Selector";
import { useIsDownMediaQuery } from "hooks/useMediaQueries";
import { ORGANIZATIONS_OVERVIEW } from "urls";
<<<<<<< HEAD
import { MPT_BRAND_TYPE } from "../../utils/layouts";
=======
import { sliceByLimitWithEllipsis } from "utils/strings";
>>>>>>> upstream/integration

const HIDDEN_SELECTOR_SX = { visibility: "hidden", maxWidth: 0, minWidth: 0 };

const MAX_ORGANIZATION_NAME_LENGTH = 24;

const SELECTOR_SX = {
  "&.MuiFormControl-root": {
    "& label": {
      color: (theme) => theme.palette.info.main
    },
    "& div": {
      color: (theme) => theme.palette.common.black,
      "&.Mui-focused": {
        "& fieldset": {
          borderColor: (theme) => theme.palette.info.main
        }
      }
    },
    "& svg": {
      color: (theme) => theme.palette.common.black
    },
    "& fieldset": {
      borderColor: (theme) => theme.palette.info.main
    },
    "&:hover fieldset": {
      borderColor: (theme) => theme.palette.info.main
    }
  }
};

type OrganizationSelectorProps = {
  organizations: {
    id: string;
    name: string;
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
  // MPT_TODO: disabled to meet BDR requirements
  // const {isDemo} = useOrganizationInfo();
  // const openSideModal = useOpenSideModal();
  const navigate = useNavigate();

  const isDownSm = useIsDownMediaQuery("sm");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box display="flex" alignItems="center">
      <Hidden mode="up" breakpoint="sm">
        <IconButton sx={{ color: MPT_BRAND_TYPE }} icon={<ExpandMoreOutlinedIcon />} onClick={handleOpen} />
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
            const isNameLong = organization.name.length > MAX_ORGANIZATION_NAME_LENGTH;
            const renderedOrganizationName = isNameLong
              ? sliceByLimitWithEllipsis(organization.name, MAX_ORGANIZATION_NAME_LENGTH)
              : organization.name;

            const tooltip = isNameLong
              ? {
                  title: organization.name
                }
              : undefined;

            return (
              <Item key={organization.name} value={organization.id}>
                <ItemContent
                  icon={{
                    IconComponent: ApartmentIcon,
                    tooltipTitle: organization.name
                  }}
                  tooltip={tooltip}
                >
                  {renderedOrganizationName}
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
        {/* MPT_TODO: temporary disabled new organisation creation to meet BDR requirements */}
        {/* <Button */}
        {/*  icon={{ */}
        {/*    IconComponent: AddOutlinedIcon */}
        {/*  }} */}
        {/*  onClick={() => openSideModal(CreateOrganizationModal, { onSuccess: onChange })} */}
        {/*  dataTestId="orgs_create_new" */}
        {/*  disabled={isDemo} */}
        {/*  tooltipTitle={isDemo ? <FormattedMessage id="notAvailableInLiveDemo" /> : null} */}
        {/* > */}
        {/*  <FormattedMessage id="createNewOrganization" /> */}
        {/* </Button> */}
      </Selector>
    </Box>
  );
};

// NGUI-2198: selector is always visible and mounted with CoreDataContainer, organizations and organizationId can be undefined
// TODO - consider mounting those component at different levels

export default OrganizationSelector;
