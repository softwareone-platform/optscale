import { useMutation } from "@apollo/client";
import DeleteResourcePerspective from "components/DeleteResourcePerspective";
import { GET_ORGANIZATION_PERSPECTIVES, UPDATE_ORGANIZATION_PERSPECTIVES } from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationPerspectives } from "hooks/coreData";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { removeKey } from "utils/objects";

const DeleteResourcePerspectiveContainer = ({ perspectiveName, onCancel, onSuccess }) => {
  const { organizationId } = useOrganizationInfo();

  const { allPerspectives } = useOrganizationPerspectives();

  const [updateOrganizationPerspectives, { loading }] = useMutation(UPDATE_ORGANIZATION_PERSPECTIVES, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GET_ORGANIZATION_PERSPECTIVES,
        variables: { organizationId },
        data: {
          organizationPerspectives: data.updateOrganizationPerspectives
        }
      });
    }
  });

  const onDelete = () => {
    const newPerspectives = removeKey(allPerspectives, perspectiveName);

    return updateOrganizationPerspectives({
      variables: {
        organizationId,
        value: newPerspectives
      }
    }).then(onSuccess);
  };

  return (
    <DeleteResourcePerspective perspectiveName={perspectiveName} onDelete={onDelete} onCancel={onCancel} isLoading={loading} />
  );
};

export default DeleteResourcePerspectiveContainer;
