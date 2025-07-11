import { FormattedMessage } from "react-intl";
import { TextInput } from "components/forms/common/fields";
import { FIELD_NAMES } from "../constants";

const FIELD_NAME = FIELD_NAMES.UNIT;

const UnitField = ({ isLoading = false }) => (
  <TextInput name={FIELD_NAME} label={<FormattedMessage id="unit" />} isLoading={isLoading} dataTestId="input_unit" />
);

export default UnitField;
