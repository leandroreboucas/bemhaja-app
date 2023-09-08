import { Box } from "@components/Box";
import { Screen } from "@components/Screen";
import { Text } from "@components/Text";
import { ImageBackground, Platform, Pressable } from "react-native";
import ImageBg from "@assets/bg-cad.png";
import { Icon } from "@components/Icon";
import { TextInput } from "@components/TextInput";
import { RFValue } from "react-native-responsive-fontsize";
import { PasswordInput } from "@components/PasswordInput";
import { ButtonLinear } from "@components/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "@components/Loading";
import { DateInput } from "@components/DateInput";

import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/Form/FormTextInput";
import { DateInputModal } from "@components/DateInputModal";

interface SignUpFormType {
  name: string;
  email: string;
  date_nasc: Date;
  password: string;
  password_confirm: string;
}

export function SignUpScreen() {
  const navigation = useNavigation();

  const { control, formState, handleSubmit } = useForm<SignUpFormType>({
    defaultValues: {
      name: "",
      email: "",
      date_nasc: undefined,
      password: "",
      password_confirm: "",
    },
    mode: "onChange",
  });

  function submitForm({
    name,
    email,
    date_nasc,
    password,
    password_confirm,
  }: SignUpFormType) {}

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
        <FormTextInput
          control={control}
          name="name"
          rules={{
            required: "Nome é obrigatório",
          }}
          removeLabel
          required
          label="Nome"
          placeholder="Nome Completo"
          boxProps={{ mb: "s28" }}
          keyboardType="default"
        />

        <FormTextInput
          control={control}
          name="email"
          rules={{
            required: "E-mail obrigatório",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "E-mail inválido",
            },
          }}
          removeLabel
          required
          label="E-mail"
          placeholder="E-mail"
          boxProps={{ mb: "s28" }}
          keyboardType="email-address"
        />

        <Controller
          control={control}
          name="date_nasc"
          rules={{
            required: "Data de nascimento é obrigatório",
          }}
          render={({ field, fieldState }) => (
            <DateInputModal
              removeLabel
              value={field.value?.toLocaleDateString("pt-BR")}
              errorMessage={fieldState.error?.message}
              setDateField={field.onChange}
              required
              label="Data de nascimento"
              placeholder="Data de nascimento"
              boxProps={{ mb: "s28" }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Senha é obrigatório",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              removeLabel
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              required
              label="Senha"
              placeholder="Senha"
              boxProps={{ mb: "s28" }}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          rules={{
            required: "Confirmação de senha é obrigatório",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              removeLabel
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              required
              label="Senha"
              placeholder="Confirmar sua senha"
              boxProps={{ mb: "s28" }}
            />
          )}
        />

        <Box alignItems="center" mb="s28">
          <ButtonLinear
            disabled={!formState.isValid}
            onPress={handleSubmit(submitForm)}
            title="Cadastrar"
            buttonWidth={RFValue(190)}
          />
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
