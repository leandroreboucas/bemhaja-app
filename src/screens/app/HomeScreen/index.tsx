import {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {FeedDTO, feedService} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {EmptyData, Feed, Header, Screen} from '@components';

// import {useAppNavigation} from '@hooks';

export function HomeScreen() {
  const [feedList, setFeedList] = useState<FeedDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const navigation = useAppNavigation();

  // function goSettings() {
  //   navigation.navigate('SettingsScreen');
  // }

  async function fetchData() {
    try {
      setError(false);
      setLoading(true);
      const list = await feedService.getList();
      setFeedList(list.data);
      // setFeedList([]);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function renderItem({item}: ListRenderItemInfo<FeedDTO>) {
    return (
      <Feed.Root>
        {/**
         * Header é aplicado a todos os tipos
         */}
        <Feed.Header item={item} />

        {/**
         * Evento criado
         */}
        {item.tipo === 'EVENTO_CRIADO' || item.tipo === 'EVENTO_FINALIZADO' ? (
          <Feed.Event item={item.evento!} boxProps={{marginBottom: 's16'}} />
        ) : null}

        {/**
         * Postagem avulsa
         */}
        {item.tipo === 'POSTAGEM_AVULSA' && (
          <>
            {item.titulo && <Feed.Title title={item.titulo} />}
            {item.foto && <Feed.Image foto={item.foto} />}
            {item.texto && <Feed.Text text={item.texto} />}
          </>
        )}

        {/**
         * Atitude realizada
         */}
        {item.tipo === 'ATITUDE_REALIZADA' && (
          <>
            {item.evento_atitude_Finalizada?.atitude.descricao && (
              <Feed.Title
                title={item.evento_atitude_Finalizada?.atitude.descricao}
              />
            )}

            {/**
             * Imagem
             */}
            {item.evento_atitude_Finalizada?.tipo === 'IMAGE' && (
              <Feed.Image foto={item.evento_atitude_Finalizada.midia_link} />
            )}

            {/**
             * Video
             */}
            {item.evento_atitude_Finalizada?.tipo === 'VIDEO' && (
              <Feed.Video uri={item.evento_atitude_Finalizada.midia_link} />
            )}

            {/**
             * Audio
             */}
            {item.evento_atitude_Finalizada?.tipo === 'AUDIO' && (
              <Feed.Audio uri={item.evento_atitude_Finalizada.midia_link} />
            )}

            {item.evento_atitude_Finalizada?.titulo && (
              <Feed.Title title={item.evento_atitude_Finalizada?.titulo} />
            )}
            {item.evento_atitude_Finalizada?.texto && (
              <Feed.Text text={item.evento_atitude_Finalizada?.texto} />
            )}
          </>
        )}

        {/**
         * Footer apenas para atitudes realizadas e postagens avulsas
         */}
        {item.tipo === 'ATITUDE_REALIZADA' ||
        item.tipo === 'POSTAGEM_AVULSA' ? (
          <Feed.Footer
            evento={
              item.tipo === 'ATITUDE_REALIZADA'
                ? item.evento_atitude_Finalizada?.evento!
                : item.evento!
            }
          />
        ) : null}
      </Feed.Root>
    );
  }

  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <FlatList
        style={{
          borderRadius: RFValue(10),
        }}
        contentContainerStyle={{
          flex: feedList.length === 0 ? 1 : undefined,
          borderRadius: RFValue(10),
        }}
        showsVerticalScrollIndicator={false}
        data={feedList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyData
            loading={loading}
            error={error}
            refetch={fetchData}
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
