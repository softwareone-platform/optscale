import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import CollapsableMenuDrawer from "components/CollapsableMenuDrawer";
import DocsPanel from "components/DocsPanel";
import ErrorBoundary from "components/ErrorBoundary";
import HeaderButtons from "components/HeaderButtons";
import Hidden from "components/Hidden";
import IconButton from "components/IconButton";
import Logo from "components/Logo";
import MainMenu from "components/MainMenu";
import PendingInvitationsAlert from "components/PendingInvitationsAlert";
import TopAlertWrapper from "components/TopAlertWrapper";
import CoreDataContainer from "containers/CoreDataContainer";
import OrganizationSelectorContainer from "containers/OrganizationSelectorContainer";
import { useCommunityDocsContext } from "contexts/CommunityDocsContext";
import { useIsDownMediaQuery } from "hooks/useMediaQueries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { BASE_LAYOUT_CONTAINER_ID, LOGO_SIZE } from "utils/constants";
import InlineSeverityAlert from "../../components/InlineSeverityAlert";
import { MPT_BRAND_TYPE } from "../../utils/layouts";
import useStyles from "./BaseLayout.styles";

const logoHeight = 30;

const getLogoSize = (isDemo, isDownMd, isDownSm) => {
  if (isDemo) {
    return isDownMd ? LOGO_SIZE.SHORT : LOGO_SIZE.FULL;
  }
  return isDownSm ? LOGO_SIZE.SHORT : LOGO_SIZE.FULL;
};

const AppToolbar = ({ onMenuIconClick, mainMenu, showMainMenu = false, showOrganizationSelector = false }) => {
  const { classes } = useStyles();
  // const navigate = useNavigate();
  const isDownMd = useIsDownMediaQuery("md");
  const isDownSm = useIsDownMediaQuery("sm");

  const { isDemo, organizationId } = useOrganizationInfo();

  // MPT_TODO: disabled to meet BDR requirements
  // const navigate = useNavigate();
  // const onLiveDemoRegisterClick = () => {
  //   navigate(REGISTER);
  //   trackEvent({ category: GA_EVENT_CATEGORIES.LIVE_DEMO, action: "Try register" });
  // };

  return (
    <header>
      <Toolbar className={classes.toolbar}>
        {showMainMenu && (
          <IconButton
            sx={{ display: { xs: "inherit", md: "none", color: MPT_BRAND_TYPE } }}
            customClass={classes.marginRight1}
            icon={<MenuIcon />}
            onClick={onMenuIconClick}
            aria-label="open drawer"
          />
        )}
        <div style={{ height: logoHeight }} className={classes.logo}>
          <Logo
            size={getLogoSize(isDemo, isDownMd, isDownSm)}
            dataTestId="img_logo"
            height={logoHeight}
            demo={isDemo}
            active={organizationId !== undefined}
          />

          <Hidden mode="down" breakpoint="md">
            <Typography data-test-id="p_live_demo_mode" className={classes.headerTitle}>
              <FormattedMessage id={"finopsForCloud"} />
            </Typography>
          </Hidden>
        </div>
        {isDemo ? (
          <Hidden mode="down" breakpoint="md">
            <Box display="flex" alignItems="center">
              <InlineSeverityAlert messageId="liveDemoMode" data-test-id="p_live_demo_mode" />

              {/* MPT_TODO: disabled to meet BDR Requirements */}
              {/* <Button */}
              {/*  customClass={cx(classes.marginLeft1, classes.marginRight1)} */}
              {/*  disableElevation */}
              {/*  dataTestId="btn_register" */}
              {/*  messageId="register" */}
              {/*  variant="contained" */}
              {/*  size={isDownSm ? "small" : "medium"} */}
              {/*  color="success" */}
              {/*  onClick={onLiveDemoRegisterClick} */}
              {/* /> */}
            </Box>
          </Hidden>
        ) : null}
        <Box display="flex" alignItems="center">
          {showOrganizationSelector && (
            <Box mr={1}>
              <OrganizationSelectorContainer mainMenu={mainMenu} />
            </Box>
          )}
          <HeaderButtons />
        </Box>
      </Toolbar>
      <div className={classes.headerSpacer} />
    </header>
  );
};

const BaseLayout = ({ children, showMainMenu = false, showOrganizationSelector = false, mainMenu }) => {
  const { organizationId } = useOrganizationInfo();

  const { classes, cx } = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { isCommunityDocsOpened } = useCommunityDocsContext();

  return (
    <>
      <TopAlertWrapper />
      <Box className={cx(classes.wrapper, isCommunityDocsOpened ? classes.wrapperWithDocsOpened : "")}>
        <Box className={cx(classes.layoutWrapper, isCommunityDocsOpened ? classes.hideableLayoutWrapper : "")}>
          <PendingInvitationsAlert />
          <AppBar position="static" className={classes.appBar}>
            <AppToolbar
              showMainMenu={showMainMenu}
              onMenuIconClick={handleDrawerToggle}
              showOrganizationSelector={showOrganizationSelector}
              // mainMenu={mainMenu}
            />
          </AppBar>
          <Box className={classes.menuAndContentWrapper}>
            {showMainMenu && (
              <>
                <Hidden mode="down" breakpoint="md">
                  <CollapsableMenuDrawer>
                    <MainMenu menu={mainMenu} />
                  </CollapsableMenuDrawer>
                </Hidden>
                <Hidden mode="up" breakpoint="md">
                  <Drawer
                    variant="temporary"
                    classes={{
                      paper: classes.drawerPaper
                    }}
                    onClose={handleDrawerToggle}
                    open={mobileOpen}
                    ModalProps={{
                      keepMounted: true
                    }}
                  >
                    <MainMenu menu={mainMenu} />
                  </Drawer>
                </Hidden>
              </>
            )}
            <Container key={organizationId} id={BASE_LAYOUT_CONTAINER_ID} component="main" className={classes.content}>
              <ErrorBoundary>
                <CoreDataContainer>{children}</CoreDataContainer>
              </ErrorBoundary>
            </Container>
          </Box>
        </Box>
        <Box>
          <DocsPanel />
        </Box>
      </Box>
    </>
  );
};

export default BaseLayout;
