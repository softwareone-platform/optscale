import { RefObject, useState } from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { saveAs } from "file-saver";
import { FormattedMessage } from "react-intl";
import IconButton from "components/IconButton";
import SnackbarAlert from "components/SnackbarAlert";
import { format } from "utils/datetime";
import { createPng } from "utils/exportChart";

type ExportFormat = "png";

type FileNameConfig = {
  title: string;
  fileFormat: ExportFormat;
  withTime?: boolean;
};

type ChartActionsProps = {
  chartRef: RefObject<HTMLCanvasElement | null>;
  marginTop: number;
};

const defaultConfig: FileNameConfig = {
  title: "OptScale_chart",
  fileFormat: "png",
  withTime: true
};

const generateFileName = ({ title, fileFormat, withTime }: FileNameConfig): string => {
  let fileName = title;

  if (withTime) {
    fileName += `_${format(new Date(), "HH_mm_ss")}`;
  }

  return fileName + `.${fileFormat}`;
};

const ChartActions = ({ chartRef, marginTop }: ChartActionsProps) => {
  const [showAlert, setShowAlert] = useState(false);

  const handlerDownloadPng = async () => {
    const canvas = chartRef.current;

    if (!canvas) {
      setShowAlert(true);
      return;
    }

    const fileName = generateFileName(defaultConfig);
    const png = await createPng(canvas);

    if (png) {
      saveAs(png, fileName);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div style={{ marginTop }}>
      <IconButton
        dataTestId="btn_export_chart"
        color="primary"
        tooltip={{
          messageId: "exportChart",
          show: true
        }}
        icon={<DownloadOutlinedIcon />}
        onClick={handlerDownloadPng}
      />
      <SnackbarAlert
        body={<FormattedMessage id="exportChartError" />}
        openState={showAlert}
        severity="error"
        autoHideDuration={3000}
        handleClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default ChartActions;
