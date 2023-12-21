import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Behavior, useBehaviorGetAll} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

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
  initialItemSelected?: Behavior | null;
  changeItemSelected: (items: Behavior | null) => void;
}

export function BehaviorSearchSingle({
  closeModal,
  initialItemSelected = null,
  changeItemSelected,
}: BehaviorSearchProps) {
  const [filteredData, setFilteredData] = useState<Behavior[]>([]);
  const {behaviors, isError, isLoading, isFetching, refetch} =
    useBehaviorGetAll();
  const [itemSelected, setItemSelected] = useState<Behavior | null>(null);

  function renderItem({item}: ListRenderItemInfo<Behavior>) {
    return (
      <TouchableOpacityBox
        flexDirection="row"
        alignItems="center"
        marginHorizontal="s16"
        gap="s16"
        onPress={() => handleChengeStatusCheckbox(item)}>
        {itemSelected?.id !== item.id ? (
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
    if (itemSelected?.id !== item.id) {
      setItemSelected(item);
    } else {
      setItemSelected(null);
    }
  }

  function goBack() {
    closeModal();
  }

  function handleInitialItemsSelected() {
    if (initialItemSelected?.id) {
      setItemSelected(initialItemSelected);
    }
    const selectedItems = behaviors.filter(
      item => initialItemSelected?.id === item.id!,
    );
    const nonSelectedItems = behaviors.filter(
      item => initialItemSelected?.id !== item.id!,
    );

    // Coloca os itens selecionados no topo
    setFilteredData([...selectedItems, ...nonSelectedItems]);
  }

  function handleConfirm() {
    changeItemSelected(itemSelected);
    closeModal();
  }

  function handleFilter(text: string) {
    const newData = behaviors.filter(item => {
      const itemData = item.descricao
        ? item.descricao.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  }

  useEffect(() => {
    handleInitialItemsSelected();
  }, [isLoading, isFetching]);

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
          Selecionar atitude
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
            loading={isLoading || isFetching}
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
          title="Confirmar"
          preset="primary"
          width={RFValue(150)}
        />
      </Box>
    </Screen>
  );
}
