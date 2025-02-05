import ButtonLoader from "components/ButtonLoader";
import FormButtonsWrapper from "components/FormButtonsWrapper";

const FormButtons = ({ disabled = false, isLoading = false }) => (
  <FormButtonsWrapper mt={3} mb={2}>
    <ButtonLoader
      dataTestId="btn_login"
      variant="contained"
      color="primary"
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
