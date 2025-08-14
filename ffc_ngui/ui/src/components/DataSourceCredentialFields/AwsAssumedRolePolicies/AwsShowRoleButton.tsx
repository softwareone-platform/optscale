import { FormControl } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Button from "components/Button";

const AwsShowRoleButton = ({ onClick, fieldsRequiredForRoleFetch }) => {
  const { watch } = useFormContext();

  const values = watch(fieldsRequiredForRoleFetch);

  const hasEmptyValue = values.some((value: string) => !value);

  return (
    <FormControl>
      <Button messageId="showRole" color="primary" disabled={hasEmptyValue} onClick={onClick} />
    </FormControl>
  );
};

export default AwsShowRoleButton;
