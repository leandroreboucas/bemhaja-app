import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from 'react-hook-form';

import {DateInputModal, DateInputProps} from './../DateInputModal';
export function FormDateInputModal<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...dateInputProps
}: Omit<DateInputProps, 'setDateField'> & UseControllerProps<FormType>) {
  function formatDate(date: PathValue<FormType, Path<FormType>>) {
    if (!dateInputProps.typeMode && !!date) {
      return date?.toLocaleDateString('pt-BR');
    }
    if (dateInputProps.typeMode === 'date' && !!date) {
      return date?.toLocaleDateString('pt-BR');
    }
    if (dateInputProps.typeMode === 'datetime' && !!date) {
      return (
        date?.toLocaleDateString('pt-BR') +
        ' ' +
        date?.toLocaleTimeString('pt-BR')
      );
    }
    return date;
  }
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => (
        <DateInputModal
          value={formatDate(field.value)}
          errorMessage={fieldState.error?.message}
          setDateField={field.onChange}
          removeLabel
          {...dateInputProps}
        />
      )}
    />
  );
}
