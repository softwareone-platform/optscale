// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { PRODUCT_TOUR_IDS } from "components/Tour";
import home from "utils/routes/homeRoute";
import BaseMenuItem from "./baseMenuItem";

class HomeMenuItem extends BaseMenuItem {
  route = home;

  messageId = "home";

  dataTestId = "btn_home";

  dataProductTourId = PRODUCT_TOUR_IDS.HOME;

  // MTP_TODO: disabled to match MPT figma designs
  // icon = HomeOutlinedIcon;
}

export default new HomeMenuItem();
