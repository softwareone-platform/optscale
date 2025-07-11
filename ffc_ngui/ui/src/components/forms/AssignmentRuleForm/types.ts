import { ASSIGNMENT_RULE_OPERATORS } from "utils/constants";
import { ObjectValues, TODO } from "utils/types";

export type AssignmentRuleFormProps = {
  cloudAccounts: CloudAccount[];
  resourceTypes: ResourceType[];
  regions: Region[];
  pools: Pool[];
  poolOwners: PoolOwner[];
  defaultValues: FormValues;
  isEdit: boolean;
  isLoadingProps: IsLoadingProps;
  onSubmit: (props: TODO) => void;
  onCancel: () => void;
  onPoolChange: OnPoolChange;
};

export type ConditionsFieldArrayProps = {
  cloudAccounts: CloudAccount[];
  resourceTypes: ResourceType[];
  regions: Region[];
  name?: string;
  isLoading?: boolean;
};

export type FormButtonsProps = {
  onCancel: () => void;
  isEdit: boolean;
  isLoading?: boolean;
};

export type OwnerSelectorProps = {
  poolOwners: PoolOwner[];
  pools: Pool[];
  name?: string;
  poolSelectorName?: string;
  isFormDataLoading?: boolean;
};

export type PoolSelectorProps = {
  pools: Pool[];
  name?: string;
  ownerSelectorName?: string;
  isLoading?: boolean;
  onPoolChange: OnPoolChange;
};

type NameCondition = {
  type: "name_starts_with" | "name_ends_with" | "name_is" | "name_contains";
  meta_info: string;
};

type TagCondition = {
  type: "tag_is" | "tag_exists" | "tag_value_starts_with";
  meta_info_key: string;
  meta_info_value: string;
};

type CloudCondition = {
  type: "cloud_is";
  meta_info_cloudId: string;
};

type ResourceTypeCondition = {
  type: "resource_type_is";
  resource_type_is: string;
};

type RegionIsCondition = {
  type: "region_is";
  region_is: {
    regionName: string | null;
  };
};

type Condition = NameCondition | TagCondition | CloudCondition | ResourceTypeCondition | RegionIsCondition;

export type FormValues = {
  active: boolean;
  name: string;
  operator: ObjectValues<typeof ASSIGNMENT_RULE_OPERATORS>;
  conditions: Condition[];
  poolId: string;
  ownerId: string;
};

export type IsLoadingProps = {
  isActiveCheckboxLoading?: boolean;
  isNameInputLoading?: boolean;
  isConditionsFieldLoading?: boolean;
  isConjunctionTypeLoading?: boolean;
  isPoolSelectorLoading?: boolean;
  isOwnerSelectorLoading?: boolean;
  isSubmitButtonLoading?: boolean;
};

export type Pool = {
  id: string;
  name: string;
  pool_purpose: string;
  default_owner_id: string;
};

export type PoolOwner = {
  id: string;
  name: string;
};

export type CloudAccount = {
  id: string;
  name: string;
  type: string;
};

export type Region = {
  name: string;
  cloud_type: string;
};

export type ResourceType = {
  name: string;
  type: string;
};

export type OnPoolChange = (newPoolId: string, callback: (owners: PoolOwner[]) => void) => void;
