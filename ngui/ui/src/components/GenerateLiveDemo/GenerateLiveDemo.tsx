import { Box, Stack } from "@mui/material";
import Logo from "components/Logo";
import { SPACING_6 } from "utils/layouts";
import Loading from "./Loading";
import Retry from "./Retry";
import SetupCapability from "./SetupCapability";

type GenerateLiveDemoProps = {
  retry: () => void;
  isLoading?: boolean;
  showRetry?: boolean;
  organizationId?: string;
  onSetupCapabilityError: () => void;
  onSetupCapabilitySuccess: () => void;
};

const GenerateLiveDemo = ({
  retry,
  isLoading = false,
  showRetry = false,
  organizationId,
  onSetupCapabilitySuccess,
  onSetupCapabilityError
}: GenerateLiveDemoProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (showRetry) {
      return <Retry retry={retry} />;
    }

    if (organizationId) {
      return (
        <SetupCapability
          organizationId={organizationId}
          onSuccess={onSetupCapabilitySuccess}
          onError={onSetupCapabilityError}
        />
      );
    }

    return null;
  };

  return (
    <Stack spacing={SPACING_6} alignItems="center">
      <Box>
        <Logo width={200} dataTestId="img_logo" />
      </Box>
      {renderContent()}
    </Stack>
  );
};

export default GenerateLiveDemo;
