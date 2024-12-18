// import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import mlDatasetsRoute from "utils/routes/mlDatasetsRoute";
import BaseMenuItem from "./baseMenuItem";

class MlDatasetsMenuItem extends BaseMenuItem {
  route = mlDatasetsRoute;

  messageId = "datasets";

  dataTestId = "btn_ml_datasets";

  // MPT_TODO: disabled to match MPT figma designs
  // icon = DatasetOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new MlDatasetsMenuItem();
