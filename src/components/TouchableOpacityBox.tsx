import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import {
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle";

import { ThemeProps } from "@themes";

export type TouchableOpacityBoxProps = BackgroundColorProps<ThemeProps> &
  TouchableOpacityProps &
  SpacingProps<ThemeProps> &
  LayoutProps<ThemeProps> &
  BorderProps<ThemeProps> &
  SpacingShorthandProps<ThemeProps>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  ThemeProps
>(
  [backgroundColor, spacing, layout, border, spacingShorthand],
  TouchableOpacity,
);
