import { useMutation } from "@apollo/client";
import DataSourceBillingReimportForm from "components/forms/DataSourceBillingReimportForm/DataSourceBillingReimportForm";
import { GET_DATA_SOURCE, UPDATE_DATA_SOURCE } from "graphql/api/restapi/queries/restapi.queries";
import { getStartOfDayInUTCinSeconds } from "utils/datetime";

type DataSourceBillingReimportContainerProps = {
  dataSourceId: string;
  onSuccess: () => void;
};

const DataSourceBillingReimportContainer = ({ dataSourceId, onSuccess }: DataSourceBillingReimportContainerProps) => {
  const [updateDataSource, { loading }] = useMutation(UPDATE_DATA_SOURCE);

  return (
    <DataSourceBillingReimportForm
      onSubmit={(formData) => {
        const importFrom = getStartOfDayInUTCinSeconds(formData.importFrom);

        return updateDataSource({
          variables: {
            dataSourceId,
            params: {
              lastImportAt: importFrom,
              lastImportModifiedAt: importFrom
            }
          },
          refetchQueries: [GET_DATA_SOURCE]
        }).then(onSuccess);
      }}
      isSubmitLoading={loading}
    />
  );
};

export default DataSourceBillingReimportContainer;
