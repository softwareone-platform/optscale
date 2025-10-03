import ConnectForm from "components/ConnectForm";
import { AwsRootCredentials } from "components/DataSourceCredentialFields";
import { GroupAwsExtendedOptions } from "./GroupAwsExtendedOptions";

export const FormAwsAccessKeyExtended = () => (
  <ConnectForm>
    {() => (
      <>
        <AwsRootCredentials />
        <GroupAwsExtendedOptions />
      </>
    )}
  </ConnectForm>
);
