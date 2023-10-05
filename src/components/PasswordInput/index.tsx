import {useState} from 'react';

import {Icon} from '../Icon';
import {TextInput, TextInputProps} from '../TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'rightComponent'>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureText, setIsSecureText] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureText(prev => !prev);
  }

  return (
    <TextInput
      {...props}
      rightComponent={
        <Icon
          onPress={toggleSecureTextEntry}
          name={isSecureText ? 'eyeOn' : 'eyeOff'}
          color="gray_700"
          size={16}
        />
      }
      secureTextEntry={isSecureText}
    />
  );
}
