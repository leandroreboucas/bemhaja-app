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
import { Controller, useForm } from "react-hook-form";

interface UserProp {
  email: string;
  password: string;
}

type ScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export function LoginScreen({ navigation }: ScreenProps) {
  const { control, formState, handleSubmit } = useForm<UserProp>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function navigateToSignUpScreen() {
    navigation.navigate("SignUpScreen");
  }

  function navigateToForgoutPasswordScreen() {
    navigation.navigate("ForgoutPasswordScreen");
  }

  function submitForm({ email, password }: UserProp) {}

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

        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail obrigatório",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "E-mail inválido",
            },
          }}
          render={({ field, fieldState }) => (
            <TextInput
              removeLabel
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              required
              label="E-mail"
              placeholder="Digite seu e-mail"
              boxProps={{ mb: fieldState.error?.message ? "s8" : "s24" }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Senha Obrigatória",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              removeLabel
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              required
              label="Senha"
              placeholder="Digite sua senha"
              boxProps={{ mb: fieldState.error?.message ? "s8" : "s24" }}
            />
          )}
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
