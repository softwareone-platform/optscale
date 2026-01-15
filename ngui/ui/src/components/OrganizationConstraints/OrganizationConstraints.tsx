import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ActionBar from "components/ActionBar";
import OrganizationConstraintsTable from "components/OrganizationConstraintsTable";
import PageContentWrapper from "components/PageContentWrapper";
import { SPACING_2 } from "utils/layouts";

const OrganizationConstraints = ({ actionBarDefinition, constraints, addButtonLink, isLoading = false }) => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <Box className={"MTPBoxShadow"}>
        <Grid container spacing={SPACING_2}>
          <Grid item xs={12}>
            <OrganizationConstraintsTable constraints={constraints} isLoading={isLoading} addButtonLink={addButtonLink} />
          </Grid>
        </Grid>
      </Box>
    </PageContentWrapper>
  </>
);

export default OrganizationConstraints;
