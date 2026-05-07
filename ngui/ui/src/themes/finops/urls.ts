export * from "@main/urls";

export const PENDING_INVITATIONS = "/pending-invitations";

const docUrl = (path: string) => `${DOCS_HYSTAX_OPTSCALE}${path}` as const;
const dataSourceConnectionDocUrl = (docPath: string) => docUrl(`e2e_guides/${docPath}`);

export const EMAIL_SUPPORT = "marketplace-support@softwareone.com";
export const HYSTAX_PRIVACY_POLICY = "https://www.softwareone.com/privacy-statement";
export const DOCS_HYSTAX_OPTSCALE = "https://docs.finops.softwareone.com/";

export const DOCS_HYSTAX_CONNECT_AWS = `https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html`;
export const DOCS_HYSTAX_CONNECT_AMAZON = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services`;
export const DOCS_HYSTAX_CONNECT_AWS_ROOT = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/aws-root-account-with-data-export-already-configured`;
export const DOCS_HYSTAX_CONNECT_AWS_LINKED = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/aws-linked`;
export const DOCS_HYSTAX_CONNECT_AZURE_SUBSCRIPTION = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/microsoft-azure`;
export const DOCS_HYSTAX_CONNECT_AZURE_TENANT = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/microsoft-azure`;
export const DOCS_HYSTAX_CONNECT_GOOGLE_CLOUD_TENANT = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/google-cloud-platform`;
export const DOCS_HYSTAX_CONNECT_GOOGLE_CLOUD = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/google-cloud-platform`;
export const DOCS_HYSTAX_RESOURCE_CONSTRAINTS = `${DOCS_HYSTAX_OPTSCALE}insights/resources/resources-constraint-policies`;
export const DOCS_HYSTAX_CLEANUP_SCRIPTS = `${DOCS_HYSTAX_OPTSCALE}insights/recommendations/clean-up-scripts-based-on-recommendations`;
export const DOCS_HYSTAX_MIGRATE_FROM_CUR_TO_DATA_EXPORTS_CUR_2_0 = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/migrate-from-cur-to-data-exports-cur-2.0`;
export const DOCS_HYSTAX_AWS_LINKED_DISCOVER_RESOURCES = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/aws-root-account-with-data-export-already-configured#discover-resources`;
export const DOCS_MARKETPLACE_PENDING_INVITATIONS = `https://docs.finops.softwareone.com/#first-time-login`;

export const DOCS_HYSTAX_AUTO_BILLING_AWS = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/aws-root-account-with-data-export-already-configured#automatic-billing-data-import-in-aws`;
export const DOCS_HYSTAX_DISCOVER_RESOURCES = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/aws-linked#discover-resources`;
export const DOCS_HYSTAX_CONNECT_AZURE_ACCOUNT = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/microsoft-azure`;
export const DOCS_HYSTAX_CONNECT_GCP_CLOUD = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/google-cloud-platform`;
export const DOCS_HYSTAX_CONNECT_KUBERNETES = dataSourceConnectionDocUrl("e2e_kubernetes.html#kubernetes");
export const DOCS_HYSTAX_CONNECTING_A_KUBERNETES_CLUSTER_TO_OPTSCALE = `${DOCS_HYSTAX_OPTSCALE}e2e_guides/e2e_kubernetes.html#connecting-a-kubernetes-cluster-to-optscale`;

export const DOCS_HYSTAX_CLUSTERS = `${DOCS_HYSTAX_OPTSCALE}clusters.html`;
export const DOCS_HYSTAX_SLACK_INTEGRATION = `${DOCS_HYSTAX_OPTSCALE}integrations.html#slack-app`;
export const DOCS_HYSTAX_GOOGLE_CALENDAR_INTEGRATION = `${DOCS_HYSTAX_OPTSCALE}integrations.html#google-calendar`;
export const DOCS_HYSTAX_CONNECT_ALIBABA_CLOUD = dataSourceConnectionDocUrl("e2e_alibaba.html");

// Hystax open source links
export const GITHUB_HYSTAX_OPTSCALE_REPO = "https://github.com/softwareone-platform/optscale";
export const GITHUB_HYSTAX_EXTRACT_LINKED_REPORTS =
  "https://github.com/softwareone-platform/optscale_tools/tree/main/extract_linked_reports";
export const PYPI_OPTSCALE_ARCEE = "https://pypi.org/project/optscale-arcee";

export const DOCS_FINOPS_AUTHENTICATION_TYPE_MIGRATION = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services#aws-organizations`;
export const DOCS_FINOPS_AWS_DATA_SOURCE = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services`;
export const DOCS_FINOPS_AWS_DATA_SOURCE_MIGRATE_CUR_2_0 = `${DOCS_HYSTAX_OPTSCALE}system/data-sources/amazon-web-services/migrate-from-legacy-cur-to-cur-2.0`;
export const DOCS_AWS_CREDENTIALS_ACCESS_KEYS = `https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html`;
