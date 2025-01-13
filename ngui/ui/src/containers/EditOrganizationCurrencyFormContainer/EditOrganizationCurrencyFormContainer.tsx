import { useMutation } from "@apollo/client";
import EditOrganizationCurrencyForm from "components/forms/EditOrganizationCurrencyForm";
import { FormValues } from "components/forms/EditOrganizationCurrencyForm/types";
import { UPDATE_ORGANIZATION } from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

type EditOrganizationCurrencyFormContainerProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

const EditOrganizationCurrencyFormContainer = ({ onCancel, onSuccess }: EditOrganizationCurrencyFormContainerProps) => {
  const { currency, organizationId } = useOrganizationInfo();

  const [updateOrganization, { loading }] = useMutation(UPDATE_ORGANIZATION);

  const onSubmit = (formData: FormValues) => {
    updateOrganization({
      variables: {
        organizationId,
        params: {
          currency: formData.currency
        }
      }
    }).then(onSuccess);
  };

  return (
    <EditOrganizationCurrencyForm defaultCurrency={currency} onSubmit={onSubmit} onCancel={onCancel} isLoading={loading} />
  );
};

export default EditOrganizationCurrencyFormContainer;
