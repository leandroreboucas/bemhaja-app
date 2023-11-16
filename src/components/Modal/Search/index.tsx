import {FlatList, ListRenderItem, Modal} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from './../../Box';
import {Button} from './../../Button';
import {FeedSeparator} from './../../Feed/FeedSeparator';
import {Screen} from './../../Screen';
import {TextInput} from './../../TextInput';

interface SearchModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  list: any[];
  buttonTitle: string;
  renderItem: ListRenderItem<any> | null | undefined;
}

export function SearchModal({
  modalVisible,
  closeModal,
  buttonTitle,
  list,
  renderItem,
}: SearchModalProps) {
  function goBack() {
    closeModal();
  }

  return (
    <Modal animationType="slide" visible={modalVisible} style={{flex: 1}}>
      <Screen
        scrollable
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          paddingHorizontal: 0,
          flex: 1,
        }}>
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
            boxProps={{flex: 1}}
            removeLabel
            placeholder="Pesquisar"
            label=""
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
          keyExtractor={item => item.id}
          renderItem={renderItem}
          bounces
          decelerationRate="fast"
          ItemSeparatorComponent={() => <FeedSeparator />}
          // ListHeaderComponent={<Header />}
          // stickyHeaderIndices={[0]}
          // stickyHeaderHiddenOnScroll
        />
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          <Button
            onPress={goBack}
            title="Voltar"
            preset="gray"
            width={RFValue(150)}
          />
          <Button title={buttonTitle} preset="primary" width={RFValue(150)} />
        </Box>
      </Screen>
    </Modal>
  );
}
