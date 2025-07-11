import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import ExpandableList from "components/ExpandableList";
import HtmlSymbol from "components/HtmlSymbol";
import { isLastItem } from "utils/arrays";

type S3DuplicatesBucketsListProps = {
  bucketNames: string[];
};

const S3DuplicatesBucketsList = ({ bucketNames }: S3DuplicatesBucketsListProps) => (
  <Box display="flex" columnGap="4px" rowGap="2px" flexWrap="wrap" alignItems="center">
    <Typography noWrap component="span">
      <FormattedMessage id="selectedBuckets" />
      &#58;
    </Typography>
    <ExpandableList
      items={bucketNames}
      render={(bucketName, index, items) => (
        <Typography key={bucketName}>
          <strong>{bucketName}</strong>
          {!isLastItem(index, items.length) && <HtmlSymbol symbol="comma" />}
        </Typography>
      )}
      maxRows={5}
    />
  </Box>
);

export default S3DuplicatesBucketsList;
