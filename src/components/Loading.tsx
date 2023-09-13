import { ActivityIndicator } from "react-native";

import { useAppTheme } from "@hooks";

import { Box } from "./Box";

export function Loading() {
  const { colors } = useAppTheme();
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
    >
      <ActivityIndicator size="small" color={colors.primary_500} />
    </Box>
  );
}
