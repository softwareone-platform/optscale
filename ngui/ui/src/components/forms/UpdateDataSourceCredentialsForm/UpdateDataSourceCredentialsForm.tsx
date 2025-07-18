import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import ButtonLoader from "components/ButtonLoader";
import {
  ALIBABA_CREDENTIALS_FIELD_NAMES,
  AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES,
  GCP_CREDENTIALS_FIELD_NAMES,
  GCP_TENANT_CREDENTIALS_FIELD_NAMES,
  DATABRICKS_CREDENTIALS_FIELD_NAMES,
  KUBERNETES_CREDENTIALS_FIELD_NAMES,
  AWS_LINKED_CREDENTIALS_FIELD_NAMES,
  AWS_ROOT_CREDENTIALS_FIELD_NAMES,
  AWS_ROOT_BILLING_BUCKET_FIELD_NAMES,
  AWS_ROOT_EXPORT_TYPE_FIELD_NAMES,
  AWS_ROOT_USE_AWS_EDP_DISCOUNT_FIELD_NAMES
} from "components/DataSourceCredentialFields";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import FormContentDescription from "components/FormContentDescription";
import { FIELD_NAMES as NEBIUS_FIELD_NAMES } from "components/NebiusConfigFormElements";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";
import {
  DOCS_HYSTAX_CONNECT_AWS_ROOT,
  DOCS_HYSTAX_CONNECT_ALIBABA_CLOUD,
  DOCS_HYSTAX_CONNECT_AZURE_TENANT,
  DOCS_HYSTAX_CONNECT_GOOGLE_CLOUD,
  DOCS_HYSTAX_AWS_LINKED_DISCOVER_RESOURCES,
  GITHUB_HYSTAX_K8S_COST_METRICS_COLLECTOR,
  DATABRICKS_CREATE_SERVICE_PRINCIPAL,
  DOCS_HYSTAX_MIGRATE_FROM_CUR_TO_DATA_EXPORTS_CUR_2_0,
  DOCS_HYSTAX_CONNECT_AZURE_SUBSCRIPTION
} from "urls";
import {
  ALIBABA_CNR,
  AZURE_TENANT,
  AWS_CNR,
  AWS_ROOT_CONNECT_CONFIG_SCHEMES,
  AZURE_CNR,
  NEBIUS,
  GCP_CNR,
  DATABRICKS,
  KUBERNETES_CNR,
  AWS_ROOT_CONNECT_CUR_VERSION,
  GCP_TENANT
} from "utils/constants";
import { readFileAsText } from "utils/files";
import { CredentialInputs } from "./FormElements";
import { AWS_POOL_UPDATE_DATA_EXPORT_PARAMETERS as AWS_ROOT_UPDATE_DATA_EXPORT_PARAMETERS } from "./FormElements/CredentialInputs";

const Description = ({ type, config }) => {
  switch (type) {
    case AWS_CNR:
      return (
        <>
          {config.linked ? (
            <Typography gutterBottom>
              <FormattedMessage
                id="createAwsLinkedDocumentationReference3"
                values={{
                  discoverResourcesLink: (chunks) => (
                    <Link
                      data-test-id="link_iam_user"
                      href={DOCS_HYSTAX_AWS_LINKED_DISCOVER_RESOURCES}
                      target="_blank"
                      rel="noopener"
                    >
                      {chunks}
                    </Link>
                  )
                }}
              />
            </Typography>
          ) : (
            <Typography gutterBottom component="div">
              <div>
                <FormattedMessage
                  id="createAwsRootDocumentationReference"
                  values={{
                    link: (chunks) => (
                      <Link data-test-id="link_guide" href={DOCS_HYSTAX_CONNECT_AWS_ROOT} target="_blank" rel="noopener">
                        {chunks}
                      </Link>
                    ),
                    strong: (chunks) => <strong>{chunks}</strong>
                  }}
                />
              </div>
              <div>
                <FormattedMessage
                  id="migrateToCur2.0"
                  values={{
                    link: (chunks) => (
                      <Link
                        data-test-id="link_guide"
                        href={DOCS_HYSTAX_MIGRATE_FROM_CUR_TO_DATA_EXPORTS_CUR_2_0}
                        target="_blank"
                        rel="noopener"
                      >
                        {chunks}
                      </Link>
                    ),
                    strong: (chunks) => <strong>{chunks}</strong>
                  }}
                />
              </div>
            </Typography>
          )}
        </>
      );
    case AZURE_TENANT:
      return (
        <Typography gutterBottom>
          <FormattedMessage
            id="createAzureSubscriptionDocumentationReference"
            values={{
              link: (chunks) => (
                <Link data-test-id="link_guide" href={DOCS_HYSTAX_CONNECT_AZURE_TENANT} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              ),
              strong: (chunks) => <strong>{chunks}</strong>
            }}
          />
        </Typography>
      );
    case AZURE_CNR:
      return (
        <Typography gutterBottom>
          <FormattedMessage
            id="createAzureSubscriptionDocumentationReference"
            values={{
              link: (chunks) => (
                <Link data-test-id="link_guide" href={DOCS_HYSTAX_CONNECT_AZURE_SUBSCRIPTION} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              ),
              strong: (chunks) => <strong>{chunks}</strong>
            }}
          />
        </Typography>
      );
    case ALIBABA_CNR:
      return (
        <Typography gutterBottom>
          <FormattedMessage
            id="createAlibabaDocumentationReference"
            values={{
              link: (chunks) => (
                <Link data-test-id="link_guide" href={DOCS_HYSTAX_CONNECT_ALIBABA_CLOUD} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              ),
              strong: (chunks) => <strong>{chunks}</strong>
            }}
          />
        </Typography>
      );
    case DATABRICKS:
      return (
        <Typography gutterBottom>
          <FormattedMessage
            id="createDatabricksDocumentationReference"
            values={{
              link: (chunks) => (
                <Link data-test-id="link_guide" href={DATABRICKS_CREATE_SERVICE_PRINCIPAL} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              ),
              strong: (chunks) => <strong>{chunks}</strong>
            }}
          />
        </Typography>
      );
    case KUBERNETES_CNR:
      return null;
    case GCP_CNR:
      return (
        <Typography gutterBottom>
          <FormattedMessage
            id="createGCPDocumentationReference"
            values={{
              link: (chunks) => (
                <Link data-test-id="link_guide" href={DOCS_HYSTAX_CONNECT_GOOGLE_CLOUD} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
              p: (chunks) => <p>{chunks}</p>
            }}
          />
        </Typography>
      );
    default:
      return null;
  }
};

const UpdateCredentialsWarning = ({ type }) => {
  const renderUpdateWarning = () => (
    <FormContentDescription
      alertProps={{
        messageId: "updateDateSourceCredentialsWarning"
      }}
    />
  );

  switch (type) {
    case AWS_CNR:
      return renderUpdateWarning();
    case AZURE_CNR:
      return renderUpdateWarning();
    case ALIBABA_CNR:
      return renderUpdateWarning();
    case KUBERNETES_CNR:
      return (
        <FormContentDescription
          fullWidth
          alertProps={{
            messageId: "k8sUpdateWarning",
            messageValues: {
              link: (chunks) => (
                <Link data-test-id="link_guide" href={GITHUB_HYSTAX_K8S_COST_METRICS_COLLECTOR} target="_blank" rel="noopener">
                  {chunks}
                </Link>
              )
            }
          }}
        />
      );
    case GCP_CNR:
      return renderUpdateWarning();
    case GCP_TENANT:
      return renderUpdateWarning();
    case NEBIUS:
      return renderUpdateWarning();
    default:
      return null;
  }
};

const getConfig = (type, config) => {
  switch (type) {
    case AWS_CNR:
      return {
        getDefaultFormValues: () =>
          config.linked
            ? {
                [AWS_LINKED_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID]: config.access_key_id,
                [AWS_LINKED_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY]: ""
              }
            : {
                [AWS_ROOT_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID]: config.access_key_id,
                [AWS_ROOT_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY]: "",
                [AWS_ROOT_UPDATE_DATA_EXPORT_PARAMETERS]: false,
                [AWS_ROOT_USE_AWS_EDP_DISCOUNT_FIELD_NAMES.USE_EDP_DISCOUNT]: config.use_edp_discount ?? false,
                [AWS_ROOT_EXPORT_TYPE_FIELD_NAMES.CUR_VERSION]: config.cur_version ?? AWS_ROOT_CONNECT_CUR_VERSION.CUR_2,
                [AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_NAME]: config.bucket_name,
                [AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.EXPORT_NAME]: config.report_name,
                [AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.REGION_NAME]: config.region_name,
                [AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_PREFIX]: config.bucket_prefix
              },
        parseFormDataToApiParams: (formData) => ({
          config: {
            ...(config.linked
              ? {
                  access_key_id: formData[AWS_LINKED_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID],
                  secret_access_key: formData[AWS_LINKED_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY],
                  linked: true
                }
              : {
                  access_key_id: formData[AWS_ROOT_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID],
                  secret_access_key: formData[AWS_ROOT_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY],
                  config_scheme: AWS_ROOT_CONNECT_CONFIG_SCHEMES.BUCKET_ONLY,
                  use_edp_discount: formData[AWS_ROOT_USE_AWS_EDP_DISCOUNT_FIELD_NAMES.USE_EDP_DISCOUNT],
                  ...(formData[AWS_ROOT_UPDATE_DATA_EXPORT_PARAMETERS]
                    ? {
                        cur_version: Number(formData[AWS_ROOT_EXPORT_TYPE_FIELD_NAMES.CUR_VERSION]),
                        bucket_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_NAME],
                        report_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.EXPORT_NAME],
                        region_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.REGION_NAME] || undefined,
                        bucket_prefix: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_PREFIX]
                      }
                    : {
                        /**
                         * Data sources that were created before the introduction of the new data export parameters
                         * may not have the cur_version field set, so we need to pass it as undefined to avoid sending it to the backend
                         */
                        cur_version: config.cur_version ?? undefined,
                        bucket_name: config.bucket_name,
                        report_name: config.report_name,
                        region_name: config.region_name,
                        bucket_prefix: config.bucket_prefix
                      })
                })
          }
        })
      };
    case AZURE_TENANT:
      return {
        getDefaultFormValues: () => ({
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.CLIENT_ID]: config.client_id,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.TENANT]: config.tenant,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SECRET]: ""
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            client_id: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.CLIENT_ID],
            tenant: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.TENANT],
            secret: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SECRET]
          }
        })
      };
    case AZURE_CNR:
      return {
        getDefaultFormValues: () => ({
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SUBSCRIPTION_ID]: config.subscription_id,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.CLIENT_ID]: config.client_id,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.TENANT]: config.tenant,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SECRET]: "",
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.USE_BILLING_EXPORT]: !!config.export_name,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.EXPORT_NAME]: config.export_name,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_ACCOUNT_CONNECTION_STRING]: config.sa_connection_string,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_CONTAINER]: config.container,
          [AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_DIRECTORY]: config.directory
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            subscription_id: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SUBSCRIPTION_ID],
            client_id: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.CLIENT_ID],
            tenant: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.TENANT],
            secret: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.SECRET],
            ...(formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.USE_BILLING_EXPORT]
              ? {
                  export_name: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.EXPORT_NAME],
                  sa_connection_string: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_ACCOUNT_CONNECTION_STRING],
                  container: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_CONTAINER],
                  directory: formData[AZURE_SUBSCRIPTION_CREDENTIALS_FIELD_NAMES.STORAGE_DIRECTORY]
                }
              : {})
          }
        })
      };
    case ALIBABA_CNR:
      return {
        getDefaultFormValues: () => ({
          [ALIBABA_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID]: config.access_key_id,
          [ALIBABA_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY]: ""
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            access_key_id: formData[ALIBABA_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID],
            secret_access_key: formData[ALIBABA_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY]
          }
        })
      };
    case DATABRICKS:
      return {
        getDefaultFormValues: () => ({
          [DATABRICKS_CREDENTIALS_FIELD_NAMES.ACCOUNT_ID]: config.account_id,
          [DATABRICKS_CREDENTIALS_FIELD_NAMES.CLIENT_ID]: config.client_id,
          [DATABRICKS_CREDENTIALS_FIELD_NAMES.CLIENT_SECRET]: ""
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            account_id: formData[DATABRICKS_CREDENTIALS_FIELD_NAMES.ACCOUNT_ID],
            client_id: formData[DATABRICKS_CREDENTIALS_FIELD_NAMES.CLIENT_ID],
            client_secret: formData[DATABRICKS_CREDENTIALS_FIELD_NAMES.CLIENT_SECRET]
          }
        })
      };
    case KUBERNETES_CNR:
      return {
        getDefaultFormValues: () => ({
          [KUBERNETES_CREDENTIALS_FIELD_NAMES.USER]: config.user,
          [KUBERNETES_CREDENTIALS_FIELD_NAMES.PASSWORD]: ""
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            password: formData[KUBERNETES_CREDENTIALS_FIELD_NAMES.PASSWORD] || undefined,
            user: formData[KUBERNETES_CREDENTIALS_FIELD_NAMES.USER] || undefined
          }
        })
      };
    case GCP_CNR:
      return {
        getDefaultFormValues: () => ({
          [GCP_CREDENTIALS_FIELD_NAMES.BILLING_DATA_DATASET]: config.billing_data.dataset_name,
          [GCP_CREDENTIALS_FIELD_NAMES.BILLING_DATA_TABLE]: config.billing_data.table_name,
          [GCP_CREDENTIALS_FIELD_NAMES.CREDENTIALS]: ""
        }),
        parseFormDataToApiParams: async (formData) => {
          // TODO: the form validates the file itself, not the content.
          // Try to do both to avoid parsing the string here.
          const credentials = await readFileAsText(formData[GCP_CREDENTIALS_FIELD_NAMES.CREDENTIALS]);

          return {
            config: {
              credentials: JSON.parse(credentials),
              billing_data: {
                dataset_name: formData[GCP_CREDENTIALS_FIELD_NAMES.BILLING_DATA_DATASET],
                table_name: formData[GCP_CREDENTIALS_FIELD_NAMES.BILLING_DATA_TABLE]
              }
            }
          };
        }
      };
    case GCP_TENANT:
      return {
        getDefaultFormValues: () => ({
          [GCP_TENANT_CREDENTIALS_FIELD_NAMES.BILLING_DATA_DATASET]: config.billing_data.dataset_name,
          [GCP_TENANT_CREDENTIALS_FIELD_NAMES.BILLING_DATA_TABLE]: config.billing_data.table_name,
          [GCP_TENANT_CREDENTIALS_FIELD_NAMES.CREDENTIALS]: ""
        }),
        parseFormDataToApiParams: async (formData) => {
          // TODO: the form validates the file itself, not the content.
          // Try to do both to avoid parsing the string here.
          const credentials = await readFileAsText(formData[GCP_TENANT_CREDENTIALS_FIELD_NAMES.CREDENTIALS]);

          return {
            config: {
              credentials: JSON.parse(credentials),
              billing_data: {
                dataset_name: formData[GCP_TENANT_CREDENTIALS_FIELD_NAMES.BILLING_DATA_DATASET],
                table_name: formData[GCP_TENANT_CREDENTIALS_FIELD_NAMES.BILLING_DATA_TABLE]
              }
            }
          };
        }
      };
    case NEBIUS:
      return {
        getDefaultFormValues: () => ({
          [NEBIUS_FIELD_NAMES.CLOUD_NAME]: config.cloud_name,
          [NEBIUS_FIELD_NAMES.SERVICE_ACCOUNT_ID]: config.service_account_id,
          [NEBIUS_FIELD_NAMES.KEY_ID]: config.key_id,
          [NEBIUS_FIELD_NAMES.PRIVATE_KEY]: "",
          [NEBIUS_FIELD_NAMES.ACCESS_KEY_ID]: config.access_key_id,
          [NEBIUS_FIELD_NAMES.SECRET_ACCESS_KEY]: "",
          [NEBIUS_FIELD_NAMES.BUCKET_NAME]: config.bucket_name,
          [NEBIUS_FIELD_NAMES.BUCKET_PREFIX]: config.bucket_prefix
        }),
        parseFormDataToApiParams: (formData) => ({
          config: {
            cloud_name: formData[NEBIUS_FIELD_NAMES.CLOUD_NAME],
            service_account_id: formData[NEBIUS_FIELD_NAMES.SERVICE_ACCOUNT_ID],
            key_id: formData[NEBIUS_FIELD_NAMES.KEY_ID],
            private_key: formData[NEBIUS_FIELD_NAMES.PRIVATE_KEY],
            access_key_id: formData[NEBIUS_FIELD_NAMES.ACCESS_KEY_ID],
            secret_access_key: formData[NEBIUS_FIELD_NAMES.SECRET_ACCESS_KEY],
            bucket_name: formData[NEBIUS_FIELD_NAMES.BUCKET_NAME],
            bucket_prefix: formData[NEBIUS_FIELD_NAMES.BUCKET_PREFIX]
          }
        })
      };
    default:
      return {};
  }
};

const UpdateDataSourceCredentialsForm = ({ id, type, config, onSubmit, onCancel, isLoading = false }) => {
  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const { getDefaultFormValues, parseFormDataToApiParams } = getConfig(type, config);

  const methods = useForm({
    defaultValues: getDefaultFormValues()
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (formData) => {
          onSubmit(id, await parseFormDataToApiParams(formData));
        })}
        noValidate
      >
        <Description type={type} config={config} />
        <CredentialInputs type={type} config={config} />
        <UpdateCredentialsWarning type={type} />
        <FormButtonsWrapper>
          <ButtonLoader
            dataTestId="btn_update_data_source_credentials"
            loaderDataTestId="loading_btn_update_data_source_credentials"
            messageId="save"
            color="primary"
            variant="contained"
            type="submit"
            isLoading={isLoading}
            disabled={isRestricted}
            tooltip={{
              show: isRestricted,
              value: restrictionReasonMessage
            }}
          />
          <Button dataTestId="btn_cancel_update_data_source_credentials" messageId="cancel" onClick={onCancel} />
        </FormButtonsWrapper>
      </form>
    </FormProvider>
  );
};

export default UpdateDataSourceCredentialsForm;
