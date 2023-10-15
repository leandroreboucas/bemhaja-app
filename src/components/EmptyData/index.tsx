import {ActivityIndicator, Image} from 'react-native';

import ImgEmpty from '@assets/empty_data.png';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Button} from '../Button';
import {Text} from '../Text';

interface EmptyDataProps {
  loading: boolean;
  error: unknown;
  refetch: () => void;
  text?: string;
}

export function EmptyData({loading, error, refetch, text}: EmptyDataProps) {
  let component = (
    <>
      <Image
        source={ImgEmpty}
        resizeMode="contain"
        style={{
          height: RFValue(200),
        }}
      />
      <Text variant="title_cad" textAlign="center">
        Ops, não encontramos nenhum registro
      </Text>
      {text && (
        <Text variant="feed_text" textAlign="center">
          {text}
        </Text>
      )}
    </>
  );
  if (loading) {
    component = <ActivityIndicator color="primary" />;
  }
  if (error) {
    component = (
      <>
        <Text variant="title_cad" textAlign="center">
          Não foi possível carregar a página
        </Text>
        <Button
          loading={loading}
          title="Tentar novamente"
          preset="outline"
          onPress={refetch}
        />
      </>
    );
  }
  return (
    <Box
      flex={1}
      gap="s16"
      marginHorizontal="s16"
      paddingHorizontal="s8"
      alignItems="center"
      justifyContent="center">
      {component}
    </Box>
  );
}
