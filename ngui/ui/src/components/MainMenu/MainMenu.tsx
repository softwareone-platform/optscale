import { useEffect } from "react";
import { List } from "@mui/material";
import CapabilityWrapper from "components/CapabilityWrapper";
import MenuGroupWrapper from "components/MenuGroupWrapper";
import MenuItem from "components/MenuItem";
import { PRODUCT_TOUR, useProductTour, PRODUCT_TOUR_IDS } from "components/Tour";
import useStyles from "./MainMenu.styles";

const SimpleItem = ({ menuItem }) => (
  <CapabilityWrapper capability={menuItem.capability}>
    <MenuItem
      className={menuItem.className}
      dataProductTourId={menuItem.dataProductTourId}
      link={menuItem.route.link}
      messageId={menuItem.messageId}
      isRootPath={menuItem.isRootPath}
      isActive={menuItem.isActive}
      icon={menuItem.icon}
      dataTestId={menuItem.dataTestId}
    />
  </CapabilityWrapper>
);

const MainMenu = ({ menu }) => {
  const { isOpen: isProductTourOpen, stepId: productTourStepId } = useProductTour(PRODUCT_TOUR);
  const { classes } = useStyles();

  useEffect(() => {
    if (!productTourStepId || !isProductTourOpen) {
      return;
    }

    const targetElement = document.querySelector(`[data-product-tour-id='${productTourStepId}']`);
    const menuDrawer = document.querySelector(`[data-product-tour-id='${PRODUCT_TOUR_IDS.MENU_DRAWER}']`);
    if (!targetElement || !menuDrawer) {
      console.warn("Product tour did not found target elements for scroll");
      return;
    }
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const elementTop = targetElement.getBoundingClientRect().top;
    // trying to scroll menu to place target element as close to screen center, as possible
    menuDrawer.scrollTop -= windowHeight / 2 - elementTop;
  }, [productTourStepId, isProductTourOpen]);

  return (
    <>
      <List className={classes.MainMenu} component="nav" sx={{ padding: 0 }}>
        {menu.map(({ items, menuSectionTitle, id, capability }) => (
          <CapabilityWrapper key={id} capability={capability}>
            <MenuGroupWrapper id={id} menuSectionTitle={menuSectionTitle} keepExpanded={isProductTourOpen}>
              {items.map((item) => (
                <SimpleItem key={item.route.link} menuItem={item} />
              ))}
            </MenuGroupWrapper>
          </CapabilityWrapper>
        ))}
      </List>
    </>
  );
};

export default MainMenu;
