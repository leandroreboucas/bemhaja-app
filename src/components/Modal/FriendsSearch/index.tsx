import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Usuario, useFriendGetAll, useUserGetAll} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAuthCredentials} from '@hooks';

import {Box} from './../../Box';
import {Button} from './../../Button';
import {EmptyData} from './../../EmptyData';
import {Feed} from './../../Feed';
import {FriendCard} from './../../FriendCard';
import {Screen} from './../../Screen';
import {Text} from './../../Text';
import {TextInput} from './../../TextInput';
import {TouchableOpacityBox} from './../../TouchableOpacityBox';

interface FriendsSearchProps {
  closeModal: () => void;
  initialItemsSelected?: Usuario[];
  changeItemsSelected: (items: Usuario[]) => void;
  isUsersAll?: boolean;
}

export function FriendsSearch({
  closeModal,
  initialItemsSelected = [],
  changeItemsSelected,
  isUsersAll = false,
}: FriendsSearchProps) {
  const [filteredData, setFilteredData] = useState<Usuario[]>([]);
  const {users, isError, isLoading, isFetching, refetch} = useUserGetAll();
  const {
    friends,
    isLoading: isLoadingFriends,
    isFetching: isFetchingFriends,
  } = useFriendGetAll();
  const [itemsSelected, setItemsSelected] = useState<Usuario[]>([]);
  const {authCredentials} = useAuthCredentials();

  function renderItem({item}: ListRenderItemInfo<Usuario>) {
    return (
      <TouchableOpacityBox
        flexDirection="row"
        alignItems="center"
        marginHorizontal="s16"
        gap="s16"
        onPress={() => handleChengeStatusCheckbox(item)}>
        {!itemsSelected.includes(item!) ? (
          <Box
            width={RFValue(24)}
            height={RFValue(24)}
            style={{borderRadius: 99999}}
            borderColor="gray_700"
            borderWidth={RFValue(1)}
          />
        ) : (
          <Box
            width={RFValue(24)}
            height={RFValue(24)}
            style={{borderRadius: 99999}}
            backgroundColor="primary_500"
            borderColor="gray_700"
            borderWidth={RFValue(1)}
          />
        )}

        <FriendCard item={item} />
      </TouchableOpacityBox>
    );
  }

  function handleChengeStatusCheckbox(item: Usuario) {
    if (!itemsSelected.includes(item!)) {
      const items = [...itemsSelected, item!];
      setItemsSelected(items);
    } else {
      const items = [...itemsSelected];
      const index = items.indexOf(item!);
      if (index > -1) {
        items.splice(index, 1);
      }
      setItemsSelected(items);
    }
  }

  function goBack() {
    closeModal();
  }

  function handleInitialItemsSelected() {
    if (initialItemsSelected.length > 0) {
      setItemsSelected(initialItemsSelected);
    }
    let selectedItems = [];
    let nonSelectedItems = [];
    if (isUsersAll) {
      selectedItems = users.filter(item => initialItemsSelected.includes(item));
      selectedItems = selectedItems.filter(
        item => item.id !== authCredentials?.user.id,
      );
      nonSelectedItems = users.filter(
        item => !initialItemsSelected.includes(item),
      );
      nonSelectedItems = nonSelectedItems.filter(
        item => item.id !== authCredentials?.user.id,
      );
    } else {
      selectedItems = friends.filter(item =>
        initialItemsSelected.includes(item),
      );
      nonSelectedItems = friends.filter(
        item => !initialItemsSelected.includes(item),
      );
    }

    // Coloca os itens selecionados no topo

    setFilteredData([...selectedItems, ...nonSelectedItems]);
  }

  function handleConfirm() {
    changeItemsSelected(itemsSelected);
    closeModal();
  }

  function handleFilter(text: string) {
    if (isUsersAll) {
      const newData = users.filter(item => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      const newData = friends.filter(item => {
        const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
  }

  useEffect(() => {
    handleInitialItemsSelected();
  }, [isLoading, isFetching, isLoadingFriends, isFetchingFriends]);

  return (
    <Screen
      style={{
        paddingBottom: 0,
        // paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Box
        flexDirection="row"
        marginHorizontal="s16"
        marginTop="s16"
        alignItems="center"
        justifyContent="center">
        <Text paddingLeft="s16" variant="friends_title_screen">
          Convidar participantes
        </Text>
      </Box>
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
          onChangeText={handleFilter}
        />
      </Box>
      <FlatList
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          flex: filteredData.length === 0 ? 1 : undefined,
          borderRadius: RFValue(10),
        }}
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={item => item.id!}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyData
            loading={
              isLoading || isFetching || isLoadingFriends || isFetchingFriends
            }
            error={isError}
            refetch={refetch}
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
        <Button
          onPress={handleConfirm}
          title="Convidar"
          preset="primary"
          width={RFValue(150)}
        />
      </Box>
    </Screen>
  );
}
