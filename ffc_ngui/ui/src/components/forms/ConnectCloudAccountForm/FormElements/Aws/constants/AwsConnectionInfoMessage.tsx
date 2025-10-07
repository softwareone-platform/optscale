import React, { ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { DOCS_HYSTAX_CONNECT_AWS } from "urls";
import { CONNECTION_TYPES } from "utils/constants";

const renderAwsTypeDescription = (messageId: string, linkUrl: string | undefined = undefined) => (
  <div key={messageId} style={{ marginBottom: "1rem", fontSize: 14 }}>
    <FormattedMessage
      id={messageId}
      values={{
        link: (chunks: ReactNode[]) => {
          const linkText = chunks.length > 0 ? chunks : linkUrl;
          return (
            <Link data-test-id="link_guide" style={{ display: "block" }} href={linkUrl} target="_blank" rel="noopener">
              {linkText}
            </Link>
          );
        },
        strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
        warning: (chunks: ReactNode) => <Alert severity="warning">{chunks}</Alert>
      }}
    />
  </div>
);

const awsDefaultAssumedRoleDescriptions = [
  renderAwsTypeDescription("createAwsMemberAssumedRoleDescriptions"),
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference3", DOCS_HYSTAX_CONNECT_AWS)
];

const awsDefaultAccessKeyDescriptions = [
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference1", DOCS_HYSTAX_CONNECT_AWS),
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference2"),
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference3", DOCS_HYSTAX_CONNECT_AWS)
];

const awsMemberAccessKeyDescriptions = [
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference1", DOCS_HYSTAX_CONNECT_AWS),
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference4"),
  renderAwsTypeDescription("createAwsDefaultAssumedRoleDDocumentationReference3", DOCS_HYSTAX_CONNECT_AWS)
];

export const awsConnectionAssumedRoleTypeDescriptions = {
  [CONNECTION_TYPES.AWS_MANAGEMENT]: awsDefaultAssumedRoleDescriptions,
  [CONNECTION_TYPES.AWS_MEMBER]: awsDefaultAssumedRoleDescriptions,
  [CONNECTION_TYPES.AWS_STANDALONE]: awsDefaultAssumedRoleDescriptions
};

export const awsConnectionKeyAccessTypeDescriptions = {
  [CONNECTION_TYPES.AWS_MANAGEMENT]: awsDefaultAccessKeyDescriptions,
  [CONNECTION_TYPES.AWS_MEMBER]: awsMemberAccessKeyDescriptions,
  [CONNECTION_TYPES.AWS_STANDALONE]: awsDefaultAccessKeyDescriptions
};
