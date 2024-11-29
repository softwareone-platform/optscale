// import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import mlDatasetsRoute from "utils/routes/mlDatasetsRoute";
import BaseMenuItem from "./baseMenuItem";

class MlDatasetsMenuItem extends BaseMenuItem {
  route = mlDatasetsRoute;

  messageId = "datasets";

  dataTestId = "btn_ml_datasets";

  // TODO: remove after TDR approval
  // icon = DatasetOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new MlDatasetsMenuItem();
