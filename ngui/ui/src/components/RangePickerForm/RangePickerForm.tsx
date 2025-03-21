import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import RangePicker from "components/RangePicker";
import { useRangePickerValidationRules } from "hooks/useRangePickerValidationRules";

const START_DATE = "startDate";
const END_DATE = "endDate";

const RangePickerForm = ({
  initialStartDateValue,
  initialEndDateValue,
  onApply,
  definedRanges = [],
  minDate,
  maxDate,
  notSetMessageId,
  fullWidth
}) => {
  const intl = useIntl();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      [START_DATE]: initialStartDateValue,
      [END_DATE]: initialEndDateValue
    }
  });

  const onSubmit = ({ [START_DATE]: startDate, [END_DATE]: endDate }) => {
    onApply(startDate, endDate);
  };

  const { [START_DATE]: startDate, [END_DATE]: endDate } = watch();

  const { startDateValidationRules, endDateValidationRules } = useRangePickerValidationRules({
    startDatePickerName: START_DATE,
    endDatePickerName: END_DATE,
    formValuesGetter: getValues
  });

  useEffect(() => {
    register(START_DATE, {
      validate: startDateValidationRules
    });

    register(END_DATE, {
      validate: endDateValidationRules
    });
  }, [register, intl, startDateValidationRules, endDateValidationRules]);

  const submit = handleSubmit(onSubmit);

  return (
    <form
      onSubmit={submit}
      style={{
        width: fullWidth ? "100%" : undefined
      }}
    >
      <RangePicker
        initialDateRange={{ startDate, endDate }}
        validation={{
          error: !!errors[START_DATE] || !!errors[END_DATE],
          helperText: (errors[START_DATE] && errors[START_DATE].message) || (errors[END_DATE] && errors[END_DATE].message) || ""
        }}
        onChange={(dateRange) => {
          setValue(START_DATE, dateRange.startDate);
          setValue(END_DATE, dateRange.endDate);
          clearErrors();
        }}
        onApply={submit}
        definedRanges={definedRanges}
        minDate={minDate}
        maxDate={maxDate}
        notSetMessageId={notSetMessageId}
        fullWidth={fullWidth}
        hideLabel
      />
    </form>
  );
};

export default RangePickerForm;
