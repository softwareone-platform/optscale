import { FormattedMessage } from "react-intl";
import CaptionedCell from "components/CaptionedCell";
import CloudResourceId from "components/CloudResourceId";
import TextWithDataTestId from "components/TextWithDataTestId";
import { useAllDataSources } from "hooks/coreData";
import { getCloudResourceIdentifier } from "utils/resources";
import { RESOURCE_ID_COLUMN_CELL_STYLE } from "utils/tables";

const CellContent = ({ rowData }) => {
  const { resource_name: name, resource_id: resourceId, cloud_account_id: dataSourceId } = rowData;

  const dataSources = useAllDataSources();

  return (
    <CaptionedCell caption={name}>
      <CloudResourceId
        disableLink={!dataSources.find(({ id }) => id === dataSourceId)}
        resourceId={resourceId}
        cloudResourceIdentifier={getCloudResourceIdentifier(rowData)}
        dataSourceId={dataSourceId}
      />
    </CaptionedCell>
  );
};

const resource = ({ headerDataTestId, id = "cloudResourceIdentifier" }) => ({
  header: (
    <TextWithDataTestId dataTestId={headerDataTestId}>
      <FormattedMessage id="resource" />
    </TextWithDataTestId>
  ),
  id,
  style: RESOURCE_ID_COLUMN_CELL_STYLE,
  cell: ({ row: { original } }) => <CellContent rowData={original} />
});

export default resource;
