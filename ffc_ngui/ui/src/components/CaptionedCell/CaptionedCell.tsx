import { Stack } from "@mui/material";
import CellCaption from "components/CellCaption";
import { isObject } from "utils/objects";

const Caption = ({ caption, tooltipText, enableTextCopy, copyTextDataTestIds }) => (
  <CellCaption
    text={caption}
    tooltipText={tooltipText}
    enableCaptionTextCopy={enableTextCopy}
    copyTextDataTestIds={copyTextDataTestIds}
  />
);

const CaptionItem = ({ node, caption, ...rest }) => <div>{node ?? <Caption caption={caption} {...rest} />}</div>;

const renderCaption = (caption, rest) => {
  if (Array.isArray(caption)) {
    return caption.map(({ key, ...captionProps }) => <CaptionItem key={key} {...captionProps} />);
  }
  if (isObject(caption)) {
    return <CaptionItem {...caption} />;
  }
  return <CaptionItem caption={caption} {...rest} />;
};

const CaptionedCell = ({ children, caption, ...rest }) =>
  caption ? (
    <Stack>
      <div>{children}</div>
      {renderCaption(caption, rest)}
    </Stack>
  ) : (
    children
  );

export default CaptionedCell;
