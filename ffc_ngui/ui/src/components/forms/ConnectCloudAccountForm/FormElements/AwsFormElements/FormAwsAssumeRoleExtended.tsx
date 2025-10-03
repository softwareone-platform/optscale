import ConnectForm from "components/ConnectForm";
import { GroupAwsExtendedOptions } from "./GroupAwsExtendedOptions";
import AwsRoleCredentials from "./GroupAwsRoleCredentials";

export const FormAwsAssumeRoleExtended = () => (
  <ConnectForm>
    {() => (
      <>
        <AwsRoleCredentials />
        <GroupAwsExtendedOptions />
      </>
    )}
  </ConnectForm>
);
