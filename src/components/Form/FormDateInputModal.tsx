import { Controller, UseControllerProps, FieldValues } from "react-hook-form";

import { DateInputModal, DateInputProps } from "./../DateInputModal";
export function FormDateInputModal<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...dateInputProps
}: Omit<DateInputProps, "setDateField"> & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <DateInputModal
          value={field.value?.toLocaleDateString("pt-BR")}
          errorMessage={fieldState.error?.message}
          setDateField={field.onChange}
          removeLabel
          {...dateInputProps}
        />
      )}
    />
  );
}
