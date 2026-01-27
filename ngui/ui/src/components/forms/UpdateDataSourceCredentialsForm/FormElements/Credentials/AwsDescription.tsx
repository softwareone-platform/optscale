import { ReactNode } from "react";
import { Link, SxProps, Theme, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { DOCS_FINOPS_AWS_DATA_SOURCE, DOCS_FINOPS_AWS_DATA_SOURCE_MIGRATE_CUR_2_0 } from "urls";
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
        }
      }}
    />
  </Typography>
);

const AwsDescription = ({ authenticationType }: { authenticationType: string }) => {
  const getAwsDescription = (authenticationType: string) => {
    switch (authenticationType) {
      case "assumedRoleLinked":
      case "accessKeyLinked":
        return (
          <ParagraphHelper
            messageId="awsDataSourceUpdateDescriptionP1"
            link={DOCS_FINOPS_AWS_DATA_SOURCE}
            sx={{ marginBottom: SPACING_2 }}
          />
        );
      case "assumedRole":
      case "accessKey":
        return (
          <>
            <ParagraphHelper messageId="awsDataSourceUpdateDescriptionP1" link={DOCS_FINOPS_AWS_DATA_SOURCE} />
            <ParagraphHelper
              messageId="awsDataSourceUpdateDescriptionP2"
              link={DOCS_FINOPS_AWS_DATA_SOURCE_MIGRATE_CUR_2_0}
              sx={{ marginBottom: SPACING_2 }}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  return <>{getAwsDescription(authenticationType)}</>;
};

export default AwsDescription;
