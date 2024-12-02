import { useState } from "react";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { FormattedMessage } from "react-intl";
import IconButton from "components/IconButton";
import Popover from "components/Popover";
import { PRODUCT_TOUR, useStartTour } from "components/Tour";
import { useIsTourAvailableForCurrentBreakpoint } from "components/Tour/hooks";
import ProfileMenuContainer from "containers/ProfileMenuContainer";
import { useCommunityDocsContext } from "contexts/CommunityDocsContext";
import { useMainMenuState } from "hooks/useMainMenuState";
import { DOCS_HYSTAX_OPTSCALE } from "urls";
import useStyles from "./HeaderButtons.styles";

const HeaderButtons = () => {
  const startTour = useStartTour();
  const { classes } = useStyles();

  const { updateIsExpanded } = useMainMenuState();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMobileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setAnchorEl(null);
  };

  const startProductTour = () => {
    updateIsExpanded(true);
    startTour(PRODUCT_TOUR);
  };

  const isTourAvailableForCurrentBreakpoint = useIsTourAvailableForCurrentBreakpoint();

  const { isCommunityDocsOpened, toggleCommunityDocs } = useCommunityDocsContext();

  return (
    <>
      <Box component="div" className={classes.sectionDesktop}>
        <IconButton
          dataTestId="btn_doc"
          color="info"
          href={DOCS_HYSTAX_OPTSCALE}
          icon={<MenuBookOutlinedIcon />}
          tooltip={{
            show: true,
            value: <FormattedMessage id="documentation" />
          }}
        />
        <IconButton
          dataTestId="btn_product_tour"
          color="info"
          icon={<LiveHelpOutlinedIcon />}
          onClick={startProductTour}
          disabled={!isTourAvailableForCurrentBreakpoint}
          tooltip={{
            show: true,
            value: <FormattedMessage id="productTour" />
          }}
        />
        {/* TODO_KU: disabled because it doesn't not exist in documentation */}
        {/* <IconButton */}
        {/*  icon={isCommunityDocsOpened ? <SchoolIcon /> : <SchoolOutlinedIcon />} */}
        {/*  onClick={setIsCommunityDocsOpened} */}
        {/*  color="info" */}
        {/*  tooltip={{ */}
        {/*    show: true, */}
        {/*    value: <FormattedMessage id="communityDocs" /> */}
        {/*  }} */}
        {/* /> */}
        <Popover
          label={
            <IconButton
              dataTestId="btn_profile"
              icon={<AccountCircleOutlined />}
              color="info"
              tooltip={{
                show: true,
                value: <FormattedMessage id="profile" />
              }}
            />
          }
          menu={<ProfileMenuContainer />}
        />
      </Box>
      {/* TODO: Maybe we can make the Popup component more universal and include the case below */}
      {/* TODO: https://datatrendstech.atlassian.net/browse/NGUI-2808 to handle dynamic header buttons, product tour is hidden on mdDown (when hamburger menu is activated) */}
      <Box component="div" className={classes.sectionMobile}>
        <IconButton icon={<MoreVertIcon />} color="primary" onClick={openMobileMenu} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMobileMenu}>
          <Box className={classes.customMenuItem}>
            <IconButton
              href={DOCS_HYSTAX_OPTSCALE}
              icon={<MenuBookOutlinedIcon />}
              size="medium"
              color="primary"
              tooltip={{
                show: true,
                value: <FormattedMessage id="documentation" />
              }}
            />
          </Box>
          <Box className={classes.customMenuItem}>
            <IconButton
              icon={isCommunityDocsOpened ? <SchoolIcon /> : <SchoolOutlinedIcon />}
              onClick={toggleCommunityDocs}
              color="primary"
              tooltip={{
                show: true,
                value: <FormattedMessage id="communityDocs" />
              }}
            />
          </Box>
          <Box className={classes.customMenuItem}>
            <Popover
              label={
                <IconButton
                  icon={<AccountCircleOutlined />}
                  size="medium"
                  color="primary"
                  tooltip={{
                    show: true,
                    value: <FormattedMessage id="profile" />
                  }}
                />
              }
              menu={<ProfileMenuContainer />}
            />
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default HeaderButtons;
