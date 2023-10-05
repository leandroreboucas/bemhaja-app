import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {FeedDTO, feedService} from '@dtos';

import {Feed, Screen} from '@components';
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
      </Feed.Root>
    );
  }

  return (
    <Screen>
      <FlatList
        data={feedList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Feed.Separator />}
      />
    </Screen>
  );
}
