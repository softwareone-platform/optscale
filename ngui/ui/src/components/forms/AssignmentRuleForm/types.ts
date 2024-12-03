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
  conditions: Condition[];
  poolId: string;
  ownerId: string;
};
