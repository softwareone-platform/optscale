import { Box } from "@mui/material";
import CloudLabel from "components/CloudLabel";
import { useAllDataSources } from "hooks/coreData";
import { SPACING_1 } from "utils/layouts";

const SelectedCloudAccounts = ({ cloudAccountIds }) => {
  const dataSources = useAllDataSources();

  return (
    <Box display="flex" flexWrap="wrap" gap={SPACING_1}>
      {dataSources
        .map(({ name, id, type: cloudType }) => {
          if (cloudAccountIds.indexOf(id) > -1) {
            return <CloudLabel key={id} name={name} type={cloudType} disableLink />;
          }

          return false;
        })
        .filter(Boolean)}
    </Box>
  );
};

export default SelectedCloudAccounts;
