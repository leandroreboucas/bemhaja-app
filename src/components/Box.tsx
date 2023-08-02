import { createBox } from "@shopify/restyle";
import { ThemeProps } from "@themes/index";
import { ComponentProps } from "react";

export const Box = createBox<ThemeProps>();
export type BoxProps = ComponentProps<typeof Box>;
