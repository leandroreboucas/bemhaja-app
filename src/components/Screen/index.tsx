import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface ScreenProps {
  children: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  removeBackgroundColor?: boolean;
}

export function Screen({
  canGoBack = false,
  scrollable = false,
  children,
  removeBackgroundColor = false,
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();
  const navigation = useNavigation();

  const Container = scrollable ? ScroolViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <Container
        backgroundColor={
          removeBackgroundColor ? 'transparent' : colors.mainBackground
        }>
        <Box
          paddingHorizontal="s24"
          paddingBottom="s24"
          style={{paddingTop: top, paddingBottom: bottom}}>
          {canGoBack && (
            <TouchableOpacityBox
              onPress={navigation.goBack}
              marginBottom="s24"
              flexDirection="row">
              <Icon name="arrowLeft" />
              <Text variant="backButton" ml="s8">
                Voltar
              </Text>
            </TouchableOpacityBox>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}
function ScroolViewContainer({children, backgroundColor}: Props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{flex: 1, backgroundColor}}>
      {children}
    </ScrollView>
  );
}

function ViewContainer({children, backgroundColor}: Props) {
  return <View style={{flex: 1, backgroundColor}}>{children}</View>;
}
