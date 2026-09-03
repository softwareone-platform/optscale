import Box from "@mui/material/Box";
import BaseAwsRegionScope from "@main/components/DataSourceCredentialFields/AwsRegionScope/AwsRegionScope";

const AwsRegionScope = () => (
  <Box sx={{ borderTop: 1, borderBottom: 1, marginTop: 3, marginBottom: 2, borderColor: "divider" }}>
    <BaseAwsRegionScope />
  </Box>
);

export default AwsRegionScope;
