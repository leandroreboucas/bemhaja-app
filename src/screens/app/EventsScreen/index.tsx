import {useState} from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl} from 'react-native';

import {
  Evento,
  useEventGetListEventsNotCreatedForMe,
  useEventGetListMyEvents,
} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  EmptyData,
  Feed,
  FilterHeaderEvents,
  Header,
  Screen,
  TextInput,
} from '@components';
import {useAppTheme, useDebounce} from '@hooks';

export function EventsScreen() {
  const [visibilidade, setVisibilidade] = useState('MEUS_EVENTOS');
  const {colors} = useAppTheme();
  const [filter, setFilter] = useState('');
  const debounceSearch = useDebounce(filter);

  const {
    list: myList,
    isError: isErrorMyList,
    isLoading: isLoadingMyList,
    refresh: refreshMyList,
    fetchNextPage: fetchNextPageMyList,
  } = useEventGetListMyEvents(debounceSearch);
  const {
    list: myNotList,
    isError: isErrorMyNotList,
    isLoading: isLoadingMyNotList,
    refresh: refreshMyNotList,
    fetchNextPage: fetchNextPageMyNotList,
  } = useEventGetListEventsNotCreatedForMe(debounceSearch);

  function changeVisibilidade(visibilidade: string) {
    setVisibilidade(visibilidade);
    if (visibilidade === 'MEUS_EVENTOS') {
      refreshMyList();
    } else {
      refreshMyNotList();
    }
  }

  function renderItem({item}: ListRenderItemInfo<Evento>) {
    return (
      <Feed.Root>
        <Feed.Event item={item} />
      </Feed.Root>
    );
  }

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <FilterHeaderEvents setFilterEvents={changeVisibilidade} />

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
          value={filter}
          onChangeText={setFilter}
        />
      </Box>

      {visibilidade === 'MEUS_EVENTOS' ? (
        <FlatList
          style={{
            borderRadius: RFValue(10),
          }}
          contentContainerStyle={{
            flex: myList.length === 0 ? 1 : undefined,
            borderRadius: RFValue(10),
          }}
          showsVerticalScrollIndicator={false}
          data={myList}
          keyExtractor={item => item.id!}
          renderItem={renderItem}
          onEndReached={fetchNextPageMyList}
          onEndReachedThreshold={0.1}
          refreshing={isErrorMyList}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingMyList}
              onRefresh={refreshMyList}
              colors={['#fff']}
              progressBackgroundColor={colors.primary_500}
            />
          }
          ListEmptyComponent={
            <EmptyData
              loading={isLoadingMyList}
              error={isErrorMyList}
              refetch={refreshMyList}
              text='Você pode adicionar um evento clicando no ícone de "+" na barra
          inferior.'
            />
          }
          bounces
          decelerationRate="fast"
          // ItemSeparatorComponent={() => <Feed.Separator />}
          // ListHeaderComponent={<Header />}
          // stickyHeaderIndices={[0]}
          // stickyHeaderHiddenOnScroll
        />
      ) : (
        <FlatList
          style={{
            borderRadius: RFValue(10),
          }}
          contentContainerStyle={{
            flex: myNotList.length === 0 ? 1 : undefined,
            borderRadius: RFValue(10),
          }}
          showsVerticalScrollIndicator={false}
          data={myNotList}
          keyExtractor={item => item.id!}
          renderItem={renderItem}
          onEndReached={fetchNextPageMyNotList}
          onEndReachedThreshold={0.1}
          refreshing={isLoadingMyNotList}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingMyNotList}
              onRefresh={refreshMyNotList}
              colors={['#fff']}
              progressBackgroundColor={colors.primary_500}
            />
          }
          ListEmptyComponent={
            <EmptyData
              loading={isLoadingMyNotList}
              error={isErrorMyNotList}
              refetch={refreshMyNotList}
            />
          }
          bounces
          decelerationRate="fast"
          // ItemSeparatorComponent={() => <Feed.Separator />}
          // ListHeaderComponent={<Header />}
          // stickyHeaderIndices={[0]}
          // stickyHeaderHiddenOnScroll
        />
      )}
    </Screen>
  );
}
