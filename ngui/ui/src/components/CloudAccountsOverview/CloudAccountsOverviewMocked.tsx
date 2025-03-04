import CloudAccountsOverview from "./CloudAccountsOverview";

const CloudAccountsOverviewMocked = () => (
  <CloudAccountsOverview
    isLoading={false}
    organizationLimit={180000}
    cloudAccounts={[
      {
        config: {},
        details: {
          resources: 16,
          last_month_cost: 18560.75036486765,
          forecast: 20110.78,
          cost: 12785.47
        },
        name: "Azure trial",
        id: "11fddd0e-3ece-410c-8e68-003abcc44576",
        type: "azure_cnr"
      },
      {
        config: {},
        details: {
          resources: 610,
          last_month_cost: 40120.98,
          forecast: 35270.79,
          cost: 28385.59
        },
        name: "AWS HQ",
        id: "8c63e980-6572-4b36-be82-a2bc59705888",
        type: "aws_cnr"
      },
      {
        config: {},
        details: {
          resources: 5,
          last_month_cost: 11750,
          forecast: 10750.8,
          cost: 6102.09
        },
        name: "AWS Marketing",
        id: "8cqw980-6572-4b36-be82-a2bc59705888",
        type: "aws_cnr"
      },
      {
        config: {},
        details: {
          resources: 5,
          last_month_cost: 6500.5523346274,
          forecast: 7850.19,
          cost: 4334.18
        },
        name: "Azure enterprise agreement",
        id: "8c6ds80-6572-4b36-be82-a2bc59705888",
        type: "azure_cnr"
      },
      {
        config: {},
        details: {
          resources: 12,
          last_month_cost: 5900.5523346274,
          forecast: 5226.19,
          cost: 2512.18
        },
        name: "AWS dev",
        id: "528e7e01-cf63-4041-980a-fd92a50da65d",
        type: "aws_cnr"
      }
    ]}
  />
);

export default CloudAccountsOverviewMocked;
