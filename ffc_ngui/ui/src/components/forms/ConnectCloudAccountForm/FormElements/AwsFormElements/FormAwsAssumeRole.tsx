import ConnectForm from "components/ConnectForm";
import AwsRoleCredentials from "./GroupAwsRoleCredentials";

export const FormAwsAssumeRole = () => <ConnectForm>{() => <AwsRoleCredentials />}</ConnectForm>;
