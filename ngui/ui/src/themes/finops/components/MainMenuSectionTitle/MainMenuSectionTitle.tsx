import { FC, ComponentType } from "react";
import { ListItem, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import useStyles from "./MainMenuSectionTitle.styles";

interface MainMenuSectionTitleProps {
  messageId: string;
  icon?: ComponentType<{ className?: string }> | null;
}

const MainMenuSectionTitle: FC<MainMenuSectionTitleProps> = ({ messageId, icon: Icon = null }) => {
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
