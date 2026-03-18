import { ReactNode } from "react";
import { Box } from "@mui/material";
import IconButton from "components/IconButton";
import { IconButtonProps } from "components/IconButton/IconButton";
import SubTitle from "components/SubTitle";
import TypographyLoader from "components/TypographyLoader";

type SummaryListProps = {
  titleMessage: ReactNode;
  titleIconButton?: IconButtonProps;
  isLoading?: boolean;
  items: ReactNode;
};

const SummaryList = ({ titleMessage, titleIconButton, isLoading = false, items }: SummaryListProps) => (
  <Box minWidth={isLoading ? "200px" : undefined}>
    <Box display="flex" alignItems="center" height="30px">
      <SubTitle>{titleMessage}</SubTitle>
      {titleIconButton?.icon ? <IconButton {...titleIconButton} /> : null}
    </Box>
    {isLoading ? <TypographyLoader linesCount={4} /> : <>{items}</>}
  </Box>
);

export default SummaryList;
