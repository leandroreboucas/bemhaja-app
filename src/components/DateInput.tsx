import {
  Platform,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, BoxProps } from "./Box";
import { Text } from "./Text";
import { useAppTheme } from "@hooks/useAppTheme";
import { ReactElement, useRef, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export interface TextInputProps extends RNTextInputProps {
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

export function DateInput({
  label,
  errorMessage,
  required = false,
  rightComponent,
  boxProps,
  removeLabel = false,
  setDateField,
  ...rnTextInputProps
}: TextInputProps) {
  const [date, setDate] = useState(maximumDate);
  setDateField(maximumDate);
  const [showPicker, setShowPicker] = useState(false);
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flexDirection: "row",
    borderWidth: RFValue(errorMessage ? 2 : 1),
    borderColor: errorMessage ? "error" : "gray_500",
    padding: "s8",
    borderRadius: "br10",
    backgroundColor: "gray_100",
  };

  function toggleDatePicker() {
    setShowPicker(!showPicker);
  }

  function onChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    const currentDate = selectedDate;
    console.log("currentDate", currentDate);
    setDate(currentDate!);
    setDateField(currentDate);

    toggleDatePicker();
  }

  // function onChange(
  //   { type }: { type: string },
  //   selectedDate: Date | undefined
  // ) {
  //   if (type === "set") {
  //     const currentDate = selectedDate;
  //     console.log("currentDate", currentDate);
  //     setDate(currentDate!);
  //     setDateField(currentDate);
  //     if (Platform.OS === "android") {
  //       toggleDatePicker();
  //     }
  //     return;
  //   }
  //   toggleDatePicker();
  // }

  return (
    <Box {...boxProps}>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          locale="pt-BR"
          onChange={onChange}
          maximumDate={maximumDate}
          style={{
            height: 120,
            marginTop: -10,
          }}
        />
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker} hitSlop={RFValue(10)}>
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
                fontFamily: "Roboto_400Regular",
                fontSize: RFValue(16),
                flexGrow: 1,
                flexShrink: 1,
                color: "black",
              }}
              editable={false}
              {...rnTextInputProps}
              // value={date.toLocaleDateString("pt-BR")}
            />
            {rightComponent && (
              <Box justifyContent="center" ml="s16">
                {rightComponent}
              </Box>
            )}
          </Box>

          {errorMessage && <Text variant="error">{errorMessage}</Text>}
        </Pressable>
      )}
    </Box>
  );
}
