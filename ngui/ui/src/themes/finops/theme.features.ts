type FeatureFlags = {
  [key: string]: boolean | undefined;
};

export const featureFlags: FeatureFlags = {
  organization_creation_allowed: false,
  organization_edit_allowed: false,
  product_tour: false,
  paid_organization: true,
  kubernetes_data_source: false
};
