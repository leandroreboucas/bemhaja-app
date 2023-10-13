import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, Platform} from 'react-native';

import {FeedDTO, feedService} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box, Feed, Header, Screen} from '@components';
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
      <Header contentRadius />
      <FlatList
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          borderRadius: RFValue(10),
          paddingBottom: RFValue(100),
        }}
        showsVerticalScrollIndicator={false}
        data={feedList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
