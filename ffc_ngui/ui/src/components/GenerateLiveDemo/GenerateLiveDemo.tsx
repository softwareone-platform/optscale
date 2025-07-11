import Loading from "./Loading";
import Retry from "./Retry";

type GenerateLiveDemoProps = {
  isLoading: boolean;
  hasError: boolean;
  retry: () => void;
};

const GenerateLiveDemo = ({ isLoading, hasError, retry }: GenerateLiveDemoProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Retry retry={retry} />;
  }

  return null;
};

export default GenerateLiveDemo;
