import CapabilityFieldComponent from "components/CapabilityField";
import { FIELD_NAMES } from "../constants";

const CapabilityField = () => (
  <CapabilityFieldComponent
    fieldNames={{
      capability: FIELD_NAMES.CAPABILITY,
      capabilityMl: FIELD_NAMES.CAPABILITY_ML,
      capabilityFin: FIELD_NAMES.CAPABILITY_FIN
    }}
    margin="none"
  />
);

export default CapabilityField;
