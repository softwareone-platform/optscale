import { forwardRef } from "react";
import TextField from "@mui/material/TextField";

const InputComponent = forwardRef(({ inputRef, ...other }, ref) => <div ref={ref} {...other} />);

const OutlinedDiv = ({ children, label, endAdornment, dataTestId, margin = "none", ...rest }) => (
  <TextField
    variant="outlined"
    sx={{ "& .MuiInputBase-input": { color: "black", fontSize: 14 } }}
    InputLabelProps={{ shrink: true }}
    InputProps={{
      inputComponent: InputComponent,
      endAdornment,
      "data-test-id": dataTestId
    }}
    inputProps={{ children }}
    margin={margin}
    {...rest}
  />
);

export default OutlinedDiv;
