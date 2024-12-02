import FormButtonsWrapper from "components/FormButtonsWrapper";
import SubmitButtonLoader from "components/SubmitButtonLoader";

const FormButtons = ({ isLoading = false }) => (
  <FormButtonsWrapper>
    <SubmitButtonLoader
      messageId="scheduleImport"
      isLoading={isLoading}
      dataTestId="btn_confirm"
      loaderDataTestId="btn_confirm_loader"
    />
  </FormButtonsWrapper>
);

export default FormButtons;
