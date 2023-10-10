import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {FeedDTO, feedService} from '@dtos';

import {Feed, Header, Screen} from '@components';
import {useAppNavigation} from '@hooks';

export function HomeScreen() {
  const [feedList, setFeedList] = useState<FeedDTO[]>([]);
  const navigation = useAppNavigation();

  function goSettings() {
    navigation.navigate('SettingsScreen');
  }

  useEffect(() => {
    feedService.getList().then(list => setFeedList(list));
  }, []);

  function renderItem({item}: ListRenderItemInfo<FeedDTO>) {
    return (
      <Feed.Root>
        <Feed.Header item={item} />
        {item.tipo === 'EVENTO_CRIADO' && <Feed.ContentNewEvent item={item} />}
        {item.tipo === 'EVENTO_FINALIZADO' && (
          <Feed.ContentNewEvent item={item} />
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
    <Screen style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={feedList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Feed.Separator />}
        ListHeaderComponent={<Header />}
        stickyHeaderHiddenOnScroll
      />
    </Screen>
  );
}
