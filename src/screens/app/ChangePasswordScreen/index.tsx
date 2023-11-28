import {Alert} from 'react-native';

import {useUserUpdatePassword} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Screen, Header, FormPasswordInput, Box, Button} from '@components';

import {changePasswordSchema, changePasswordType} from './schema';

export function ChangePasswordScreen() {
  const {control, formState, handleSubmit} = useForm<changePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const {isLoading, updatePassword} = useUserUpdatePassword({
    onSucess: () => {
      Alert.alert('Sucesso', 'Senha alterada com sucesso');
    },
    onError: message => {
      Alert.alert('Atenção', message);
    },
  });

  function submitForm(form: changePasswordType) {
    updatePassword({
      newPassword: form.newPassword,
      oldPassword: form.oldPassword,
    });
  }

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Alterar senha" />
      <Box marginHorizontal="s28" marginTop="s16">
        <FormPasswordInput
          control={control}
          name="oldPassword"
          removeLabel
          required
          label="Senha atual"
          placeholder="Senha atual"
          boxProps={{mb: formState.errors.oldPassword?.message ? 's8' : 's24'}}
        />

        <FormPasswordInput
          control={control}
          name="newPassword"
          removeLabel
          required
          label="Nova senha"
          placeholder="Nova senha"
          boxProps={{mb: formState.errors.newPassword?.message ? 's8' : 's24'}}
        />

        <FormPasswordInput
          control={control}
          name="confirmNewPassword"
          removeLabel
          required
          label="Confirme nova senha"
          placeholder="Confirme nova senha"
          boxProps={{
            mb: formState.errors.confirmNewPassword?.message ? 's8' : 's24',
          }}
        />
        <Button
          loading={isLoading}
          disabled={!formState.isValid}
          onPress={handleSubmit(submitForm)}
          title="Salvar alterações"
          preset="primary"
        />
      </Box>
    </Screen>
  );
}
