import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import useStyles from "./TrafficMapMarker.styles";

const TrafficMapMarker = ({ type, lat, onClick, width = 140, height = 30 }) => {
  const { classes, cx } = useStyles();
  const positionClass = lat < 0 ? classes.markerBottom : classes.markerTop;

  const markerClasses = cx(classes.marker, positionClass);

  return (
    <Box onClick={() => onClick({ type })} className={markerClasses} sx={{ width, height }}>
      <span>
        <FormattedMessage id={type} />
      </span>
    </Box>
  );
};

export default TrafficMapMarker;
