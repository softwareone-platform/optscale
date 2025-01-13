import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ClusterTypesTable from "components/ClusterTypesTable";
import { MOCKED_ORGANIZATION_ID } from "stories";

export default {
  component: ClusterTypesTable,
  argTypes: {
    isLoading: { name: "Loading", control: "boolean", defaultValue: false }
  }
};

const mockStore = configureMockStore();

const clusterTypes = [
  { name: "name1", tag_key: "tag1", priority: 1 },
  { name: "name2", tag_key: "tag2", priority: 2 }
];

export const withoutManageResourcePermission = (args) => (
  <ClusterTypesTable clusterTypes={clusterTypes} isLoading={args.isLoading} />
);

export const withManageResourcePermission = (args) => {
  const store = mockStore({
    organizationId: MOCKED_ORGANIZATION_ID
  });

  return (
    <Provider store={store}>
      <ClusterTypesTable clusterTypes={clusterTypes} isLoading={args.isLoading} />
    </Provider>
  );
};
