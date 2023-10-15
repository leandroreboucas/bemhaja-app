import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {GrupoAtitudeDTO, groupService} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  EmptyData,
  Feed,
  Header,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
const FILTER_HEIGHT = RFValue(40);
export function GroupsScreen() {
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await groupService.getList();

      // setList([]);
      setList(list.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({item}: ListRenderItemInfo<GrupoAtitudeDTO>) {
    return (
      <Box
        flexDirection="row"
        marginHorizontal="s16"
        marginVertical="s16"
        alignItems="center"
        justifyContent="space-between">
        <Box
          backgroundColor="primary_400"
          style={{
            paddingHorizontal: RFValue(6),
            paddingVertical: RFValue(2),
          }}
          alignItems="center"
          justifyContent="center"
          borderRadius="br4">
          <Text variant="group_title">{item.descricao}</Text>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <Text variant="group_subtitle">Atitudes</Text>
          <Text variant="group_subtitle">Realizadas</Text>
          <Text variant="group_count_atitude">{item.meta?.atitudes}</Text>
        </Box>
      </Box>
    );
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
          Grupo de atitudes
        </Text>
        {/* <TouchableOpacityBox paddingRight="s16">
          <Text variant="friends_subtitle_screen">Solicitações(1)</Text>
        </TouchableOpacityBox> */}
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
