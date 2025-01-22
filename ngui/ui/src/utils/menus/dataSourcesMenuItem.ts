import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { PRODUCT_TOUR_IDS } from "components/Tour";
import { CLOUD_ACCOUNT_CONNECT } from "urls";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import dataSources from "utils/routes/dataSourcesRoute";
import BaseMenuItem from "./baseMenuItem";

class DataSourcesMenuItem extends BaseMenuItem {
  route = dataSources;

  // eslint-disable-next-line class-methods-use-this
  messageId = ({ capability }) => {
    if (capability?.[OPTSCALE_CAPABILITY.FINOPS] ?? true) {
      return "dataSourcesTitle";
    }

    return "cloudConnectionsTitle";
  };

  dataTestId = "btn_data_sources";

  dataProductTourId = PRODUCT_TOUR_IDS.DATA_SOURCES;

  icon = CloudOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link) || currentPath === CLOUD_ACCOUNT_CONNECT;
}

export default new DataSourcesMenuItem();
