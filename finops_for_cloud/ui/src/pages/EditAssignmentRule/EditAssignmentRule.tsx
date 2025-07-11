import { useParams } from "react-router-dom";
import Protector from "components/Protector";
import EditAssignmentRuleFormContainer from "containers/EditAssignmentRuleFormContainer";

const EditAssignmentRule = () => {
  const { assignmentRuleId } = useParams();

  return (
    <Protector allowedActions={["EDIT_PARTNER"]}>
      <EditAssignmentRuleFormContainer assignmentRuleId={assignmentRuleId} />
    </Protector>
  );
};

export default EditAssignmentRule;
