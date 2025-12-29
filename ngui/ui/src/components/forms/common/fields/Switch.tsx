import { ReactNode } from "react";
import { Box, FormControl, FormControlLabel, Switch as MuiSwitch, SxProps, Theme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputLoader from "components/InputLoader";

type ShareSwitchProps = {
  name: string;
  label: ReactNode;
  onChange?: (checked: boolean) => void;
  adornment?: ReactNode;
  sx?: SxProps<Theme>;
  isLoading?: boolean;
  defaultValue?: boolean;
};

const Switch = ({ name, label, onChange, adornment, sx, defaultValue, isLoading }: ShareSwitchProps) => {
  const { control } = useFormContext();

  return isLoading ? (
    <InputLoader fullWidth />
  ) : (
    <FormControl fullWidth sx={sx}>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <MuiSwitch
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  if (typeof onChange === "function") {
                    onChange(e.target.checked);
                  }
                }}
              />
            )}
          />
        }
        label={
          <Box display="flex" alignItems="center">
            {label}
            {adornment}
          </Box>
        }
      />
    </FormControl>
  );
};

export default Switch;
