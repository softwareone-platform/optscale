export const PoliciesDefaultResponse = {
  organization_constraints: [
    {
      deleted_at: 0,
      id: '767e8724-fb96-4404-a8a6-f485b403cbed',
      created_at: 1767863705,
      name: 'Recurring budget under',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'recurring_budget',
      definition: {
        monthly_budget: 1000000,
      },
      filters: {},
      last_run: 1767864001,
      last_run_result: {
        limit: 1000000,
        current: 48646.24921611486,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: '96e9f47b-4cac-40d9-a9fb-37cc7c50e43a',
      created_at: 1767863508,
      name: 'Resource over limit',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'resource_quota',
      definition: {
        max_value: 1,
      },
      filters: {},
      last_run: 1767863703,
      last_run_result: {
        limit: 1,
        current: 3006,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '51a2285c-dd95-47b1-a5e6-e7a4f71459f8',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: '96e9f47b-4cac-40d9-a9fb-37cc7c50e43a',
          constraint_limit: 1.0,
          value: 3006.0,
          created_at: 1767863703,
          run_result: {
            limit: 1,
            current: 3006,
          },
        },
      ],
    },
    {
      deleted_at: 0,
      id: '9aecf307-1ceb-4416-957b-817ae115d9d0',
      created_at: 1767863667,
      name: 'Recurring budget over',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'recurring_budget',
      definition: {
        monthly_budget: 10,
      },
      filters: {},
      last_run: 1767863703,
      last_run_result: {
        limit: 10,
        current: 48646.24921611486,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: '2c7da759-700f-4ff1-b16a-d5ab6ca787db',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: '9aecf307-1ceb-4416-957b-817ae115d9d0',
          constraint_limit: 10.0,
          value: 48646.2,
          created_at: 1767863702,
          run_result: {
            limit: 10,
            current: 48646.24921611486,
          },
        },
      ],
    },
    {
      deleted_at: 0,
      id: 'aaa8654e-0c83-48e9-93f5-d5831f6fa0e7',
      created_at: 1767863618,
      name: 'Resource under limit',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'resource_quota',
      definition: {
        max_value: 10000,
      },
      filters: {},
      last_run: 1767863703,
      last_run_result: {
        limit: 10000,
        current: 3006,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: 'b02c5879-9ca0-4942-9b2f-0f97502b5bcd',
      created_at: 1767863802,
      name: 'Expiring budget under',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'expiring_budget',
      definition: {
        total_budget: 1000000,
        start_date: 1767259800,
      },
      filters: {},
      last_run: 1767864001,
      last_run_result: {
        limit: 1000000,
        current: 48646.24921611486,
      },
      limit_hits: [],
    },
    {
      deleted_at: 0,
      id: 'e0f96d76-bdb2-4c7e-906b-fb6966dd4c23',
      created_at: 1767863751,
      name: 'Expiring budget over',
      organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
      type: 'expiring_budget',
      definition: {
        total_budget: 1,
        start_date: 1767259800,
      },
      filters: {},
      last_run: 1767864001,
      last_run_result: {
        limit: 1,
        current: 48646.24921611486,
      },
      limit_hits: [
        {
          deleted_at: 0,
          id: 'e44711c6-2ab5-45f0-9248-7c27cea7734b',
          organization_id: '4eae08f8-9b40-4094-a11c-f9ee2dc76a12',
          constraint_id: 'e0f96d76-bdb2-4c7e-906b-fb6966dd4c23',
          constraint_limit: 1.0,
          value: 48646.2,
          created_at: 1767864001,
          run_result: {
            limit: 1,
            current: 48646.24921611486,
          },
        },
      ],
    },
  ],
};

export const ExpiringBudgetOverLimitResponse = {
  data: {
    organizationConstraint: {
      id: 'e0f96d76-bdb2-4c7e-906b-fb6966dd4c23',
      name: 'Expiring budget over',
      type: 'expiring_budget',
      definition: {
        total_budget: 1,
        start_date: 1767259800,
      },
      filters: {},
      last_run_result: {
        limit: 1,
        current: 48646.24921611486,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};

export const ExpiringBudgetOverLimitHitsResponse = {
  data: {
    organizationLimitHits: [
      {
        run_result: {
          limit: 1,
          current: 48646.24921611486,
        },
        created_at: 1767864001,
        value: 48646.2,
        constraint_limit: 1,
        __typename: 'OrganizationLimitHit',
      },
    ],
  },
};

export const ExpiringBudgetUnderLimitResponse = {
  data: {
    organizationConstraint: {
      id: 'b02c5879-9ca0-4942-9b2f-0f97502b5bcd',
      name: 'Expiring budget under',
      type: 'expiring_budget',
      definition: {
        total_budget: 1000000,
        start_date: 1767259800,
      },
      filters: {},
      last_run_result: {
        limit: 1000000,
        current: 48646.24921611486,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};

export const EmptyLimitHitsResponse = { data: { organizationLimitHits: [] } };

export const RecurringBudgetOverLimitResponse = {
  data: {
    organizationConstraint: {
      id: '9aecf307-1ceb-4416-957b-817ae115d9d0',
      name: 'Recurring budget over',
      type: 'recurring_budget',
      definition: {
        monthly_budget: 10,
      },
      filters: {},
      last_run_result: {
        limit: 10,
        current: 48646.24921611486,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};

export const RecurringBudgetOverLimitHitsResponse = {
  data: {
    organizationLimitHits: [
      {
        run_result: {
          limit: 10,
          current: 48646.24921611486,
        },
        created_at: 1767863702,
        value: 48646.2,
        constraint_limit: 10,
        __typename: 'OrganizationLimitHit',
      },
    ],
  },
};

export const RecurringBudgetUnderLimitResponse = {
  data: {
    organizationConstraint: {
      id: '767e8724-fb96-4404-a8a6-f485b403cbed',
      name: 'Recurring budget under',
      type: 'recurring_budget',
      definition: {
        monthly_budget: 1000000,
      },
      filters: {},
      last_run_result: {
        limit: 1000000,
        current: 48646.24921611486,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};

export const ResourceOverLimitResponse = {
  data: {
    organizationConstraint: {
      id: '96e9f47b-4cac-40d9-a9fb-37cc7c50e43a',
      name: 'Resource over limit',
      type: 'resource_quota',
      definition: {
        max_value: 1,
      },
      filters: {},
      last_run_result: {
        limit: 1,
        current: 3012,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};

export const ResourceOverLimitHitsResponse = {
  data: {
    organizationLimitHits: [
      {
        run_result: {
          limit: 1,
          current: 3012,
        },
        created_at: 1767863703,
        value: 3012,
        constraint_limit: 1,
        __typename: 'OrganizationLimitHit',
      },
    ],
  },
};

export const ResourceUnderLimitResponse = {
  data: {
    organizationConstraint: {
      id: 'aaa8654e-0c83-48e9-93f5-d5831f6fa0e7',
      name: 'Resource under limit',
      type: 'resource_quota',
      definition: {
        max_value: 10000,
      },
      filters: {},
      last_run_result: {
        limit: 10000,
        current: 3012,
      },
      __typename: 'OrganizationConstraint',
    },
  },
};
