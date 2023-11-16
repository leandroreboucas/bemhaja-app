import {Box, ButtonLinear} from '@components';
import {useAppNavigation} from '@hooks';

export function ActionSheetScreen() {
  const navigation = useAppNavigation();

  function goEventNew() {
    navigation.navigate('EventNew');
  }

  function goPostNew() {
    navigation.navigate('PostNew');
  }

  function goAttitudeNew() {
    navigation.navigate('AttitudeNew');
  }

  return (
    <Box flex={1} style={{backgroundColor: '#A3A3A3'}}>
      <Box flex={1} />
      <Box
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="s24"
        marginBottom="s16">
        <Box
          gap="s24"
          width="100%"
          bg="white"
          borderRadius="br20"
          paddingHorizontal="s34"
          paddingVertical="s16">
          <ButtonLinear
            title="Nova atitude"
            iconLeft="checked"
            onPress={goAttitudeNew}
          />
          <ButtonLinear
            title="Nova postagem"
            iconLeft="post"
            onPress={goPostNew}
          />
          <ButtonLinear
            title="Novo evento"
            iconLeft="events"
            onPress={goEventNew}
          />
        </Box>
      </Box>
    </Box>
  );
}
