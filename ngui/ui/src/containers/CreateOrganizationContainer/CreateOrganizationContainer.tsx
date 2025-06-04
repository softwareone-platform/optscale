import { useLazyQuery, useMutation } from "@apollo/client";
import CreateOrganizationForm from "components/forms/CreateOrganizationForm";
import { FormValues } from "components/forms/CreateOrganizationForm/types";
import { CREATE_ORGANIZATION, GET_ORGANIZATIONS } from "graphql/api/restapi/queries";

type CreateOrganizationContainerProps = {
  onSuccess: (id: string) => void;
  closeSideModal: () => void;
};

const CreateOrganizationContainer = ({ onSuccess, closeSideModal }: CreateOrganizationContainerProps) => {
  const [createOrganization, { loading: createOrganizationLoading }] = useMutation(CREATE_ORGANIZATION);

  const [getOrganizations, { loading: isOrganizationsLoading }] = useLazyQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = createOrganizationLoading || isOrganizationsLoading;

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

    await getOrganizations();

    onSuccess(organizationId);
    closeSideModal();
  };

  return <CreateOrganizationForm onCancel={closeSideModal} onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CreateOrganizationContainer;
