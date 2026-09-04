import ButtonLoader from "components/ButtonLoader";
import { useUpdateInvitationMutation } from "graphql/__generated__/hooks/restapi";

const InvitationActionsContainer = ({ invitationId, onSuccessAccept, onSuccessDecline, buttonSize = "small" }) => {
  const [updateInvitation, { loading: loginLoading }] = useUpdateInvitationMutation();

  const onAccept = () => {
    updateInvitation({ variables: { invitationId, action: "accept" } }).then(() => {
      if (typeof onSuccessAccept === "function") {
        onSuccessAccept();
      }
    });
  };

  const onDecline = () => {
    updateInvitation({ variables: { invitationId, action: "decline" } }).then(() => {
      if (typeof onSuccessAccept === "function") {
        onSuccessDecline();
      }
    });
  };

  const isButtonLoading = loginLoading;

  return (
    <>
      <ButtonLoader
        size={buttonSize}
        messageId="accept"
        color="primary"
        variant="contained"
        onClick={onAccept}
        isLoading={isButtonLoading}
        fullWidth
      />
      <ButtonLoader
        size={buttonSize}
        messageId="decline"
        variant="contained"
        color="secondary"
        onClick={onDecline}
        isLoading={isButtonLoading}
        fullWidth
      />
    </>
  );
};

export default InvitationActionsContainer;
