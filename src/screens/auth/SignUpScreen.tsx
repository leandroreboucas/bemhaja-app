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
import { Loading } from "@components/Loading";

export function SignUpScreen() {
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
          <Text variant="banner_cad">
            Seja bem vindo, vamos começar a espalhar boas ações!
          </Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="title_cad" color="gray_700">
            Cadastro
          </Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Icon name="camera" size={140} color="primary_300" />
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="change_image" textDecorationLine="underline">
            Escolha uma foto
          </Text>
        </Box>
        <TextInput
          removeLabel
          required
          label="Nome"
          placeholder="Nome Completo"
          boxProps={{ mb: "s28" }}
          keyboardType="default"
        />
        <TextInput
          removeLabel
          required
          label="E-mail"
          placeholder="E-mail"
          boxProps={{ mb: "s28" }}
          keyboardType="email-address"
        />
        <TextInput
          removeLabel
          required
          label="Data de nascimento"
          placeholder="Data de nascimento"
          boxProps={{ mb: "s28" }}
          keyboardType="default"
        />
        <PasswordInput
          removeLabel
          required
          label="Senha"
          placeholder="Senha"
          boxProps={{ mb: "s28" }}
        />
        <PasswordInput
          removeLabel
          required
          label="Senha"
          placeholder="Confirmar sua senha"
          boxProps={{ mb: "s28" }}
        />
        <Box alignItems="center" mb="s28">
          <ButtonLinear title="Cadastrar" buttonWidth={RFValue(190)} />
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
