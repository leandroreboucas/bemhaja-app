import {useEffect, useState} from 'react';
import {FlatList, Image, ListRenderItemInfo} from 'react-native';

import {EventoDTO, eventService} from '@domain';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  EmptyData,
  Feed,
  Header,
  Icon,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
import {AppRoutes} from '@routes';

type ScreenProps = NativeStackScreenProps<AppRoutes, 'EventDetail'>;

export function EventDetail({route, navigation}: ScreenProps) {
  const [event, setEvent] = useState<EventoDTO>();
  const [list, setList] = useState<EventoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await eventService.getList();
      const event_data = list.data.find(
        eventElement => eventElement.id === route.params.event_id,
      );
      // setList([]);
      setEvent(event_data!);
      setList([event_data!]);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({item}: ListRenderItemInfo<EventoDTO>) {
    return (
      <Box
        marginHorizontal="s24"
        borderRadius="br10"
        backgroundColor="gray_100"
        alignItems="center"
        marginBottom="s16">
        {/**
         * Imagem
         */}
        <Image
          source={{uri: item?.foto!, cache: 'only-if-cached'}}
          resizeMode="cover"
          style={{
            height: RFValue(300),
            width: '100%',

            borderTopLeftRadius: RFValue(10),
            borderTopRightRadius: RFValue(10),
          }}
        />

        <Box backgroundColor="gray_100" flex={1} paddingHorizontal="s8">
          {/** Descrição */}
          <Text marginTop="s16" variant="friends_title_screen">
            {item?.descricao}
          </Text>

          {/** Observação */}
          <Text marginTop="s16" variant="feed_text" textAlign="justify">
            {item?.observacoes}
          </Text>

          {/** Data hora do inicio do evento */}
          <Box
            flex={1}
            marginTop="s16"
            paddingVertical="s8"
            paddingHorizontal="s16"
            flexDirection="row"
            borderRadius="br10"
            alignItems="center"
            backgroundColor="white">
            <Box width={RFValue(40)}>
              <Text variant="feed_title">Inicio:</Text>
            </Box>
            <Box marginLeft="s16">
              <Icon name="events" color="gray_600" size={18} />
            </Box>
            <Text marginLeft="s16" variant="feed_data_hora">
              {item?.data_hora_inicio}
            </Text>
          </Box>

          {/** Data hora do fim do evento */}
          <Box
            flex={1}
            marginTop="s16"
            paddingVertical="s8"
            paddingHorizontal="s16"
            flexDirection="row"
            borderRadius="br10"
            alignItems="center"
            backgroundColor="white">
            <Box width={RFValue(40)}>
              <Text variant="feed_title">Fim:</Text>
            </Box>
            <Box marginLeft="s16">
              <Icon name="events" color="gray_600" size={18} />
            </Box>
            {item?.data_hora_final ? (
              <Text marginLeft="s16" variant="feed_data_hora">
                {item?.data_hora_inicio}
              </Text>
            ) : (
              <Text marginLeft="s16" variant="feed_data_hora">
                Não definido
              </Text>
            )}
          </Box>

          {/** Endereço do evento */}
          <Box
            flex={1}
            marginTop="s16"
            paddingVertical="s8"
            paddingHorizontal="s16"
            flexDirection="row"
            borderRadius="br10"
            alignItems="center"
            backgroundColor="white">
            <Box width={RFValue(40)}>
              <Icon name="pin" size={20} color="primary_500" />
            </Box>
            <Box marginLeft="s16" flex={1}>
              <Text variant="login_social" color="gray_700">
                {item?.presencial_endereco}
              </Text>
            </Box>
          </Box>

          {/** lista de atitudes */}
          <Box
            flex={1}
            marginTop="s16"
            paddingVertical="s8"
            paddingHorizontal="s16"
            borderRadius="br10"
            backgroundColor="white">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text variant="login_social" color="gray_700">
                Atitudes
              </Text>
              <Text variant="login_social" color="gray_700">
                Envolvidos
              </Text>
            </Box>
            <Box
              marginTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={RFValue(14)}
                  height={RFValue(14)}
                  backgroundColor="primary_500"
                />
                <Text
                  marginLeft="s8"
                  variant="bottom_tabs_focused"
                  color="gray_700">
                  Entrevista com um particioante do evento
                </Text>
              </Box>
              <Text
                marginLeft="s8"
                variant="bottom_tabs_focused"
                color="gray_700">
                1
              </Text>
            </Box>

            <Box
              marginTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={RFValue(14)}
                  height={RFValue(14)}
                  backgroundColor="primary_500"
                />
                <Text
                  marginLeft="s8"
                  variant="bottom_tabs_focused"
                  color="gray_700">
                  Gravar vídeo para redes sociais
                </Text>
              </Box>
              <Text
                marginLeft="s8"
                variant="bottom_tabs_focused"
                color="gray_700">
                1
              </Text>
            </Box>

            <Box
              marginTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={RFValue(14)}
                  height={RFValue(14)}
                  backgroundColor="gray_500"
                />
                <Text
                  marginLeft="s8"
                  variant="bottom_tabs_focused"
                  color="gray_700">
                  Organizar fila para retirar alimento
                </Text>
              </Box>
              <Text
                marginLeft="s8"
                variant="bottom_tabs_focused"
                color="gray_700">
                0
              </Text>
            </Box>
          </Box>

          {/** Criador e participantes */}
          <Box
            flex={1}
            marginTop="s16"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Box gap="s4" alignItems="center">
              <Image
                source={{uri: 'https://github.com/leandroreboucas.png'}}
                style={{width: RFValue(34), height: RFValue(34)}}
                borderRadius={RFValue(34) / 2}
                resizeMode="cover"
              />
              <Text variant="bottom_tabs_focused" color="primary_500">
                Criador
              </Text>
            </Box>
            <Box gap="s4" alignItems="center">
              <Box flexDirection="row">
                <Image
                  source={{
                    uri: 'https://pps.whatsapp.net/v/t61.24694-24/377376856_864015291495693_3424546452086421321_n.jpg?ccb=11-4&oh=01_AdRv7F_VK7_JybaqhuHmU4TzjDbkEiUJer45iu_Hz96iSA&oe=65396E15&_nc_sid=000000&_nc_cat=111',
                  }}
                  style={{width: RFValue(34), height: RFValue(34)}}
                  borderRadius={RFValue(34) / 2}
                  resizeMode="cover"
                />
                <Image
                  source={{
                    uri: 'https://pps.whatsapp.net/v/t61.24694-24/370558001_1467320294068741_4549773517490779992_n.jpg?ccb=11-4&oh=01_AdSRCuIArgAIAn7J55jEHA1aGOD2D9BtPtlX417aac_TsA&oe=6536A51C&_nc_sid=000000&_nc_cat=111',
                  }}
                  style={{width: RFValue(34), height: RFValue(34)}}
                  borderRadius={RFValue(34) / 2}
                  resizeMode="cover"
                />
              </Box>
              <Text variant="bottom_tabs_focused" color="primary_500">
                Participantes 2
              </Text>
            </Box>
          </Box>

          {/**
           * Botão de postagens relacionadas
           */}
          <TouchableOpacityBox
            flex={1}
            marginTop="s16"
            paddingVertical="s8"
            paddingHorizontal="s16"
            borderRadius="br10"
            backgroundColor="white"
            flexDirection="row"
            marginBottom="s16"
            justifyContent="space-between"
            alignItems="center"
            onPress={goEventFeed}>
            <Box gap="s16" flexDirection="row" alignItems="center">
              <Icon name="events" color="primary_500" size={RFValue(16)} />
              <Text variant="feed_title">Ver postagens relacionadas</Text>
            </Box>
            <Box
              backgroundColor="primary_500"
              paddingHorizontal="s8"
              paddingVertical="s4"
              borderRadius="br10"
              alignItems="center"
              justifyContent="center">
              <Icon name="arrowRight" color="white" size={RFValue(12)} />
            </Box>
          </TouchableOpacityBox>

          {/**Botão de participar */}
          <Box
            flex={1}
            marginTop="s16"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="s16">
            <TouchableOpacityBox
              paddingVertical="s8"
              paddingHorizontal="s16"
              borderRadius="br10"
              backgroundColor="white"
              flexDirection="row"
              marginBottom="s16"
              justifyContent="center"
              alignItems="center">
              <Box gap="s16" flexDirection="row" alignItems="center">
                <Icon name="events" color="primary_500" size={RFValue(16)} />
                <Text variant="feed_title">Participar</Text>
              </Box>
            </TouchableOpacityBox>
          </Box>
        </Box>
      </Box>
    );
  }

  function goEventFeed() {
    navigation.navigate('EventFeed', {event_id: route.params.event_id});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Detalhes do evento" />
      <FlatList
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          flex: list.length === 0 ? 1 : undefined,
          borderRadius: RFValue(10),
        }}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyData
            loading={loading}
            error={error}
            refetch={fetchData}
            text=""
          />
        }
        bounces
        decelerationRate="fast"
        ItemSeparatorComponent={() => <Feed.Separator />}

        // ListHeaderComponent={<Header />}
        // stickyHeaderIndices={[0]}
        // stickyHeaderHiddenOnScroll
      />
    </Screen>
  );
}
