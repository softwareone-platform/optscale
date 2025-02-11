import { useLazyQuery, useMutation } from "@apollo/client";
import CreateOrganizationForm from "components/forms/CreateOrganizationForm";
import { FormValues } from "components/forms/CreateOrganizationForm/types";
import { CREATE_ORGANIZATION, GET_ORGANIZATIONS, UPDATE_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries";

const CreateOrganizationContainer = ({ onSuccess, closeSideModal }) => {
  const [createOrganization, { loading: createOrganizationLoading }] = useMutation(CREATE_ORGANIZATION);

  const [getOrganizations, { loading: isOrganizationsLoading }] = useLazyQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only"
  });

  const [updateOptscaleCapabilityMutation, { loading: updateOptscaleCapabilityLoading }] =
    useMutation(UPDATE_OPTSCALE_CAPABILITY);

  const isLoading = createOrganizationLoading || isOrganizationsLoading || updateOptscaleCapabilityLoading;

  const onSubmit = async (formData: FormValues) => {
    const {
      data: {
        createOrganization: { id: organizationId }
      }
    } = await createOrganization({
      variables: {
        organizationName: formData.name
      }
    });

    await updateOptscaleCapabilityMutation({
      variables: {
        organizationId,
        value: formData.capability
      }
    });

    await getOrganizations();

    onSuccess(organizationId);
    closeSideModal();
  };

  return <CreateOrganizationForm onCancel={closeSideModal} onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CreateOrganizationContainer;
