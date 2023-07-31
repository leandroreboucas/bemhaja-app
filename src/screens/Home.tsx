import { ScrollView, View } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "./../themes";
import { ButtonLinear } from "@components/ButtonLinear";
import { Button } from "@components/Button";
import { LogoIcon } from "@assets/icons/LogoIcon";
import { HomeIcon } from "@assets/icons/HomeIcon";
import { Icon } from "@components/Icon";

const Box = createBox<ThemeProps>();

const Text = createText<ThemeProps>();

export function Home() {
  return (
    <ScrollView>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="mainBackground"
        marginTop="s40"
      >
        <Text variant="title" color="black">
          Button Linear
        </Text>
        <Box gap="s8">
          <ButtonLinear title="Entrar" />
          <ButtonLinear title="Entrar" loading />
          <ButtonLinear title="Disabled" disabled />
        </Box>
        <Text variant="title" color="black">
          Button
        </Text>
        <Box gap="s8">
          <Button title="Primary" />
          <Button title="Primary Disabled" disabled />
          <Button title="Outline" preset="outline" />
          <Button title="Outline Disabled" preset="outline" disabled />

          <Button title="Primary" loading />
          <Button title="Outline" preset="outline" loading />
        </Box>
        <Text variant="title" color="black">
          Icons
        </Text>
        <Box gap="s8" flexDirection="row">
          <Icon name="home" color="buttonPrimary" />
          <Icon name="events" color="buttonPrimary" />
          <Icon name="friends" color="buttonPrimary" />
          <Icon name="groups" color="buttonPrimary" />
        </Box>
      </Box>
    </ScrollView>
  );
}
