import CloudLabel from "components/CloudLabel";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { useAllDataSources } from "hooks/coreData";
import { AZURE_CNR } from "utils/constants";

const ParentDataSource = ({ parentDataSourceId }) => {
  const dataSources = useAllDataSources();
  const { name, type } = dataSources.find((dataSource) => dataSource.id === parentDataSourceId) ?? {};

  return (
    <KeyValueLabel
      keyMessageId="parentDataSource"
      value={<CloudLabel id={parentDataSourceId} name={name} type={type} />}
      dataTestIds={{ key: "p_parent_data_source_key", value: "p_parent_data_source_value" }}
    />
  );
};

const AzureProperties = ({ config, parentId }) => {
  const { client_id: clientId, tenant, expense_import_scheme: expenseImportScheme, subscription_id: subscriptionId } = config;

  return (
    <>
      {parentId && <ParentDataSource parentDataSourceId={parentId} />}
      {subscriptionId && (
        <KeyValueLabel
          keyMessageId="subscriptionId"
          value={subscriptionId}
          dataTestIds={{
            key: `p_${AZURE_CNR}_id`,
            value: `p_${AZURE_CNR}_value`
          }}
        />
      )}
      <KeyValueLabel
        keyMessageId="applicationClientId"
        value={clientId}
        dataTestIds={{ key: "p_client_id_key", value: "p_client_id_value" }}
      />
      <KeyValueLabel
        keyMessageId="directoryTenantId"
        value={tenant}
        dataTestIds={{ key: "p_tenant_key", value: "p_tenant_value" }}
      />
      <KeyValueLabel
        keyMessageId="expenseImportScheme"
        value={expenseImportScheme}
        dataTestIds={{ key: "p_expense_import_scheme_key", value: "p_expense_import_scheme_value" }}
      />
    </>
  );
};

export default AzureProperties;
