import React, {ReactElement, useRef, useState} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box';
import {Text} from '../Text';

export interface DateInputProps extends RNTextInputProps {
  label: string;
  errorMessage?: string;
  required?: boolean;
  rightComponent?: ReactElement;
  boxProps?: BoxProps;
  removeLabel?: boolean;
  setDateField: (date: Date | undefined) => void;
}

const maximumDate = new Date();
maximumDate.setFullYear(maximumDate.getFullYear() - 18);

export function DateInputModal({
  label,
  errorMessage,
  required = false,
  rightComponent,
  boxProps,
  removeLabel = false,
  setDateField,
  ...rnTextInputProps
}: DateInputProps) {
  const [date, setDate] = useState(maximumDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flex: 1,
    flexDirection: 'row',
    borderWidth: RFValue(errorMessage ? 2 : 1),
    borderColor: errorMessage ? 'error' : 'gray_500',
    padding: 's8',
    borderRadius: 'br10',
    backgroundColor: 'gray_100',
  };

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(date: Date) {
    setDate(date!);
    setDateField(date);
    hideDatePicker();
  }

  return (
    <Box {...boxProps}>
      {isDatePickerVisible && (
        <DateTimePickerModal
          mode="date"
          locale="pt-BR"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          date={date}
          maximumDate={maximumDate}
          isVisible={isDatePickerVisible}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor="black"
        />
      )}

      <Pressable onPress={showDatePicker} hitSlop={RFValue(16)}>
        {!removeLabel && (
          <Text variant="inputLabel">
            {required && <Text variant="error">* </Text>}
            {label}
          </Text>
        )}

        <Box {...$textInputContainer}>
          <RNTextInput
            ref={inputRef}
            placeholderTextColor={colors.gray_700}
            style={{
              padding: 0,
              fontFamily: 'Roboto_400Regular',
              fontSize: RFValue(16),
              flexGrow: 1,
              flexShrink: 1,
              color: 'black',
            }}
            editable={false}
            pointerEvents="none"
            {...rnTextInputProps}
          />
          {rightComponent && (
            <Box justifyContent="center" ml="s16">
              {rightComponent}
            </Box>
          )}
        </Box>

        {errorMessage && <Text variant="error">{errorMessage}</Text>}
      </Pressable>
    </Box>
  );
}
