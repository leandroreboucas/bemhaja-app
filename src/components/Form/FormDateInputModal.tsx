import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { DateInputModal, TextInputProps } from "@components/DateInputModal";
export function FormDateInputModal<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: Omit<TextInputProps, "setDateField"> & UseControllerProps<FormType>) {
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
          {...textInputProps}
        />
      )}
    />
  );
}
