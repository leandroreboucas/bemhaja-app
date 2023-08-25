import { Box } from "@components/Box";
import { Screen } from "@components/Screen";
import { Text } from "@components/Text";
import { ImageBackground, Pressable } from "react-native";
import ImageBg from "@assets/bg-cad.png";
import { Icon } from "@components/Icon";
import { TextInput } from "@components/TextInput";
import { RFValue } from "react-native-responsive-fontsize";
import { PasswordInput } from "@components/PasswordInput";
import { ButtonLinear } from "@components/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

export function ForgoutPasswordScreen() {
  const navigation = useNavigation();
  if (!ImageBg) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={ImageBg}
      resizeMode="stretch"
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Screen scrollable removeBackgroundColor>
        <Box
          paddingTop="s60"
          paddingBottom="s28"
          alignItems="center"
          justifyContent="center"
        >
          <Text variant="banner_cad">Esqueci minha senha</Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="title_cad" color="gray_700">
            Digite seu e-mail e enviaremos as instruções para a recuperação de
            senha
          </Text>
        </Box>

        <TextInput
          removeLabel
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{ mb: "s28" }}
          keyboardType="email-address"
        />

        <Box alignItems="center" mb="s28">
          <ButtonLinear title="Recuperar senha" buttonWidth={RFValue(190)} />
        </Box>
        <Box alignItems="center" mb="s160">
          <Pressable onPress={navigation.goBack}>
            <Text
              variant="label_back_button"
              color="gray_700"
              textDecorationLine="underline"
            >
              Voltar
            </Text>
          </Pressable>
        </Box>
      </Screen>
    </ImageBackground>
  );
}
