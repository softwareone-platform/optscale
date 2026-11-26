import Box from "@mui/material/Box";
import BaseAwsRegionScope from "@main/components/DataSourceCredentialFields/AwsRegionScope/AwsRegionScope";

const AwsRegionScope = () => (
  // Temporarily hiding the region scope field until we have more time to test it.
  <Box
    sx={{
      borderTop: 1,
      borderBottom: 1,
      marginTop: 3,
      marginBottom: 2,
      paddingBottom: 1,
      borderColor: "divider",
      display: "none"
    }}
  >
    <BaseAwsRegionScope />
  </Box>
);

export default AwsRegionScope;
