import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import useMenuItemState from "hooks/useMenuItemState";
import useStyles from "./MenuGroupWrapper.styles";

const MenuGroupWrapper = ({ menuSectionTitle, children, id, keepExpanded = false }) => {
  const { classes } = useStyles();
  const { isExpanded, updateIsExpanded } = useMenuItemState(id);

  if (!menuSectionTitle) {
    return children;
  }

  return (
    <Accordion
      expanded={keepExpanded || isExpanded}
      className={classes.menu}
      disableGutters
      elevation={0}
      square
      onChange={(_, expanded) => !keepExpanded && updateIsExpanded(expanded)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "32px"
        }}
      >
        <AccordionSummary sx={{ paddingRight: "0px" }} expandIcon={<KeyboardArrowDownOutlinedIcon fontSize="small" />}>
          {menuSectionTitle}
        </AccordionSummary>
      </Box>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default MenuGroupWrapper;
