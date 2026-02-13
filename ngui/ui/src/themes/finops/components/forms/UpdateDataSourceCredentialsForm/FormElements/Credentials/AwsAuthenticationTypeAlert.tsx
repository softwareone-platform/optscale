import { Alert, Link, SxProps, Theme, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { ReactNode } from "react-markdown/lib/react-markdown";
import { DOCS_AWS_CREDENTIALS_ACCESS_KEYS, DOCS_FINOPS_AUTHENTICATION_TYPE_MIGRATION } from "@theme/urls";
import { SPACING_2 } from "utils/layouts";

const ParagraphHelper = ({ messageId, link, sx }: { messageId: string; link?: string; sx?: SxProps<Theme> }) => (
  <Typography sx={sx}>
    <FormattedMessage
      id={messageId}
      values={{
        link: (chunks: ReactNode[]) => {
          const linkText = chunks.length > 0 ? chunks : link;
          return (
            <Link data-test-id="documentation_link" href={link} target="_blank" rel="noopener">
              {linkText}
            </Link>
          );
        },
        strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
        break: <br />
      }}
    />
  </Typography>
);

const AwsAuthenticationTypeAlert = ({ authenticationType }: { authenticationType: string }) => {
  const getAlert = (authenticationType: string) => {
    switch (authenticationType) {
      case "assumedRole":
        return (
          <>
            <ParagraphHelper sx={{ marginBottom: SPACING_2 }} messageId="awsAuthenticationTypeAlert:assumedRoleP1" />
            <ParagraphHelper sx={{ marginBottom: SPACING_2 }} messageId="awsAuthenticationTypeAlert:assumedRoleP2" />
            <ParagraphHelper messageId="awsAuthenticationTypeAlert:assumedRoleP3" />
          </>
        );
      case "assumedRoleLinked":
        return (
          <>
            <ParagraphHelper sx={{ marginBottom: SPACING_2 }} messageId="awsAuthenticationTypeAlert:assumedRoleP1" />
            <ParagraphHelper messageId="awsAuthenticationTypeAlert:assumedRoleP2" />
          </>
        );
      case "accessKeyLinked":
      case "accessKey":
        return (
          <>
            <ParagraphHelper
              sx={{ marginBottom: SPACING_2 }}
              messageId="awsAuthenticationTypeAlert:accessKeyP1"
              link={DOCS_FINOPS_AUTHENTICATION_TYPE_MIGRATION}
            />
            <ParagraphHelper messageId="awsAuthenticationTypeAlert:accessKeyP2" link={DOCS_AWS_CREDENTIALS_ACCESS_KEYS} />
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <Alert severity="warning" sx={{ mt: 1, mb: 1 }}>
      {getAlert(authenticationType)}
    </Alert>
  );
};

export default AwsAuthenticationTypeAlert;
