import Icon from "components/Icon";
import { useDataSources } from "hooks/useDataSources";

const CloudTypeIcon = ({ type, ...rest }) => {
  const { icon } = useDataSources(type);
  return icon ? <Icon {...rest} fontSize={"large"} icon={icon} /> : null;
};

export default CloudTypeIcon;
