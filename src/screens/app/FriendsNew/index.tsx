import {useEffect, useState} from 'react';
import {ListRenderItemInfo, FlatList} from 'react-native';

import {UsuarioDTO, friendService} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  Button,
  Header,
  Screen,
  TextInput,
  EmptyData,
  Feed,
  TouchableOpacityBox,
  FriendCard,
} from '@components';
import {useAppNavigation} from '@hooks';

export function FriendsNew() {
  const navigation = useAppNavigation();
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<UsuarioDTO>();

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await friendService.getList();
      setList(list.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({item}: ListRenderItemInfo<UsuarioDTO>) {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        marginHorizontal="s16"
        gap="s16">
        {selected?.id !== item.id ? (
          <TouchableOpacityBox
            width={RFValue(24)}
            height={RFValue(24)}
            style={{borderRadius: 99999}}
            borderColor="gray_700"
            borderWidth={RFValue(1)}
            onPress={() => setSelected(item)}
          />
        ) : (
          <TouchableOpacityBox
            width={RFValue(24)}
            height={RFValue(24)}
            style={{borderRadius: 99999}}
            backgroundColor="primary_500"
            borderColor="gray_700"
            borderWidth={RFValue(1)}
            onPress={() => setSelected(undefined)}
          />
        )}

        <FriendCard item={item} />
      </Box>
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  function goBack() {
    navigation.goBack();
  }
  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Convidar amigo" />
      {/**
       * Search
       */}
      <Box
        flexDirection="row"
        marginHorizontal="s16"
        marginTop="s16"
        alignItems="center"
        justifyContent="flex-start">
        <TextInput
          boxProps={{flex: 1, marginHorizontal: 's16'}}
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
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        marginBottom="s24">
        <Button
          onPress={goBack}
          title="Voltar"
          preset="gray"
          width={RFValue(150)}
        />
        <Button title="Convidar" preset="primary" width={RFValue(150)} />
      </Box>
    </Screen>
  );
}
