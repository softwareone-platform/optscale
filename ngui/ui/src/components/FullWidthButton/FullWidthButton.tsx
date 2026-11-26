import Button, { ButtonProps } from "components/Button/Button";

/** The sign-in screens' button: large, full width, filled — light blue like upstream's sign-in forms, unless `color` says otherwise. */
const FullWidthButton = (props: ButtonProps) => (
  <Button variant="contained" color="lightBlue" size="large" fullWidth {...props} />
);

export default FullWidthButton;
