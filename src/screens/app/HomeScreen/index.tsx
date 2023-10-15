import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {FeedDTO, feedService} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {EmptyData, Feed, Header, Screen} from '@components';

// import {useAppNavigation} from '@hooks';

export function HomeScreen() {
  const [feedList, setFeedList] = useState<FeedDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const navigation = useAppNavigation();

  // function goSettings() {
  //   navigation.navigate('SettingsScreen');
  // }

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await feedService.getList();
      setFeedList(list.data);
      // setFeedList([]);
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

  function renderItem({item}: ListRenderItemInfo<FeedDTO>) {
    return (
      <Feed.Root>
        <Feed.Header item={item} />
        {item.tipo === 'EVENTO_CRIADO' && <Feed.Event item={item.evento!} />}
        {item.tipo === 'EVENTO_FINALIZADO' && (
          <Feed.Event item={item.evento!} />
        )}
        {item.tipo === 'POSTAGEM_AVULSA' && (
          <>
            <Feed.Title item={item} />
            {item.foto && <Feed.Image foto={item.foto} />}
            {item.texto && <Feed.Text text={item.texto} />}
          </>
        )}
        {item.evento && <Feed.Footer evento={item.evento} />}
      </Feed.Root>
    );
  }

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <FlatList
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          flex: feedList.length === 0 ? 1 : undefined,
          borderRadius: RFValue(10),
        }}
        showsVerticalScrollIndicator={false}
        data={feedList}
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
        ItemSeparatorComponent={() => <Feed.Separator />}
        // ListHeaderComponent={<Header />}
        // stickyHeaderIndices={[0]}
        // stickyHeaderHiddenOnScroll
      />
    </Screen>
  );
}
