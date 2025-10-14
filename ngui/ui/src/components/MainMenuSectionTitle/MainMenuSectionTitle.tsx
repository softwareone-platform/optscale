import { ListItem, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import useStyles from "./MainMenuSectionTitle.styles";

const MainMenuSectionTitle = ({ messageId, icon: Icon = null }) => {
  const { classes } = useStyles();

  return (
    <ListItem className={classes.textWrapper}>
      <Typography className={classes.text}>
        {Icon && <Icon className={classes.titleIcon} />}
        <FormattedMessage id={messageId} />
      </Typography>
    </ListItem>
  );
};

export default MainMenuSectionTitle;
