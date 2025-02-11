import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ActionBar from "components/ActionBar";
import PageContentWrapper from "components/PageContentWrapper";
import ResourcesPerspectivesComponent from "components/ResourcesPerspectives";

const actionBarDefinition = {
  title: {
    messageId: "perspectives",
    dataTestId: "lbl_perspectives"
  }
};

const ResourcesPerspectives = () => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <Grid direction="row" container spacing={3}>
        <Grid item xs={12} className={"MTPBoxShadowRoot"}>
          <Box>
            <ResourcesPerspectivesComponent />
          </Box>
        </Grid>
      </Grid>
    </PageContentWrapper>
  </>
);

export default ResourcesPerspectives;
