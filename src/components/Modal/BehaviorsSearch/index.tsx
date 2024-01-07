import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl} from 'react-native';

import {Behavior, useBehaviorGetAll} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme, useDebounce} from '@hooks';

import {BehaviorCard} from './../../BehaviorCard';
import {Box} from './../../Box';
import {Button} from './../../Button';
import {EmptyData} from './../../EmptyData';
import {Feed} from './../../Feed';
import {Screen} from './../../Screen';
import {Text} from './../../Text';
import {TextInput} from './../../TextInput';
import {TouchableOpacityBox} from './../../TouchableOpacityBox';

interface BehaviorSearchProps {
  closeModal: () => void;
  initialItemsSelected?: Behavior[];
  changeItemsSelected: (items: Behavior[]) => void;
}

export function BehaviorsSearch({
  closeModal,
  initialItemsSelected = [],
  changeItemsSelected,
}: BehaviorSearchProps) {
  const {colors} = useAppTheme();
  const [filter, setFilter] = useState('');
  const debounceSearch = useDebounce(filter);

  const {list, isError, isLoading, refresh, fetchNextPage} =
    useBehaviorGetAll(debounceSearch);

  const [itemsSelected, setItemsSelected] = useState<Behavior[]>([]);

  function renderItem({item}: ListRenderItemInfo<Behavior>) {
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

        <BehaviorCard item={item} />
      </TouchableOpacityBox>
    );
  }

  function handleChengeStatusCheckbox(item: Behavior) {
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
    const selectedItems = list.filter(item =>
      initialItemsSelected.includes(item),
    );
    const nonSelectedItems = list.filter(
      item => !initialItemsSelected.includes(item),
    );

    // Coloca os itens selecionados no topo
    // setFilteredData([...selectedItems, ...nonSelectedItems]);
  }

  function handleConfirm() {
    changeItemsSelected(itemsSelected);
    closeModal();
  }

  useEffect(() => {
    handleInitialItemsSelected();
  }, [isLoading]);

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
          Selecionar atitude(s)
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
          value={filter}
          onChangeText={setFilter}
        />
      </Box>
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
        keyExtractor={item => item.id!}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
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
          title="Confirmar"
          preset="primary"
          width={RFValue(150)}
        />
      </Box>
    </Screen>
  );
}
