import { LogoIcon } from "@assets/icons/LogoIcon";
import { Box } from "@components/Box";
import { ButtonLinear } from "@components/ButtonLinear";
import { PasswordInput } from "@components/PasswordInput";
import { Screen } from "@components/Screen";
import { Text } from "@components/Text";
import { TextInput } from "@components/TextInput";
import { ImageBackground, Platform, Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ImageBg from "@assets/bg.png";
import { Icon } from "@components/Icon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/index";
import { Loading } from "@components/Loading";

interface UserProp {
  email: string;
  senha: string;
}

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
  function navigateToSignUpScreen() {
    navigation.navigate("SignUpScreen");
  }

  function navigateToForgoutPasswordScreen() {
    navigation.navigate("ForgoutPasswordScreen");
  }

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
          paddingTop="s34"
          paddingBottom="s16"
          alignItems="center"
          justifyContent="center"
        >
          <LogoIcon />
        </Box>

        <TextInput
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{ mb: "s16" }}
          keyboardType="email-address"
        />

        <PasswordInput
          required
          label="Senha"
          placeholder="Digite sua senha"
          boxProps={{ mb: "s16" }}
        />
        <Box alignItems="center" mb="s16">
          <Pressable
            hitSlop={RFValue(10)}
            onPress={navigateToForgoutPasswordScreen}
          >
            <Text variant="padrao">Recuperar senha</Text>
          </Pressable>
        </Box>
        <Box alignItems="center" mb="s72">
          <ButtonLinear title="Entrar" buttonWidth={RFValue(190)} />
        </Box>
        <Box alignItems="center" mb="s24">
          <Text variant="title_300" color="white">
            Faça login com
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          mb="s24"
        >
          <Box
            gap="s8"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="facebook" size={42} color="white" />
            <Text variant="login_social">Conta Facebook</Text>
          </Box>
          <Box
            gap="s8"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="google" size={42} color="white" />
            <Text variant="login_social">Conta Google</Text>
          </Box>
          {Platform.OS === "ios" && (
            <Box
              gap="s8"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Icon name="apple" size={42} color="white" />
              <Text variant="login_social">Conta Apple</Text>
            </Box>
          )}
        </Box>
        <Box alignItems="center">
          <Pressable hitSlop={RFValue(10)} onPress={navigateToSignUpScreen}>
            <Text variant="login_social" textDecorationLine="underline">
              Não tem conta? Cadastre-se
            </Text>
          </Pressable>
        </Box>
      </Screen>
    </ImageBackground>
  );
}
