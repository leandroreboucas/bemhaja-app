import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {UsuarioDTO, friendService} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  EmptyData,
  Feed,
  FriendCard,
  Header,
  Icon,
  Screen,
  Text,
  TextInput,
  TouchableOpacityBox,
} from '@components';
import {useAppNavigation} from '@hooks';

const FILTER_HEIGHT = RFValue(40);

export function FriendsScreen() {
  const navigation = useAppNavigation();
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function goFreiendsNew() {
    navigation.navigate('FriendsNew');
  }

  function goFreiendsRequests() {
    navigation.navigate('FriendsRequests');
  }

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await friendService.getAll();

      // setList([]);
      setList(list);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({item}: ListRenderItemInfo<UsuarioDTO>) {
    return <FriendCard item={item} />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />

      {/**
       * Cabeçalho
       */}
      <Box
        height={FILTER_HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginHorizontal="s16"
        gap="s4"
        borderTopStartRadius="br10"
        borderTopEndRadius="br10">
        <Text paddingLeft="s16" variant="friends_title_screen">
          Amigos
        </Text>
        <TouchableOpacityBox paddingRight="s16" onPress={goFreiendsRequests}>
          <Text variant="friends_subtitle_screen">Solicitações(1)</Text>
        </TouchableOpacityBox>
      </Box>

      {/**
       * Search
       */}
      <Box
        flexDirection="row"
        marginHorizontal="s16"
        marginTop="s16"
        alignItems="center"
        justifyContent="flex-start">
        <TouchableOpacityBox
          alignItems="center"
          width={RFValue(48)}
          onPress={goFreiendsNew}>
          <Icon name="addUser" size={RFValue(32)} color="primary_400" />
        </TouchableOpacityBox>
        <TextInput
          boxProps={{flex: 1, marginLeft: 's16'}}
          removeLabel
          placeholder="Pesquisar"
          label=""
        />
      </Box>

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
        keyExtractor={item => item.id!}
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
