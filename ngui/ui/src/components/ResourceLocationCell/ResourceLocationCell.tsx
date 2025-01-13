import CaptionedCell from "components/CaptionedCell";
import CloudLabel from "components/CloudLabel";
import { useAllDataSources } from "hooks/coreData";

const ResourceLocationCell = ({ dataSource, caption }) => {
  const dataSources = useAllDataSources();

  return (
    <CaptionedCell caption={caption}>
      <CloudLabel
        disableLink={!dataSources.find(({ id }) => id === dataSource.id)}
        id={dataSource.id}
        name={dataSource.name}
        type={dataSource.type}
      />
    </CaptionedCell>
  );
};

export default ResourceLocationCell;
