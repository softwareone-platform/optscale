import { useLazyQuery, useMutation } from "@apollo/client";
import CreateOrganizationForm from "components/forms/CreateOrganizationForm";
import { FormValues } from "components/forms/CreateOrganizationForm/types";
import { CREATE_ORGANIZATION, GET_ORGANIZATIONS } from "graphql/api/restapi/queries";

const CreateOrganizationContainer = ({ onSuccess, closeSideModal }) => {
  const [createOrganization, { loading: createOrganizationLoading }] = useMutation(CREATE_ORGANIZATION);

  const [getOrganizations, { loading: isOrganizationsLoading }] = useLazyQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = createOrganizationLoading || isOrganizationsLoading;

  const onSubmit = async (formData: FormValues) => {
    const {
      data: {
        createOrganization: { id }
      }
    } = await createOrganization({
      variables: {
        organizationName: formData.name
      }
    });
    await getOrganizations();
    onSuccess(id);
    closeSideModal();
  };

  return <CreateOrganizationForm onCancel={closeSideModal} onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CreateOrganizationContainer;
