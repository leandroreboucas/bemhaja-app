import { ScrollView } from "react-native";
import { ButtonLinear } from "@components/ButtonLinear";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";
import { TextInput } from "@components/TextInput";
import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { EyeOnIcon } from "@assets/icons/EyeOnIcon";
import { Screen } from "@components/Screen";

export function Home() {
  return (
    <Screen scrollable>
      <Box
        gap="s8"
        alignItems="center"
        justifyContent="center"
        bg="mainBackground"
      >
        <Text variant="title" color="black">
          Input
        </Text>
        <Box gap="s8" width={"100%"}>
          <TextInput label="E-mail" placeholder="Digite seu e-mail" />
          <TextInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            errorMessage="Informe um e-mail"
            required
          />
          <TextInput
            label="Senha"
            placeholder="Digite sua senha"
            required
            rightComponent={<Icon name="eyeOn" color="gray_700" />}
          />
        </Box>
        <Text variant="title" color="black">
          Button Linear
        </Text>
        <Box gap="s8" width={"100%"}>
          <ButtonLinear title="Entrar" />
          <ButtonLinear title="Entrar" loading />
          <ButtonLinear title="Disabled" disabled />
        </Box>
        <Text variant="title" color="black">
          Button
        </Text>
        <Box gap="s8" width={"100%"}>
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
        <Box
          gap="s8"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width={"100%"}
        >
          <Icon name="home" color="buttonPrimary" />
          <Icon name="events" color="buttonPrimary" />
          <Icon name="friends" color="buttonPrimary" />
          <Icon name="groups" color="buttonPrimary" />
        </Box>
      </Box>
    </Screen>
  );
}
