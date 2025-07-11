import Protector from "components/Protector";
import CreateAssignmentRuleFormContainer from "containers/CreateAssignmentRuleFormContainer";

const CreateAssignmentRule = () => (
  <Protector allowedActions={["EDIT_PARTNER"]}>
    <CreateAssignmentRuleFormContainer />
  </Protector>
);

export default CreateAssignmentRule;
