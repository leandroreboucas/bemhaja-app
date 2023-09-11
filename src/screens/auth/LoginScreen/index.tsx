import { LogoIcon } from "@assets/icons/LogoIcon";
import { Box } from "@components/Box";
import { ButtonLinear } from "@components/ButtonLinear";

import { Screen } from "@components/Screen";
import { Text } from "@components/Text";

import { ImageBackground, Platform, Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ImageBg from "@assets/bg.png";
import { Icon } from "@components/Icon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/index";
import { Loading } from "@components/Loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, loginSchema } from "./LoginSchema";
import { FormTextInput } from "@components/Form/FormTextInput";
import { FormPasswordInput } from "@components/Form/FormPasswordInput";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
  const { control, formState, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
    mode: "onChange",
  });

  function navigateToSignUpScreen() {
    navigation.navigate("SignUpScreen");
  }

  function navigateToForgoutPasswordScreen() {
    navigation.navigate("ForgoutPasswordScreen");
  }

  function submitForm(form: LoginType) {
    console.log(form);
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
          paddingBottom="s24"
          alignItems="center"
          justifyContent="center"
        >
          <LogoIcon />
        </Box>

        <FormTextInput
          control={control}
          name="email"
          removeLabel
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{ mb: formState.errors.email?.message ? "s8" : "s24" }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormPasswordInput
          control={control}
          name="senha"
          removeLabel
          required
          label="Senha"
          placeholder="Digite sua senha"
          boxProps={{ mb: formState.errors.senha?.message ? "s8" : "s24" }}
        />

        <Box alignItems="center" mb="s24">
          <Pressable
            hitSlop={RFValue(10)}
            onPress={navigateToForgoutPasswordScreen}
          >
            <Text variant="padrao">Recuperar senha</Text>
          </Pressable>
        </Box>
        <Box alignItems="center" mb={"s72"}>
          <ButtonLinear
            disabled={!formState.isValid}
            onPress={handleSubmit(submitForm)}
            title="Entrar"
            buttonWidth={RFValue(190)}
          />
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
