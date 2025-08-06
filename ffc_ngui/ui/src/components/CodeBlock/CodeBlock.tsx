import Box from "@mui/material/Box";
import CopyText from "components/CopyText";
import useStyles from "./CodeBlock.styles";

type CodeBlockProps = {
  text: string;
  maxHeight: string;
  height: string;
};

const CodeBlock = ({ text, maxHeight, height }: CodeBlockProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper} height={height}>
      <Box component="pre" className={classes.codeBlock} maxHeight={maxHeight}>
        {text}
      </Box>
      <CopyText text={text} />
    </Box>
  );
};

export default CodeBlock;
