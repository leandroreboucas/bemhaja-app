import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {EventoDTO, eventService} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {EmptyData, Feed, FilterHeaderEvents, Header, Screen} from '@components';

export function EventsScreen() {
  const [filter, setFilter] = useState('');
  const [list, setList] = useState<EventoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await eventService.getList();

      // setList([]);
      setList(list.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function changeFilter(param_filter: string) {
    setFilter(param_filter);
  }

  function renderItem({item}: ListRenderItemInfo<EventoDTO>) {
    return (
      <Feed.Root>
        <Feed.Event item={item} />
      </Feed.Root>
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <FilterHeaderEvents setFilterEvents={changeFilter} />

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
    </Screen>
  );
}
