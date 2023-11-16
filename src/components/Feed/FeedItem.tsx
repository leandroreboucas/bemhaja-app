import {ListRenderItemInfo} from 'react-native';

import {FeedDTO} from '@dtos';

import {FeedAudio} from './FeedAudio';
import {FeedEvent} from './FeedEvent';
import {FeedFooter} from './FeedFooter';
import {FeedHeader} from './FeedHeader';
import {FeedImage} from './FeedImage';
import {FeedRoot} from './FeedRoot';
import {FeedText} from './FeedText';
import {FeedTitle} from './FeedTitle';
import {FeedVideo} from './FeedVideo';

interface FeedItemProps {
  item: ListRenderItemInfo<FeedDTO>;
}

export function FeedItem({item: listFlat}: FeedItemProps) {
  const item = listFlat.item;
  return (
    <FeedRoot>
      {/**
       * Header é aplicado a todos os tipos
       */}
      <FeedHeader item={item} />

      {/**
       * Evento criado
       */}
      {item.tipo === 'EVENTO_CRIADO' || item.tipo === 'EVENTO_FINALIZADO' ? (
        <FeedEvent item={item.evento!} boxProps={{marginBottom: 's16'}} />
      ) : null}

      {/**
       * Postagem avulsa
       */}
      {item.tipo === 'POSTAGEM_AVULSA' && (
        <>
          {item.titulo && <FeedTitle title={item.titulo} />}
          {item.foto && <FeedImage foto={item.foto} />}
          {item.texto && <FeedText text={item.texto} />}
        </>
      )}

      {/**
       * Atitude realizada
       */}
      {item.tipo === 'ATITUDE_REALIZADA' && (
        <>
          {item.evento_atitude_Finalizada?.atitude.descricao && (
            <FeedTitle
              title={item.evento_atitude_Finalizada?.atitude.descricao}
            />
          )}

          {/**
           * Imagem
           */}
          {item.evento_atitude_Finalizada?.tipo === 'IMAGE' && (
            <FeedImage foto={item.evento_atitude_Finalizada.midia_link} />
          )}

          {/**
           * Video
           */}
          {item.evento_atitude_Finalizada?.tipo === 'VIDEO' && (
            <FeedVideo uri={item.evento_atitude_Finalizada.midia_link} />
          )}

          {/**
           * Audio
           */}
          {item.evento_atitude_Finalizada?.tipo === 'AUDIO' && (
            <FeedAudio uri={item.evento_atitude_Finalizada.midia_link} />
          )}

          {item.evento_atitude_Finalizada?.titulo && (
            <FeedTitle title={item.evento_atitude_Finalizada?.titulo} />
          )}
          {item.evento_atitude_Finalizada?.texto && (
            <FeedText text={item.evento_atitude_Finalizada?.texto} />
          )}
        </>
      )}

      {/**
       * Footer apenas para atitudes realizadas e postagens avulsas
       */}
      {item.tipo === 'ATITUDE_REALIZADA' || item.tipo === 'POSTAGEM_AVULSA' ? (
        <FeedFooter
          evento={
            item.tipo === 'ATITUDE_REALIZADA'
              ? item.evento_atitude_Finalizada?.evento!
              : item.evento!
          }
        />
      ) : null}
    </FeedRoot>
  );
}
