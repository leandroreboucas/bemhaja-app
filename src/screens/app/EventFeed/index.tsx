import {useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl} from 'react-native';

import {FeedDTO, useFeedList} from '@dtos';
import {useScrollToTop} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RFValue} from 'react-native-responsive-fontsize';

import {Screen, Header, Feed, EmptyData} from '@components';
import {useAppTheme} from '@hooks';
import {AppRoutes} from '@routes';

type ScreenProps = NativeStackScreenProps<AppRoutes, 'EventFeed'>;

export function EventFeed({route}: ScreenProps) {
  const [eventFeed, setEventFeed] = useState<FeedDTO[]>([]);
  console.log(route.params.event_id);
  const {list, isError, isLoading, refresh, fetchNextPage} = useFeedList();
  const {colors} = useAppTheme();

  const flatListRef = useRef<FlatList<FeedDTO>>(null);
  useScrollToTop(flatListRef);

  function renderItem(listRender: ListRenderItemInfo<FeedDTO>) {
    return <Feed.Item item={listRender} />;
  }

  function fecthData() {
    const {event_id} = route.params;
    const feed = list.filter(
      item =>
        item.evento?.id === event_id ||
        item.evento_atitude_Finalizada?.evento.id === event_id,
    );
    setEventFeed(feed);
  }

  useEffect(() => fecthData(), [list]);

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Feed do evento" />
      <FlatList
        // ref={flatListRef}
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          flex: eventFeed.length === 0 ? 1 : undefined,
          borderRadius: RFValue(10),
        }}
        showsVerticalScrollIndicator={false}
        data={eventFeed}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        // onEndReached={fetchNextPage}
        // onEndReachedThreshold={0.1}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            colors={['#fff']}
            progressBackgroundColor={colors.primary_500}
          />
        }
        ListEmptyComponent={
          <EmptyData
            loading={isLoading}
            error={isError}
            refetch={refresh}
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
