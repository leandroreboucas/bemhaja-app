import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Evento, useEventGetListMyEvents} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from './../../Box';
import {Button} from './../../Button';
import {EmptyData} from './../../EmptyData';
import {Feed} from './../../Feed';
import {Screen} from './../../Screen';
import {Text} from './../../Text';
import {TextInput} from './../../TextInput';
import {TouchableOpacityBox} from './../../TouchableOpacityBox';

interface EventoSearchProps {
  closeModal: () => void;
  initialItemsSelected?: Evento | null;
  changeItemsSelected: (item: Evento | null) => void;
}

export function EventSearch({
  closeModal,
  initialItemsSelected = null,
  changeItemsSelected,
}: EventoSearchProps) {
  const [filteredData, setFilteredData] = useState<Evento[]>([]);
  const {events, isError, isLoading, isFetching, refetch} =
    useEventGetListMyEvents();
  const [itemSelected, setItemSelected] = useState<Evento | null>(null);

  function renderItem({item}: ListRenderItemInfo<Evento>) {
    return (
      <TouchableOpacityBox
        flexDirection="row"
        alignItems="center"
        marginHorizontal="s16"
        gap="s16"
        onPress={() => handleChengeStatusCheckbox(item)}>
        {itemSelected?.id !== item.id! ? (
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

        <Feed.Event item={item} navigateEventDetail={false} />
      </TouchableOpacityBox>
    );
  }

  function handleChengeStatusCheckbox(item: Evento) {
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
    if (initialItemsSelected?.id) {
      setItemSelected(initialItemsSelected);
    }
    const selectedItems = events.filter(
      item => initialItemsSelected?.id === item.id!,
    );
    const nonSelectedItems = events.filter(
      item => initialItemsSelected?.id !== item.id!,
    );

    // Coloca os itens selecionados no topo
    setFilteredData([...selectedItems, ...nonSelectedItems]);
  }

  function handleConfirm() {
    changeItemsSelected(itemSelected);
    closeModal();
  }

  function handleFilter(text: string) {
    const newData = events.filter(item => {
      const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
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
          Selecionar evento
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
