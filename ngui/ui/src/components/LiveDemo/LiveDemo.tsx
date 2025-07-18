import { useState } from "react";
import { Box, Stack } from "@mui/material";
import LiveDemoForm from "components/forms/LiveDemoForm";
import { FormValues } from "components/forms/LiveDemoForm/types";
import Logo from "components/Logo";
import GenerateLiveDemoContainer from "containers/GenerateLiveDemoContainer";
import { SPACING_4 } from "utils/layouts";
import { getSearchParams } from "utils/network";

const LiveDemo = () => {
  const { emailbypass } = getSearchParams();

  const [demoParameters, setDemoParameters] = useState<FormValues | null>(null);

  // The search parameter can be of any valid type (e.g., string), so we need to explicitly check if it is equal to true.
  if (emailbypass === true) {
    return <GenerateLiveDemoContainer />;
  }

  return demoParameters ? (
    <GenerateLiveDemoContainer email={demoParameters.email} subscribeToNewsletter={demoParameters.subscribeToNewsletter} />
  ) : (
    <Stack spacing={SPACING_4} alignItems="center">
      <Box>
        <Logo width={200} dataTestId="img_logo" />
      </Box>
      <Box pl={2} pr={2}>
        <LiveDemoForm
          onSubmit={(formData) => {
            setDemoParameters(formData);
          }}
        />
      </Box>
    </Stack>
  );
};

export default LiveDemo;
