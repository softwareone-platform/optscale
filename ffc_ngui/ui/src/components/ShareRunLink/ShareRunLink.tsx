import { Stack } from "@mui/material";
import { FormattedMessage } from "react-intl";
import CodeBlock from "components/CodeBlock";
import Skeleton from "components/Skeleton";
import { getMlPublicRunUrl } from "urls";
import { SPACING_1 } from "utils/layouts";

type ShareRunLinkProps = {
  runId: string;
  arceeToken: string;
  organizationId: string;
  isLoading?: boolean;
};

const ShareRunLink = ({ runId, arceeToken, organizationId, isLoading = false }: ShareRunLinkProps) => {
  const route = getMlPublicRunUrl(runId, { organizationId, arceeToken });
  const link = `${window.location.origin}${route}`;

  return (
    <Stack spacing={SPACING_1}>
      <div>
        <FormattedMessage id="shareRunLinkDescription" />
      </div>
      <div>
        {isLoading ? (
          <Skeleton fullWidth variant="rectangle">
            <CodeBlock text={link} />
          </Skeleton>
        ) : (
          <CodeBlock text={link} />
        )}
      </div>
    </Stack>
  );
};

export default ShareRunLink;
