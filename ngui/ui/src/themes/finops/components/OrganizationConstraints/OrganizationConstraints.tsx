import { Box } from "@mui/material";
import ActionBar from "components/ActionBar";
import OrganizationConstraintsTable from "components/OrganizationConstraintsTable";
import PageContentWrapper from "components/PageContentWrapper";

const OrganizationConstraints = ({ actionBarDefinition, constraints, addButtonLink, isLoading = false }) => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <Box className="MTPBoxShadow">
        <OrganizationConstraintsTable constraints={constraints} isLoading={isLoading} addButtonLink={addButtonLink} />
      </Box>
    </PageContentWrapper>
  </>
);

export default OrganizationConstraints;
