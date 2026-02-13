import ButtonLoader from "components/ButtonLoader";
import FormButtonsWrapper from "components/FormButtonsWrapper";

const FormButtons = ({ disabled = false, isLoading = false }) => (
  <FormButtonsWrapper mt={3} mb={2}>
    <ButtonLoader
      dataTestId="btn_login"
      uppercase
      variant="contained"
      color="lightBlue"
      isLoading={isLoading}
      disabled={disabled}
      messageId="login"
      type="submit"
      size="large"
      fullWidth
    />
  </FormButtonsWrapper>
);

export default FormButtons;
