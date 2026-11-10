import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIsRecommendationPinned } from "@main/containers/RecommendationsOverviewContainer/redux/pinnedRecommendations/hooks";
import { ERROR, SUCCESS, WARNING } from "@main/utils/constants";
import { MPT_SPACING_2, MPT_SPACING_3 } from "@theme/utils/layouts";
import SubTitle from "components/SubTitle";
import TitleValue from "components/TitleValue";
import useStyles from "./Header.styles";

const iconMap = {
  error: { component: CancelIcon, color: ERROR },
  warning: { component: ErrorIcon, color: WARNING },
  success: { component: CheckCircleIcon, color: SUCCESS }
};

const Header = ({ recommendationType, color, title, subtitle, value, valueLabel }) => {
  const { classes } = useStyles();

  const isPinned = useIsRecommendationPinned(recommendationType);
  const renderIcon = (iconType) => {
    const IconComponent = iconMap[iconType]?.component;
    return IconComponent ? (
      <IconComponent className={classes.titleIcon} fontSize="label" color={iconMap[iconType].color} />
    ) : null;
  };
  return (
    <>
      <Stack className={classes.header}>
        <div className={classes.title}>
          <div className={classes.titleText}>
            {renderIcon(color)}

            <TitleValue component="h3" style={{ fontSize: MPT_SPACING_2, fontWeight: "bold" }}>
              {title}
            </TitleValue>
            {isPinned && (
              <PushPinIcon
                style={{
                  marginTop: "4px",
                  transform: "rotate(45deg)"
                }}
                fontSize="small"
              />
            )}
          </div>
        </div>
        <div className={classes.value}>
          <Typography variant="subtitle2" component="div" color={color} sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
          <Typography variant="caption" component="div" color={color}>
            {valueLabel}
          </Typography>
        </div>
      </Stack>
      <Box sx={{ marginBottom: MPT_SPACING_3 }}>
        <SubTitle>{subtitle}</SubTitle>
      </Box>
    </>
  );
};

export default Header;
