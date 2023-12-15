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
} from '@components';
const FILTER_HEIGHT = RFValue(40);
export function FriendsRequests() {
  const [list, setList] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  function renderItemPendents({item}: ListRenderItemInfo<UsuarioDTO>) {
    return (
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <FriendCard item={item} />
        <Box
          flexDirection="row"
          alignItems="center"
          marginRight="s16"
          gap="s16">
          <Icon name="friendAdd" size={32} color="primary_500" />
          <Icon name="friendDelete" size={32} color="primary_500" />
        </Box>
      </Box>
    );
  }
  function renderItemRequests({item}: ListRenderItemInfo<UsuarioDTO>) {
    return <FriendCard item={item} />;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius canGoBack title="Solicitações" />

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
          Aguardando aprovação
        </Text>
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
        renderItem={renderItemPendents}
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
      <Text paddingLeft="s34" variant="friends_title_screen">
        Solicitações enviadas
      </Text>
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
        renderItem={renderItemRequests}
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
