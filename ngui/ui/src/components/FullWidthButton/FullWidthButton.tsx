import Button, { ButtonProps } from "components/Button/Button";

/** The sign-in screens' button: large, full width, filled — primary unless `color` says otherwise. */
const FullWidthButton = (props: ButtonProps) => (
  <Button variant="contained" color="primary" size="large" fullWidth {...props} />
);

export default FullWidthButton;
