import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, BoxProps } from "./Box";
import { Text } from "./Text";
import { useAppTheme } from "@hooks/useAppTheme";
import { ReactElement, useRef } from "react";

interface TextInputProps extends RNTextInputProps {
  label: string;
  errorMessage?: string;
  required?: boolean;
  rightComponent?: ReactElement;
  boxProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  required = false,
  rightComponent,
  boxProps,
  ...rnTextInputProps
}: TextInputProps) {
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flexDirection: "row",
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? "error" : "gray_500",
    padding: "s16",
    borderRadius: "br10",
    backgroundColor: "gray_100",
  };

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <Box gap="s4" flex={1} {...boxProps}>
      <Pressable onPress={focusInput} style={{ flex: 1 }}>
        <Text variant="title">
          {required && <Text variant="error">* </Text>}
          {label}
        </Text>

        <Box {...$textInputContainer}>
          <RNTextInput
            ref={inputRef}
            placeholderTextColor={colors.gray_700}
            style={{
              padding: 0,
              fontFamily: "Roboto_400Regular",
              fontSize: 16,
              flexGrow: 1,
              flexShrink: 1,
            }}
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
