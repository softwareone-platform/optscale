import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import InlineSeverityAlert from "@main/components/InlineSeverityAlert";
import useStyles from "@main/layouts/BaseLayout/BaseLayout.styles";
import preloaderLogo from "@theme/assets/logo/swo-logo-animated.gif";
import { MPT_BRAND_TYPE } from "@theme/utils/layouts";
import CollapsableMenuDrawer from "components/CollapsableMenuDrawer";
import DocsPanel from "components/DocsPanel";
import ErrorBoundary from "components/ErrorBoundary";
import HeaderButtons from "components/HeaderButtons";
import Hidden from "components/Hidden";
import IconButton from "components/IconButton";
import Logo from "components/Logo";
import MainMenu from "components/MainMenu";
import PageContentWrapper from "components/PageContentWrapper";
import PendingInvitationsAlert from "components/PendingInvitationsAlert";
import TopAlertWrapper from "components/TopAlertWrapper";
import CoreDataContainer from "containers/CoreDataContainer";
import OrganizationSelectorContainer from "containers/OrganizationSelectorContainer";
import { useCommunityDocsContext } from "contexts/CommunityDocsContext";
import { useIsDownMediaQuery } from "hooks/useMediaQueries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { BASE_LAYOUT_CONTAINER_ID, LOGO_SIZE } from "utils/constants";
import overrideStyles from "./BaseLayout.styles";

const logoHeight = 30;

const getLogoSize = (isDemo = false, isDownMd = false, isDownSm = false) => {
  if (isDemo) {
    return isDownMd ? LOGO_SIZE.SHORT : LOGO_SIZE.FULL;
  }
  return isDownSm ? LOGO_SIZE.SHORT : LOGO_SIZE.FULL;
};

const AppToolbar = ({
  onMenuIconClick,
  showMainMenu = false,
  showOrganizationSelector = false,
  isOrganizationSelectorLoading = false,
  isProductTourAvailable = false
}) => {
  const { classes } = useStyles();
  const override = overrideStyles();
  // const navigate = useNavigate();
  const isDownMd = useIsDownMediaQuery("md");
  const isDownSm = useIsDownMediaQuery("sm");

  const { isDemo, organizationId } = useOrganizationInfo();

  return (
    <header>
      <Toolbar className={override.classes.toolbar}>
        {showMainMenu && (
          <IconButton
            sx={{ display: { xs: "inherit", md: "none", color: MPT_BRAND_TYPE } }}
            customClass={classes.marginRight1}
            dataTestId={"btn_menu_open_drawer"}
            icon={<MenuIcon />}
            onClick={onMenuIconClick}
            aria-label="open drawer"
          />
        )}
        <div style={{ height: logoHeight }} className={override.classes.logo}>
          <Logo
            size={getLogoSize(isDemo, isDownMd, isDownSm)}
            dataTestId="img_logo"
            height={logoHeight}
            demo={isDemo}
            active={organizationId !== undefined}
          />

          <Hidden mode="down" breakpoint="md">
            <Typography data-test-id="p_live_demo_mode" className={override.classes.headerTitle}>
              <FormattedMessage id={"finopsForCloud"} />
            </Typography>
          </Hidden>
        </div>
        {isDemo ? (
          <Hidden mode="down" breakpoint="md">
            <Box display="flex" alignItems="center">
              <InlineSeverityAlert messageId="liveDemoMode" data-test-id="p_live_demo_mode" />
            </Box>
          </Hidden>
        ) : null}
        <Box display="flex" alignItems="center">
          {showOrganizationSelector && (
            <Box mr={1}>
              <OrganizationSelectorContainer isLoading={isOrganizationSelectorLoading} />
            </Box>
          )}
          <HeaderButtons isProductTourAvailable={isProductTourAvailable} />
        </Box>
      </Toolbar>
      <div className={override.classes.headerSpacer} />
    </header>
  );
};

const BaseLayout = ({ children, showMainMenu = false, showOrganizationSelector = false, mainMenu }) => {
  const { classes, cx } = useStyles();
  const override = overrideStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { isCommunityDocsOpened } = useCommunityDocsContext();

  return (
    <CoreDataContainer
      render={({ organizationId, isLoadingProps }) => {
        const someApiLoading = Object.values(isLoadingProps).some((isLoading) => isLoading);

        const renderPageContent = () => {
          if (someApiLoading) {
            return (
              <PageContentWrapper>
                <div data-testid="mainPreloader" className={override.classes.preloaderOverlay}>
                  <img src={preloaderLogo} alt="Loading page" />
                </div>
              </PageContentWrapper>
            );
          }

          return (
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
                <ErrorBoundary>{children}</ErrorBoundary>
              </Container>
            </Box>
          );
        };

        return (
          <>
            <TopAlertWrapper />
            <Box className={cx(classes.wrapper, isCommunityDocsOpened ? classes.wrapperWithDocsOpened : "")}>
              <Box className={cx(classes.layoutWrapper, isCommunityDocsOpened ? classes.hideableLayoutWrapper : "")}>
                {isLoadingProps.getInvitationsLoading ? null : <PendingInvitationsAlert />}
                <AppBar position="static" className={classes.appBar}>
                  <AppToolbar
                    showMainMenu={showMainMenu}
                    onMenuIconClick={handleDrawerToggle}
                    showOrganizationSelector={showOrganizationSelector}
                    isOrganizationSelectorLoading={isLoadingProps.getOrganizationsLoading}
                    isProductTourAvailable={!someApiLoading}
                  />
                </AppBar>
                {renderPageContent()}
              </Box>
              <Box>
                <DocsPanel />
              </Box>
            </Box>
          </>
        );
      }}
    />
  );
};

export default BaseLayout;
