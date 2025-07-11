import Box from "@mui/material/Box";
import OrganizationInfoSetting from "components/OrganizationInfoSetting";
import { useIsAllowed } from "hooks/useAllowedActions";

const OrganizationSettings = () => {
  const isDeleteOrganizationAllowed = useIsAllowed({ requiredActions: ["DELETE_PARTNER"] });

  return (
    <>
      <Box mb={isDeleteOrganizationAllowed ? 2 : 0}>
        <OrganizationInfoSetting />
      </Box>
      {/* MTP_TODO: disabled to meet BDR requirements */}
      {/* {isDeleteOrganizationAllowed && <DeleteOrganization />} */}
    </>
  );
};

export default OrganizationSettings;
