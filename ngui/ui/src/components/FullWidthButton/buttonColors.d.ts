import "@mui/material/Button";

// The theme palette has a `lightBlue` colour (upstream's sign-in buttons); MUI's types only know the built-in ones.
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lightBlue: true;
  }
}
