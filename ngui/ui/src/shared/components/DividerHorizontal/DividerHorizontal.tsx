import Divider from "@mui/material/Divider";
import { MPT_SPACING_1, MPT_SPACING_2 } from "../../../utils/layouts";

const DividerHorizontal = () => (
  <Divider
    style={{ margin: MPT_SPACING_1, marginLeft: MPT_SPACING_2, marginRight: MPT_SPACING_2 }}
    flexItem
    orientation="vertical"
  />
);

export default DividerHorizontal;
