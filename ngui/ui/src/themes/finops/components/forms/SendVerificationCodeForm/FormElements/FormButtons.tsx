import ButtonLoader from "components/ButtonLoader";
import FormButtonsWrapper from "components/FormButtonsWrapper";

const FormButtons = ({ isLoading = false }) => (
  <FormButtonsWrapper mt={3} mb={2}>
    <ButtonLoader
      fullWidth
      variant="contained"
      color="primary"
      isLoading={isLoading}
      messageId="sendVerificationCode"
      type="submit"
      size="large"
    />
  </FormButtonsWrapper>
);

export default FormButtons;
