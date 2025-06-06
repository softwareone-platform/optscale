import CreateColumnSetForm from "components/forms/CreateColumnSetForm";
import { getVisibleColumnIds } from "components/Table/utils";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import LayoutsService from "services/LayoutsService";
import { LAYOUT_TYPES } from "utils/constants";

const CreateColumnSetFormContainer = ({ tableContext }) => {
  const { useCreate } = LayoutsService();

  const { organizationId } = useOrganizationInfo();

  const { onCreate, isLoading: isCreateLayoutLoading } = useCreate();

  const createColumnSet = (name: string) => {
    const visibleColumnIds = getVisibleColumnIds(tableContext);

    return onCreate(organizationId, {
      name,
      data: JSON.stringify({
        columns: visibleColumnIds
      }),
      type: LAYOUT_TYPES.RESOURCE_RAW_EXPENSES_COLUMNS
    });
  };

  return (
    <CreateColumnSetForm
      onSubmit={createColumnSet}
      isLoadingProps={{
        isSubmitLoading: isCreateLayoutLoading
      }}
    />
  );
};

export default CreateColumnSetFormContainer;
