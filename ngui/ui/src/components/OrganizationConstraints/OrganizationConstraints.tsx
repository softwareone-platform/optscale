import ActionBar from "components/ActionBar";
import OrganizationConstraintsTable from "components/OrganizationConstraintsTable";
import PageContentWrapper from "components/PageContentWrapper";

const OrganizationConstraints = ({ actionBarDefinition, constraints, addButtonLink, isLoading = false }) => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <OrganizationConstraintsTable constraints={constraints} isLoading={isLoading} addButtonLink={addButtonLink} />
    </PageContentWrapper>
  </>
);

export default OrganizationConstraints;
