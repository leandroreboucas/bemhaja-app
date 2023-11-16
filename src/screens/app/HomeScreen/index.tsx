import {useRef} from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl} from 'react-native';

import {FeedDTO, useFeedList} from '@dtos';
import {useScrollToTop} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

import {EmptyData, Feed, Header, Screen} from '@components';
import {useAppTheme} from '@hooks';

export function HomeScreen() {
  const {list, error, loading, refresh, fetchNextPage} = useFeedList();
  const {colors} = useAppTheme();

  const flatListRef = useRef<FlatList<FeedDTO>>(null);
  useScrollToTop(flatListRef);

  function renderItem(listRender: ListRenderItemInfo<FeedDTO>) {
    return <Feed.Item item={listRender} />;
  }

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <FlatList
        ref={flatListRef}
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
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={['#fff']}
            progressBackgroundColor={colors.primary_500}
          />
        }
        ListEmptyComponent={
          <EmptyData
            loading={loading}
            error={error}
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
