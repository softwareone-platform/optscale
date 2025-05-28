import { FormProvider, useForm } from "react-hook-form";
import FormContentDescription from "components/FormContentDescription";
import ResourcesPerspectiveValuesDescription from "components/ResourcesPerspectiveValuesDescription";
import { FormButtons, NameAutocompleteField, PayloadField, PerspectiveOverrideWarning } from "./FormElements";
import { getDefaultValues } from "./utils";

const CreateResourcePerspectiveForm = ({
  onSubmit,
  breakdownBy,
  breakdownData,
  filters,
  perspectiveNames,
  isLoading = false,
  onCancel
}) => {
  const methods = useForm({
    defaultValues: getDefaultValues({
      filters: {
        filterValues: filters.getFilterValuesForAppliedFilters(),
        appliedFilters: filters.getAppliedFilters()
      },
      breakdownBy,
      breakdownData
    })
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <NameAutocompleteField perspectiveNames={perspectiveNames} />
        <FormContentDescription
          alertProps={{
            messageId: "savePerspectiveDescription",
            messageValues: {
              strong: (chunks) => <strong>{chunks}</strong>
            }
          }}
        />
        <ResourcesPerspectiveValuesDescription
          breakdownBy={breakdownBy}
          breakdownData={breakdownData}
          filters={filters.getAppliedValues()}
        />
        <PayloadField />
        <PerspectiveOverrideWarning perspectiveNames={perspectiveNames} />
        <FormButtons onCancel={onCancel} isLoading={isLoading} />
      </form>
    </FormProvider>
  );
};

export default CreateResourcePerspectiveForm;
