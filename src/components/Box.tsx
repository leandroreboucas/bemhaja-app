import { createBox } from "@shopify/restyle";
import { ThemeProps } from "@themes";
import { ComponentProps } from "react";

export const Box = createBox<ThemeProps>();
export type BoxProps = ComponentProps<typeof Box>;
