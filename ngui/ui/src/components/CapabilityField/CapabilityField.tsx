import { Box } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import CapabilityCard from "components/CapabilityCard";
import { SPACING_2 } from "utils/layouts";

type FieldNames = {
  capability: string;
  capabilityMl: string;
  capabilityFin: string;
};

type CapabilityFieldProps = {
  fieldNames: FieldNames;
  margin?: "none" | "normal" | "dense";
  fullWidth?: boolean;
};

const CapabilityField = ({ fieldNames, margin, fullWidth }: CapabilityFieldProps) => {
  const intl = useIntl();
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl margin={margin} fullWidth={fullWidth}>
      <Controller
        control={control}
        name={fieldNames.capability}
        rules={{
          validate: {
            atLeastOne: (value) => {
              if (value[fieldNames.capabilityMl] || value[fieldNames.capabilityFin]) {
                return true;
              }
              return intl.formatMessage({ id: "applyOptscaleCapabilityError" });
            }
          }
        }}
        render={({ field: { value, onChange } }) => (
          <Box display="flex" gap={SPACING_2} flexWrap="wrap">
            <CapabilityCard
              capability="finops"
              checked={value[fieldNames.capabilityFin]}
              onChange={(checked) => {
                onChange({ ...value, [fieldNames.capabilityFin]: checked });
              }}
              sx={{
                flexGrow: 1,
                flexBasis: "200px"
              }}
            />
            <CapabilityCard
              capability="mlops"
              checked={value[fieldNames.capabilityMl]}
              onChange={(checked) => {
                onChange({ ...value, [fieldNames.capabilityMl]: checked });
              }}
              sx={{
                flexGrow: 1,
                flexBasis: "200px"
              }}
            />
          </Box>
        )}
      />
      {!!errors[fieldNames.capability] && <FormHelperText error>{errors?.[fieldNames.capability]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default CapabilityField;
