import { useMutation } from "@apollo/client";
import CreateResourcePerspectiveForm from "components/forms/CreateResourcePerspectiveForm";
import { GET_ORGANIZATION_PERSPECTIVES, UPDATE_ORGANIZATION_PERSPECTIVES } from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationPerspectives } from "hooks/coreData/useOrganizationPerspectives";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const CreateResourcePerspectiveContainer = ({
  breakdownBy,
  breakdownData,
  onSuccess,
  onCancel,
  filterValues,
  appliedFilters
}) => {
  const { organizationId } = useOrganizationInfo();

  const { allPerspectives } = useOrganizationPerspectives();

  const [updateOrganizationPerspectives, { loading }] = useMutation(UPDATE_ORGANIZATION_PERSPECTIVES, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GET_ORGANIZATION_PERSPECTIVES,
        variables: { organizationId },
        data: {
          organizationPerspectives: data.updateOrganizationPerspectives
        }
      });
    }
  });

  const onSubmit = (data) =>
    updateOrganizationPerspectives({
      variables: {
        organizationId,
        value: {
          ...allPerspectives,
          [data.name]: data.payload
        }
      }
    }).then(onSuccess);

  return (
    <CreateResourcePerspectiveForm
      onSubmit={onSubmit}
      isLoading={loading}
      breakdownBy={breakdownBy}
      breakdownData={breakdownData}
      perspectiveNames={Object.keys(allPerspectives)}
      onCancel={onCancel}
      filterValues={filterValues}
      appliedFilters={appliedFilters}
    />
  );
};

export default CreateResourcePerspectiveContainer;
