import { useState } from "react";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import DeleteEntity from "components/DeleteEntity";
import Input from "components/Input";
import OrganizationLabel from "components/OrganizationLabel";
import { DELETE_ORGANIZATION } from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useSignOut } from "hooks/useSignOut";

const CONFIRMATION_TEXT = "delete";

const DeleteOrganizationContainer = ({ onCancel }) => {
  const { name: organizationName, organizationId } = useOrganizationInfo();

  const [confirmationTextInputValue, setConfirmationTextInputValue] = useState("");

  const signOut = useSignOut();

  const [deleteOrganization, { loading }] = useMutation(DELETE_ORGANIZATION);

  const onDelete = () => {
    deleteOrganization({
      variables: {
        organizationId
      }
    }).then(() => {
      onCancel();
      signOut();
    });
  };

  return (
    <DeleteEntity
      message={{
        messageId: "deleteOrganizationQuestion",
        values: {
          organizationName: <OrganizationLabel name={organizationName} disableLink />
        }
      }}
      deleteButtonProps={{
        disabled: confirmationTextInputValue !== CONFIRMATION_TEXT,
        onDelete
      }}
      onCancel={onCancel}
      isLoading={loading}
    >
      <Typography>
        <FormattedMessage id="youWillBeForcedToSignOut" />
      </Typography>
      <Typography>
        <FormattedMessage
          id="toConfirmTheDeletionOfOrganization"
          values={{ confirmationText: CONFIRMATION_TEXT, i: (chunks) => <i>{chunks}</i> }}
        />
      </Typography>
      <Input value={confirmationTextInputValue} onChange={(e) => setConfirmationTextInputValue(e.target.value)} />
    </DeleteEntity>
  );
};

export default DeleteOrganizationContainer;
