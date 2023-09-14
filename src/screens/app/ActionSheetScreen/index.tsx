import {Box, ButtonLinear} from '@components';

export function ActionSheetScreen() {
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
          <ButtonLinear title="Nova atitude" />
          <ButtonLinear title="Nova postagem" />
          <ButtonLinear title="Novo evento" />
        </Box>
      </Box>
    </Box>
  );
}
