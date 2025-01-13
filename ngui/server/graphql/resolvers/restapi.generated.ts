import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSONObject: { input: Record<string, any>; output: Record<string, any>; }
};

export type AlibabaConfig = {
  __typename?: 'AlibabaConfig';
  access_key_id?: Maybe<Scalars['String']['output']>;
};

export type AlibabaConfigInput = {
  access_key_id: Scalars['String']['input'];
  secret_access_key: Scalars['String']['input'];
};

export type AlibabaDataSource = DataSourceInterface & {
  __typename?: 'AlibabaDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<AlibabaConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type AwsConfig = {
  __typename?: 'AwsConfig';
  access_key_id?: Maybe<Scalars['String']['output']>;
  bucket_name?: Maybe<Scalars['String']['output']>;
  bucket_prefix?: Maybe<Scalars['String']['output']>;
  config_scheme?: Maybe<Scalars['String']['output']>;
  cur_version?: Maybe<Scalars['Int']['output']>;
  linked?: Maybe<Scalars['Boolean']['output']>;
  region_name?: Maybe<Scalars['String']['output']>;
  report_name?: Maybe<Scalars['String']['output']>;
  use_edp_discount?: Maybe<Scalars['Boolean']['output']>;
};

export type AwsDataSource = DataSourceInterface & {
  __typename?: 'AwsDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<AwsConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type AwsLinkedConfigInput = {
  access_key_id: Scalars['String']['input'];
  linked: Scalars['Boolean']['input'];
  secret_access_key: Scalars['String']['input'];
};

export type AwsRootConfigInput = {
  access_key_id: Scalars['String']['input'];
  bucket_name?: InputMaybe<Scalars['String']['input']>;
  bucket_prefix?: InputMaybe<Scalars['String']['input']>;
  config_scheme?: InputMaybe<Scalars['String']['input']>;
  cur_version?: InputMaybe<Scalars['Int']['input']>;
  report_name?: InputMaybe<Scalars['String']['input']>;
  secret_access_key: Scalars['String']['input'];
  use_edp_discount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AzureSubscriptionConfig = {
  __typename?: 'AzureSubscriptionConfig';
  client_id?: Maybe<Scalars['String']['output']>;
  expense_import_scheme?: Maybe<Scalars['String']['output']>;
  subscription_id?: Maybe<Scalars['String']['output']>;
  tenant?: Maybe<Scalars['String']['output']>;
};

export type AzureSubscriptionConfigInput = {
  client_id: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  subscription_id: Scalars['String']['input'];
  tenant: Scalars['String']['input'];
};

export type AzureSubscriptionDataSource = DataSourceInterface & {
  __typename?: 'AzureSubscriptionDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<AzureSubscriptionConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type AzureTenantConfig = {
  __typename?: 'AzureTenantConfig';
  client_id?: Maybe<Scalars['String']['output']>;
  tenant?: Maybe<Scalars['String']['output']>;
};

export type AzureTenantConfigInput = {
  client_id: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  tenant: Scalars['String']['input'];
};

export type AzureTenantDataSource = DataSourceInterface & {
  __typename?: 'AzureTenantDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<AzureTenantConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type CreateDataSourceInput = {
  alibabaConfig?: InputMaybe<AlibabaConfigInput>;
  awsLinkedConfig?: InputMaybe<AwsLinkedConfigInput>;
  awsRootConfig?: InputMaybe<AwsRootConfigInput>;
  azureSubscriptionConfig?: InputMaybe<AzureSubscriptionConfigInput>;
  azureTenantConfig?: InputMaybe<AzureTenantConfigInput>;
  databricksConfig?: InputMaybe<DatabricksConfigInput>;
  gcpConfig?: InputMaybe<GcpConfigInput>;
  gcpTenantConfig?: InputMaybe<GcpTenantConfigInput>;
  k8sConfig?: InputMaybe<K8sConfigInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  nebiusConfig?: InputMaybe<NebiusConfigInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DataSourceDetails = {
  __typename?: 'DataSourceDetails';
  cost: Scalars['Float']['output'];
  discovery_infos?: Maybe<Array<Maybe<DataSourceDiscoveryInfos>>>;
  forecast: Scalars['Float']['output'];
  last_month_cost?: Maybe<Scalars['Float']['output']>;
  resources: Scalars['Int']['output'];
};

export type DataSourceDiscoveryInfos = {
  __typename?: 'DataSourceDiscoveryInfos';
  cloud_account_id: Scalars['String']['output'];
  created_at: Scalars['Int']['output'];
  deleted_at: Scalars['Int']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  last_discovery_at: Scalars['Int']['output'];
  last_error?: Maybe<Scalars['String']['output']>;
  last_error_at: Scalars['Int']['output'];
  observe_time: Scalars['Int']['output'];
  resource_type?: Maybe<Scalars['String']['output']>;
};

export type DataSourceInterface = {
  account_id?: Maybe<Scalars['String']['output']>;
  details?: Maybe<DataSourceDetails>;
  id?: Maybe<Scalars['String']['output']>;
  last_getting_metric_attempt_at?: Maybe<Scalars['Int']['output']>;
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at?: Maybe<Scalars['Int']['output']>;
  last_import_at?: Maybe<Scalars['Int']['output']>;
  last_import_attempt_at?: Maybe<Scalars['Int']['output']>;
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DataSourceType>;
};

export type DataSourceRequestParams = {
  details?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum DataSourceType {
  AlibabaCnr = 'alibaba_cnr',
  AwsCnr = 'aws_cnr',
  AzureCnr = 'azure_cnr',
  AzureTenant = 'azure_tenant',
  Databricks = 'databricks',
  Environment = 'environment',
  GcpCnr = 'gcp_cnr',
  GcpTenant = 'gcp_tenant',
  KubernetesCnr = 'kubernetes_cnr',
  Nebius = 'nebius'
}

export type DatabricksConfig = {
  __typename?: 'DatabricksConfig';
  account_id?: Maybe<Scalars['String']['output']>;
  client_id?: Maybe<Scalars['String']['output']>;
};

export type DatabricksConfigInput = {
  account_id: Scalars['String']['input'];
  client_id: Scalars['String']['input'];
  client_secret: Scalars['String']['input'];
};

export type DatabricksDataSource = DataSourceInterface & {
  __typename?: 'DatabricksDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<DatabricksConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['String']['output'];
  jira_connected: Scalars['Boolean']['output'];
  slack_connected: Scalars['Boolean']['output'];
};

export type EmployeeEmail = {
  __typename?: 'EmployeeEmail';
  available_by_role: Scalars['Boolean']['output'];
  email_template: Scalars['String']['output'];
  employee_id: Scalars['ID']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type EnvironmentDataSource = DataSourceInterface & {
  __typename?: 'EnvironmentDataSource';
  account_id: Scalars['String']['output'];
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type GcpBillingDataConfig = {
  __typename?: 'GcpBillingDataConfig';
  dataset_name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['String']['output']>;
  table_name?: Maybe<Scalars['String']['output']>;
};

export type GcpBillingDataConfigInput = {
  dataset_name: Scalars['String']['input'];
  project_id?: InputMaybe<Scalars['String']['input']>;
  table_name: Scalars['String']['input'];
};

export type GcpConfig = {
  __typename?: 'GcpConfig';
  billing_data?: Maybe<GcpBillingDataConfig>;
};

export type GcpConfigInput = {
  billing_data: GcpBillingDataConfigInput;
  credentials: Scalars['JSONObject']['input'];
};

export type GcpDataSource = DataSourceInterface & {
  __typename?: 'GcpDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<GcpConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type GcpTenantBillingDataConfig = {
  __typename?: 'GcpTenantBillingDataConfig';
  dataset_name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['String']['output']>;
  table_name?: Maybe<Scalars['String']['output']>;
};

export type GcpTenantConfig = {
  __typename?: 'GcpTenantConfig';
  billing_data?: Maybe<GcpTenantBillingDataConfig>;
};

export type GcpTenantConfigInput = {
  billing_data: GcpBillingDataConfigInput;
  credentials: Scalars['JSONObject']['input'];
};

export type GcpTenantDataSource = DataSourceInterface & {
  __typename?: 'GcpTenantDataSource';
  account_id?: Maybe<Scalars['String']['output']>;
  config?: Maybe<GcpTenantConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type Invitation = {
  __typename?: 'Invitation';
  id: Scalars['String']['output'];
  invite_assignments?: Maybe<Array<InvitationAssignment>>;
  organization: Scalars['String']['output'];
  owner_email: Scalars['String']['output'];
  owner_name: Scalars['String']['output'];
};

export type InvitationAssignment = {
  __typename?: 'InvitationAssignment';
  id: Scalars['String']['output'];
  purpose: Scalars['String']['output'];
  scope_id: Scalars['String']['output'];
  scope_name: Scalars['String']['output'];
  scope_type: Scalars['String']['output'];
};

export type K8CostModelConfig = {
  __typename?: 'K8CostModelConfig';
  cpu_hourly_cost: Scalars['Float']['output'];
  memory_hourly_cost: Scalars['Float']['output'];
};

export type K8sConfig = {
  __typename?: 'K8sConfig';
  cost_model?: Maybe<K8CostModelConfig>;
  user: Scalars['String']['output'];
};

export type K8sConfigInput = {
  cost_model?: InputMaybe<Scalars['JSONObject']['input']>;
  password: Scalars['String']['input'];
  user: Scalars['String']['input'];
};

export type K8sDataSource = DataSourceInterface & {
  __typename?: 'K8sDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<K8sConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDataSource?: Maybe<DataSourceInterface>;
  createOrganization?: Maybe<Organization>;
  deleteDataSource?: Maybe<Scalars['String']['output']>;
  deleteOrganization?: Maybe<Scalars['String']['output']>;
  updateDataSource?: Maybe<DataSourceInterface>;
  updateEmployeeEmail?: Maybe<EmployeeEmail>;
  updateEmployeeEmails?: Maybe<Array<Maybe<EmployeeEmail>>>;
  updateInvitation?: Maybe<Scalars['String']['output']>;
  updateOptscaleMode?: Maybe<OptscaleMode>;
  updateOrganization?: Maybe<Organization>;
  updateOrganizationPerspectives?: Maybe<Scalars['JSONObject']['output']>;
  updateOrganizationThemeSettings?: Maybe<Scalars['JSONObject']['output']>;
};


export type MutationCreateDataSourceArgs = {
  organizationId: Scalars['ID']['input'];
  params: CreateDataSourceInput;
};


export type MutationCreateOrganizationArgs = {
  organizationName: Scalars['String']['input'];
};


export type MutationDeleteDataSourceArgs = {
  dataSourceId: Scalars['ID']['input'];
};


export type MutationDeleteOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type MutationUpdateDataSourceArgs = {
  dataSourceId: Scalars['ID']['input'];
  params: UpdateDataSourceInput;
};


export type MutationUpdateEmployeeEmailArgs = {
  employeeId: Scalars['ID']['input'];
  params: UpdateEmployeeEmailInput;
};


export type MutationUpdateEmployeeEmailsArgs = {
  employeeId: Scalars['ID']['input'];
  params: UpdateEmployeeEmailsInput;
};


export type MutationUpdateInvitationArgs = {
  action: Scalars['String']['input'];
  invitationId: Scalars['String']['input'];
};


export type MutationUpdateOptscaleModeArgs = {
  organizationId: Scalars['ID']['input'];
  value?: InputMaybe<OptscaleModeParams>;
};


export type MutationUpdateOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
  params: UpdateOrganizationInput;
};


export type MutationUpdateOrganizationPerspectivesArgs = {
  organizationId: Scalars['ID']['input'];
  value: Scalars['JSONObject']['input'];
};


export type MutationUpdateOrganizationThemeSettingsArgs = {
  organizationId: Scalars['ID']['input'];
  value: Scalars['JSONObject']['input'];
};

export type NebiusConfig = {
  __typename?: 'NebiusConfig';
  access_key_id?: Maybe<Scalars['String']['output']>;
  bucket_name?: Maybe<Scalars['String']['output']>;
  bucket_prefix?: Maybe<Scalars['String']['output']>;
  cloud_name?: Maybe<Scalars['String']['output']>;
  key_id?: Maybe<Scalars['String']['output']>;
  service_account_id?: Maybe<Scalars['String']['output']>;
};

export type NebiusConfigInput = {
  access_key_id: Scalars['String']['input'];
  bucket_name: Scalars['String']['input'];
  bucket_prefix?: InputMaybe<Scalars['String']['input']>;
  cloud_name: Scalars['String']['input'];
  key_id: Scalars['String']['input'];
  private_key: Scalars['String']['input'];
  secret_access_key: Scalars['String']['input'];
  service_account_id: Scalars['String']['input'];
};

export type NebiusDataSource = DataSourceInterface & {
  __typename?: 'NebiusDataSource';
  account_id: Scalars['String']['output'];
  config?: Maybe<NebiusConfig>;
  details?: Maybe<DataSourceDetails>;
  id: Scalars['String']['output'];
  last_getting_metric_attempt_at: Scalars['Int']['output'];
  last_getting_metric_attempt_error?: Maybe<Scalars['String']['output']>;
  last_getting_metrics_at: Scalars['Int']['output'];
  last_import_at: Scalars['Int']['output'];
  last_import_attempt_at: Scalars['Int']['output'];
  last_import_attempt_error?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['String']['output']>;
  type: DataSourceType;
};

export type OptscaleMode = {
  __typename?: 'OptscaleMode';
  finops?: Maybe<Scalars['Boolean']['output']>;
  mlops?: Maybe<Scalars['Boolean']['output']>;
};

export type OptscaleModeParams = {
  finops?: InputMaybe<Scalars['Boolean']['input']>;
  mlops?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Organization = {
  __typename?: 'Organization';
  currency: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_demo: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pool_id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentEmployee?: Maybe<Employee>;
  dataSource?: Maybe<DataSourceInterface>;
  dataSources?: Maybe<Array<Maybe<DataSourceInterface>>>;
  employeeEmails?: Maybe<Array<Maybe<EmployeeEmail>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  optscaleMode?: Maybe<OptscaleMode>;
  organizationFeatures?: Maybe<Scalars['JSONObject']['output']>;
  organizationPerspectives?: Maybe<Scalars['JSONObject']['output']>;
  organizationThemeSettings?: Maybe<Scalars['JSONObject']['output']>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
};


export type QueryCurrentEmployeeArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryDataSourceArgs = {
  dataSourceId: Scalars['ID']['input'];
  requestParams?: InputMaybe<DataSourceRequestParams>;
};


export type QueryDataSourcesArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryEmployeeEmailsArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryOptscaleModeArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryOrganizationFeaturesArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryOrganizationPerspectivesArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryOrganizationThemeSettingsArgs = {
  organizationId: Scalars['ID']['input'];
};

export type UpdateDataSourceInput = {
  alibabaConfig?: InputMaybe<AlibabaConfigInput>;
  awsLinkedConfig?: InputMaybe<AwsLinkedConfigInput>;
  awsRootConfig?: InputMaybe<AwsRootConfigInput>;
  azureSubscriptionConfig?: InputMaybe<AzureSubscriptionConfigInput>;
  azureTenantConfig?: InputMaybe<AzureTenantConfigInput>;
  databricksConfig?: InputMaybe<DatabricksConfigInput>;
  gcpConfig?: InputMaybe<GcpConfigInput>;
  gcpTenantConfig?: InputMaybe<GcpTenantConfigInput>;
  k8sConfig?: InputMaybe<K8sConfigInput>;
  lastImportAt?: InputMaybe<Scalars['Int']['input']>;
  lastImportModifiedAt?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nebiusConfig?: InputMaybe<NebiusConfigInput>;
};

export type UpdateEmployeeEmailInput = {
  action: UpdateEmployeeEmailsAction;
  emailId: Scalars['ID']['input'];
};

export enum UpdateEmployeeEmailsAction {
  Disable = 'disable',
  Enable = 'enable'
}

export type UpdateEmployeeEmailsInput = {
  disable?: InputMaybe<Array<Scalars['ID']['input']>>;
  enable?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateOrganizationInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  DataSourceInterface: ( AlibabaDataSource ) | ( AwsDataSource ) | ( AzureSubscriptionDataSource ) | ( AzureTenantDataSource ) | ( DatabricksDataSource ) | ( EnvironmentDataSource ) | ( GcpDataSource ) | ( GcpTenantDataSource ) | ( K8sDataSource ) | ( NebiusDataSource );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AlibabaConfig: ResolverTypeWrapper<AlibabaConfig>;
  AlibabaConfigInput: AlibabaConfigInput;
  AlibabaDataSource: ResolverTypeWrapper<AlibabaDataSource>;
  AwsConfig: ResolverTypeWrapper<AwsConfig>;
  AwsDataSource: ResolverTypeWrapper<AwsDataSource>;
  AwsLinkedConfigInput: AwsLinkedConfigInput;
  AwsRootConfigInput: AwsRootConfigInput;
  AzureSubscriptionConfig: ResolverTypeWrapper<AzureSubscriptionConfig>;
  AzureSubscriptionConfigInput: AzureSubscriptionConfigInput;
  AzureSubscriptionDataSource: ResolverTypeWrapper<AzureSubscriptionDataSource>;
  AzureTenantConfig: ResolverTypeWrapper<AzureTenantConfig>;
  AzureTenantConfigInput: AzureTenantConfigInput;
  AzureTenantDataSource: ResolverTypeWrapper<AzureTenantDataSource>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateDataSourceInput: CreateDataSourceInput;
  DataSourceDetails: ResolverTypeWrapper<DataSourceDetails>;
  DataSourceDiscoveryInfos: ResolverTypeWrapper<DataSourceDiscoveryInfos>;
  DataSourceInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['DataSourceInterface']>;
  DataSourceRequestParams: DataSourceRequestParams;
  DataSourceType: DataSourceType;
  DatabricksConfig: ResolverTypeWrapper<DatabricksConfig>;
  DatabricksConfigInput: DatabricksConfigInput;
  DatabricksDataSource: ResolverTypeWrapper<DatabricksDataSource>;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeEmail: ResolverTypeWrapper<EmployeeEmail>;
  EnvironmentDataSource: ResolverTypeWrapper<EnvironmentDataSource>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GcpBillingDataConfig: ResolverTypeWrapper<GcpBillingDataConfig>;
  GcpBillingDataConfigInput: GcpBillingDataConfigInput;
  GcpConfig: ResolverTypeWrapper<GcpConfig>;
  GcpConfigInput: GcpConfigInput;
  GcpDataSource: ResolverTypeWrapper<GcpDataSource>;
  GcpTenantBillingDataConfig: ResolverTypeWrapper<GcpTenantBillingDataConfig>;
  GcpTenantConfig: ResolverTypeWrapper<GcpTenantConfig>;
  GcpTenantConfigInput: GcpTenantConfigInput;
  GcpTenantDataSource: ResolverTypeWrapper<GcpTenantDataSource>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invitation: ResolverTypeWrapper<Invitation>;
  InvitationAssignment: ResolverTypeWrapper<InvitationAssignment>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  K8CostModelConfig: ResolverTypeWrapper<K8CostModelConfig>;
  K8sConfig: ResolverTypeWrapper<K8sConfig>;
  K8sConfigInput: K8sConfigInput;
  K8sDataSource: ResolverTypeWrapper<K8sDataSource>;
  Mutation: ResolverTypeWrapper<{}>;
  NebiusConfig: ResolverTypeWrapper<NebiusConfig>;
  NebiusConfigInput: NebiusConfigInput;
  NebiusDataSource: ResolverTypeWrapper<NebiusDataSource>;
  OptscaleMode: ResolverTypeWrapper<OptscaleMode>;
  OptscaleModeParams: OptscaleModeParams;
  Organization: ResolverTypeWrapper<Organization>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateDataSourceInput: UpdateDataSourceInput;
  UpdateEmployeeEmailInput: UpdateEmployeeEmailInput;
  UpdateEmployeeEmailsAction: UpdateEmployeeEmailsAction;
  UpdateEmployeeEmailsInput: UpdateEmployeeEmailsInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AlibabaConfig: AlibabaConfig;
  AlibabaConfigInput: AlibabaConfigInput;
  AlibabaDataSource: AlibabaDataSource;
  AwsConfig: AwsConfig;
  AwsDataSource: AwsDataSource;
  AwsLinkedConfigInput: AwsLinkedConfigInput;
  AwsRootConfigInput: AwsRootConfigInput;
  AzureSubscriptionConfig: AzureSubscriptionConfig;
  AzureSubscriptionConfigInput: AzureSubscriptionConfigInput;
  AzureSubscriptionDataSource: AzureSubscriptionDataSource;
  AzureTenantConfig: AzureTenantConfig;
  AzureTenantConfigInput: AzureTenantConfigInput;
  AzureTenantDataSource: AzureTenantDataSource;
  Boolean: Scalars['Boolean']['output'];
  CreateDataSourceInput: CreateDataSourceInput;
  DataSourceDetails: DataSourceDetails;
  DataSourceDiscoveryInfos: DataSourceDiscoveryInfos;
  DataSourceInterface: ResolversInterfaceTypes<ResolversParentTypes>['DataSourceInterface'];
  DataSourceRequestParams: DataSourceRequestParams;
  DatabricksConfig: DatabricksConfig;
  DatabricksConfigInput: DatabricksConfigInput;
  DatabricksDataSource: DatabricksDataSource;
  Employee: Employee;
  EmployeeEmail: EmployeeEmail;
  EnvironmentDataSource: EnvironmentDataSource;
  Float: Scalars['Float']['output'];
  GcpBillingDataConfig: GcpBillingDataConfig;
  GcpBillingDataConfigInput: GcpBillingDataConfigInput;
  GcpConfig: GcpConfig;
  GcpConfigInput: GcpConfigInput;
  GcpDataSource: GcpDataSource;
  GcpTenantBillingDataConfig: GcpTenantBillingDataConfig;
  GcpTenantConfig: GcpTenantConfig;
  GcpTenantConfigInput: GcpTenantConfigInput;
  GcpTenantDataSource: GcpTenantDataSource;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invitation: Invitation;
  InvitationAssignment: InvitationAssignment;
  JSONObject: Scalars['JSONObject']['output'];
  K8CostModelConfig: K8CostModelConfig;
  K8sConfig: K8sConfig;
  K8sConfigInput: K8sConfigInput;
  K8sDataSource: K8sDataSource;
  Mutation: {};
  NebiusConfig: NebiusConfig;
  NebiusConfigInput: NebiusConfigInput;
  NebiusDataSource: NebiusDataSource;
  OptscaleMode: OptscaleMode;
  OptscaleModeParams: OptscaleModeParams;
  Organization: Organization;
  Query: {};
  String: Scalars['String']['output'];
  UpdateDataSourceInput: UpdateDataSourceInput;
  UpdateEmployeeEmailInput: UpdateEmployeeEmailInput;
  UpdateEmployeeEmailsInput: UpdateEmployeeEmailsInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
};

export type AlibabaConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['AlibabaConfig'] = ResolversParentTypes['AlibabaConfig']> = {
  access_key_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlibabaDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AlibabaDataSource'] = ResolversParentTypes['AlibabaDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['AlibabaConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AwsConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['AwsConfig'] = ResolversParentTypes['AwsConfig']> = {
  access_key_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  config_scheme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cur_version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  linked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  region_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  report_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  use_edp_discount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AwsDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AwsDataSource'] = ResolversParentTypes['AwsDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['AwsConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AzureSubscriptionConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['AzureSubscriptionConfig'] = ResolversParentTypes['AzureSubscriptionConfig']> = {
  client_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expense_import_scheme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscription_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tenant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AzureSubscriptionDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AzureSubscriptionDataSource'] = ResolversParentTypes['AzureSubscriptionDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['AzureSubscriptionConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AzureTenantConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['AzureTenantConfig'] = ResolversParentTypes['AzureTenantConfig']> = {
  client_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tenant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AzureTenantDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['AzureTenantDataSource'] = ResolversParentTypes['AzureTenantDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['AzureTenantConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSourceDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSourceDetails'] = ResolversParentTypes['DataSourceDetails']> = {
  cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  discovery_infos?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSourceDiscoveryInfos']>>>, ParentType, ContextType>;
  forecast?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  last_month_cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  resources?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSourceDiscoveryInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSourceDiscoveryInfos'] = ResolversParentTypes['DataSourceDiscoveryInfos']> = {
  cloud_account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deleted_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_discovery_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_error_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  observe_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resource_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSourceInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSourceInterface'] = ResolversParentTypes['DataSourceInterface']> = {
  __resolveType: TypeResolveFn<'AlibabaDataSource' | 'AwsDataSource' | 'AzureSubscriptionDataSource' | 'AzureTenantDataSource' | 'DatabricksDataSource' | 'EnvironmentDataSource' | 'GcpDataSource' | 'GcpTenantDataSource' | 'K8sDataSource' | 'NebiusDataSource', ParentType, ContextType>;
  account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_import_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_import_attempt_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['DataSourceType']>, ParentType, ContextType>;
};

export type DatabricksConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatabricksConfig'] = ResolversParentTypes['DatabricksConfig']> = {
  account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  client_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatabricksDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatabricksDataSource'] = ResolversParentTypes['DatabricksDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['DatabricksConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jira_connected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  slack_connected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeeEmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeEmail'] = ResolversParentTypes['EmployeeEmail']> = {
  available_by_role?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email_template?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employee_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnvironmentDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnvironmentDataSource'] = ResolversParentTypes['EnvironmentDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpBillingDataConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpBillingDataConfig'] = ResolversParentTypes['GcpBillingDataConfig']> = {
  dataset_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  table_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpConfig'] = ResolversParentTypes['GcpConfig']> = {
  billing_data?: Resolver<Maybe<ResolversTypes['GcpBillingDataConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpDataSource'] = ResolversParentTypes['GcpDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['GcpConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpTenantBillingDataConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpTenantBillingDataConfig'] = ResolversParentTypes['GcpTenantBillingDataConfig']> = {
  dataset_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  table_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpTenantConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpTenantConfig'] = ResolversParentTypes['GcpTenantConfig']> = {
  billing_data?: Resolver<Maybe<ResolversTypes['GcpTenantBillingDataConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcpTenantDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcpTenantDataSource'] = ResolversParentTypes['GcpTenantDataSource']> = {
  account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['GcpTenantConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invite_assignments?: Resolver<Maybe<Array<ResolversTypes['InvitationAssignment']>>, ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner_email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationAssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationAssignment'] = ResolversParentTypes['InvitationAssignment']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purpose?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type K8CostModelConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['K8CostModelConfig'] = ResolversParentTypes['K8CostModelConfig']> = {
  cpu_hourly_cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  memory_hourly_cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type K8sConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['K8sConfig'] = ResolversParentTypes['K8sConfig']> = {
  cost_model?: Resolver<Maybe<ResolversTypes['K8CostModelConfig']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type K8sDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['K8sDataSource'] = ResolversParentTypes['K8sDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['K8sConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDataSource?: Resolver<Maybe<ResolversTypes['DataSourceInterface']>, ParentType, ContextType, RequireFields<MutationCreateDataSourceArgs, 'organizationId' | 'params'>>;
  createOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'organizationName'>>;
  deleteDataSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteDataSourceArgs, 'dataSourceId'>>;
  deleteOrganization?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteOrganizationArgs, 'organizationId'>>;
  updateDataSource?: Resolver<Maybe<ResolversTypes['DataSourceInterface']>, ParentType, ContextType, RequireFields<MutationUpdateDataSourceArgs, 'dataSourceId' | 'params'>>;
  updateEmployeeEmail?: Resolver<Maybe<ResolversTypes['EmployeeEmail']>, ParentType, ContextType, RequireFields<MutationUpdateEmployeeEmailArgs, 'employeeId' | 'params'>>;
  updateEmployeeEmails?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmployeeEmail']>>>, ParentType, ContextType, RequireFields<MutationUpdateEmployeeEmailsArgs, 'employeeId' | 'params'>>;
  updateInvitation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateInvitationArgs, 'action' | 'invitationId'>>;
  updateOptscaleMode?: Resolver<Maybe<ResolversTypes['OptscaleMode']>, ParentType, ContextType, RequireFields<MutationUpdateOptscaleModeArgs, 'organizationId'>>;
  updateOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationArgs, 'organizationId' | 'params'>>;
  updateOrganizationPerspectives?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationPerspectivesArgs, 'organizationId' | 'value'>>;
  updateOrganizationThemeSettings?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationThemeSettingsArgs, 'organizationId' | 'value'>>;
};

export type NebiusConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['NebiusConfig'] = ResolversParentTypes['NebiusConfig']> = {
  access_key_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cloud_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service_account_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NebiusDataSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['NebiusDataSource'] = ResolversParentTypes['NebiusDataSource']> = {
  account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['NebiusConfig']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['DataSourceDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_getting_metric_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_getting_metric_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_getting_metrics_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_import_attempt_error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DataSourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptscaleModeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OptscaleMode'] = ResolversParentTypes['OptscaleMode']> = {
  finops?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  mlops?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_demo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pool_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryCurrentEmployeeArgs, 'organizationId'>>;
  dataSource?: Resolver<Maybe<ResolversTypes['DataSourceInterface']>, ParentType, ContextType, RequireFields<QueryDataSourceArgs, 'dataSourceId'>>;
  dataSources?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSourceInterface']>>>, ParentType, ContextType, RequireFields<QueryDataSourcesArgs, 'organizationId'>>;
  employeeEmails?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmployeeEmail']>>>, ParentType, ContextType, RequireFields<QueryEmployeeEmailsArgs, 'employeeId'>>;
  invitations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Invitation']>>>, ParentType, ContextType>;
  optscaleMode?: Resolver<Maybe<ResolversTypes['OptscaleMode']>, ParentType, ContextType, RequireFields<QueryOptscaleModeArgs, 'organizationId'>>;
  organizationFeatures?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<QueryOrganizationFeaturesArgs, 'organizationId'>>;
  organizationPerspectives?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<QueryOrganizationPerspectivesArgs, 'organizationId'>>;
  organizationThemeSettings?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<QueryOrganizationThemeSettingsArgs, 'organizationId'>>;
  organizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AlibabaConfig?: AlibabaConfigResolvers<ContextType>;
  AlibabaDataSource?: AlibabaDataSourceResolvers<ContextType>;
  AwsConfig?: AwsConfigResolvers<ContextType>;
  AwsDataSource?: AwsDataSourceResolvers<ContextType>;
  AzureSubscriptionConfig?: AzureSubscriptionConfigResolvers<ContextType>;
  AzureSubscriptionDataSource?: AzureSubscriptionDataSourceResolvers<ContextType>;
  AzureTenantConfig?: AzureTenantConfigResolvers<ContextType>;
  AzureTenantDataSource?: AzureTenantDataSourceResolvers<ContextType>;
  DataSourceDetails?: DataSourceDetailsResolvers<ContextType>;
  DataSourceDiscoveryInfos?: DataSourceDiscoveryInfosResolvers<ContextType>;
  DataSourceInterface?: DataSourceInterfaceResolvers<ContextType>;
  DatabricksConfig?: DatabricksConfigResolvers<ContextType>;
  DatabricksDataSource?: DatabricksDataSourceResolvers<ContextType>;
  Employee?: EmployeeResolvers<ContextType>;
  EmployeeEmail?: EmployeeEmailResolvers<ContextType>;
  EnvironmentDataSource?: EnvironmentDataSourceResolvers<ContextType>;
  GcpBillingDataConfig?: GcpBillingDataConfigResolvers<ContextType>;
  GcpConfig?: GcpConfigResolvers<ContextType>;
  GcpDataSource?: GcpDataSourceResolvers<ContextType>;
  GcpTenantBillingDataConfig?: GcpTenantBillingDataConfigResolvers<ContextType>;
  GcpTenantConfig?: GcpTenantConfigResolvers<ContextType>;
  GcpTenantDataSource?: GcpTenantDataSourceResolvers<ContextType>;
  Invitation?: InvitationResolvers<ContextType>;
  InvitationAssignment?: InvitationAssignmentResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  K8CostModelConfig?: K8CostModelConfigResolvers<ContextType>;
  K8sConfig?: K8sConfigResolvers<ContextType>;
  K8sDataSource?: K8sDataSourceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NebiusConfig?: NebiusConfigResolvers<ContextType>;
  NebiusDataSource?: NebiusDataSourceResolvers<ContextType>;
  OptscaleMode?: OptscaleModeResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

