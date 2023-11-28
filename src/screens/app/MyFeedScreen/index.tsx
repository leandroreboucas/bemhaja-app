import {useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Image,
  RefreshControl,
} from 'react-native';

import {AuthCredentialsAPI, FeedDTO, useFeedList} from '@domain';
import {useScrollToTop} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

import {Screen, Header, Feed, Box, Text, EmptyData, Icon} from '@components';
import {useAuthCredentials, useAppNavigation, useAppTheme} from '@hooks';

export function MyFeedScreen() {
  const {list, isError, isLoading, refresh, fetchNextPage} = useFeedList();
  const {colors} = useAppTheme();
  const {authCredentials} = useAuthCredentials();
  const navigation = useAppNavigation();

  const flatListRef = useRef<FlatList<FeedDTO>>(null);
  useScrollToTop(flatListRef);

  function goConfig() {
    navigation.navigate('ConfigScreen');
  }

  function Profile() {
    const user = authCredentials?.user!;
    return (
      <Box
        flexDirection="row"
        marginHorizontal="s24"
        alignItems="center"
        paddingVertical="s16"
        gap="s8">
        <Image
          source={{uri: user.foto}}
          style={{width: RFValue(60), height: RFValue(60)}}
          borderRadius={RFValue(60) / 2}
          resizeMode="cover"
        />
        <Box flex={1}>
          <Text variant="friends_title_screen">{user.nome}</Text>
          <Text variant="friends_meta_events_count">{user.email}</Text>
        </Box>
        <Icon
          name="settings"
          size={32}
          color="primary_800"
          onPress={goConfig}
        />
      </Box>
    );
  }

  function renderItem(listRender: ListRenderItemInfo<FeedDTO>) {
    return <Feed.Item item={listRender} removeProfile />;
  }

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Meu feed" />
      <Profile />
      <FlatList
        // ref={flatListRef}
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
