import {
  AzureTenantCredentials,
  AzureSubscriptionCredentials,
  GcpCredentials,
  GcpTenantCredentials
} from "components/DataSourceCredentialFields";
import { CONNECTION_TYPES } from "utils/constants";
import { ObjectValues } from "utils/types";
import { AwsForm } from "./Aws";
import { AuthenticationType } from "./Aws/types/AwsForm.types";

// MPT_TODO: disabled because these types are not supported in Assumed Role implementatio
// const AwsRootInputs = () => (
//   <ConnectForm>
//     {({ watch }) => {
//       const isFindReportWatch = watch(AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT, true);
//       const configScheme =
//         watch(AWS_ROOT_INPUTS_FIELD_NAMES.CONFIG_SCHEME, AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT) ||
//         AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT;
//       return (
//         <>
//           <AwsRootCredentials />
//           <AwsRootUseAwsEdpDiscount />
//           <AwsRootExportType />
//           <Switch
//             name={AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT}
//             label={<FormattedMessage id="dataExportDetection" />}
//             defaultValue={isFindReportWatch}
//             adornment={
//               <QuestionMark
//                 messageId="dataExportDetectionTooltip"
//                 messageValues={{
//                   break: <br />
//                 }}
//                 dataTestId="qmark_user_report"
//               />
//             }
//           />
//           {!isFindReportWatch && (
//             <>
//               <RadioGroup
//                 name={AWS_ROOT_INPUTS_FIELD_NAMES.CONFIG_SCHEME}
//                 defaultValue={configScheme}
//                 radioButtons={[
//                   {
//                     value: AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT,
//                     label: <FormattedMessage id="createNewCostUsageReport" />
//                   },
//                   {
//                     value: AWS_ROOT_CONNECT_CONFIG_SCHEMES.BUCKET_ONLY,
//                     label: <FormattedMessage id="connectOnlyToDataInBucket" />
//                   }
//                 ]}
//               />
//               <Typography gutterBottom data-test-id="p_data_export_detection_description">
//                 <FormattedMessage
//                   id={
//                     configScheme === AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT
//                       ? "dataExportDetectionDescription1"
//                       : "dataExportDetectionDescription2"
//                   }
//                 />
//               </Typography>
//               <AwsRootBillingBucket />
//             </>
//           )}
//         </>
//       );
//     }}
//   </ConnectForm>
// );
//
// const NebiusInputs = () => (
//   <>
//     <CloudName />
//     <Box mt={1} mb={1}>
//       <ServiceAccountCredentialsDescription />
//     </Box>
//     <NebiusCredentials />
//     <BillingReportBucketTitle />
//     <Box mt={1} mb={1}>
//       <BillingReportBucketDescription />
//     </Box>
//     <ReportBucketName />
//     <ReportBucketPathPrefix />
//   </>
// );

type ConnectionType = ObjectValues<typeof CONNECTION_TYPES>;

const ConnectionInputs = ({
  connectionType,
  authenticationType
}: {
  connectionType: ConnectionType;
  authenticationType: AuthenticationType | null;
}) => {
  switch (connectionType) {
    case CONNECTION_TYPES.AWS_MANAGEMENT:
    case CONNECTION_TYPES.AWS_MEMBER:
    case CONNECTION_TYPES.AWS_STANDALONE:
      return <AwsForm authenticationType={authenticationType} connectionType={connectionType} />;
    case CONNECTION_TYPES.AZURE_TENANT:
      return <AzureTenantCredentials />;
    case CONNECTION_TYPES.AZURE_SUBSCRIPTION:
      return <AzureSubscriptionCredentials />;
    case CONNECTION_TYPES.GCP_PROJECT:
      return <GcpCredentials />;
    case CONNECTION_TYPES.GCP_TENANT:
      return <GcpTenantCredentials />;
    // MPT_TODO: disabled because these types are not supported in Assumed Role implementation
    // case CONNECTION_TYPES.AWS_ROOT:
    //   return <AwsRootInputs />;
    // case CONNECTION_TYPES.AWS_LINKED:
    //   return <AwsLinkedCredentials />;
    // case CONNECTION_TYPES.ALIBABA:
    //   return <AlibabaCredentials />;
    // case CONNECTION_TYPES.NEBIUS:
    //   return <NebiusInputs />;
    // case CONNECTION_TYPES.DATABRICKS:
    //   return <DatabricksCredentials />;
    // case CONNECTION_TYPES.KUBERNETES:
    //   return <KubernetesCredentials />;
    default:
      return null;
  }
};

export default ConnectionInputs;
