import { FormProvider } from "react-hook-form";
import { SETTINGS_TYPE_SUCCESS_MESSAGE, COMMON_YEAR_LENGTH } from "utils/constants";
import { lessOrEqual } from "utils/validation";
import BaseSideModal from "../BaseSideModal";
import { THRESHOLD_INPUT_NAMES } from "./components/constants";
import InformationWrapper from "./components/InformationWrapper";
import SaveButton from "./components/SaveButton";
import TextWithInlineInput from "./components/TextWithInlineInput";
import { useCommonSettingsData, useFormWithValuesFromOptions } from "./hooks";

const VALUE_KEYS = Object.freeze({
  [THRESHOLD_INPUT_NAMES.DAYS_THRESHOLD]: "days_threshold"
});

const ReservedInstancesThresholds = ({ recommendationType, onSuccess }) => {
  const { options, isGetDataLoading, isChangeSettingsAllowed, isSaveDataLoading, save } = useCommonSettingsData(
    recommendationType,
    SETTINGS_TYPE_SUCCESS_MESSAGE.THRESHOLDS,
    onSuccess
  );

  const { submitHandler, methods } = useFormWithValuesFromOptions(options, save, VALUE_KEYS);

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler}>
        <TextWithInlineInput
          messageId="thresholds.instancesSubscription"
          isLoading={isGetDataLoading}
          lessOrEqualValidation={lessOrEqual(COMMON_YEAR_LENGTH)}
          name={THRESHOLD_INPUT_NAMES.DAYS_THRESHOLD}
        />
        <SaveButton
          isGetDataLoading={isGetDataLoading}
          isChangeSettingsAllowed={isChangeSettingsAllowed}
          isSaveDataLoading={isSaveDataLoading}
        />
      </form>
    </FormProvider>
  );
};

class InstancesSubscriptionModal extends BaseSideModal {
  headerProps = {
    messageId: "instanceSubscription",
    dataTestIds: {
      title: "lbl_instance_subscription_title",
      closeButton: "btn_close"
    }
  };

  dataTestId = "smodal_instance_subscription";

  get content() {
    return (
      <InformationWrapper>
        <ReservedInstancesThresholds recommendationType={this.payload?.recommendationType} onSuccess={this.closeSideModal} />
      </InformationWrapper>
    );
  }
}

export default InstancesSubscriptionModal;
