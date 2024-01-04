import {ListRenderItemInfo} from 'react-native';

import {FeedDTO} from '@domain';

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
  removeProfile?: boolean;
}

export function FeedItem({item: listFlat, removeProfile}: FeedItemProps) {
  const item = listFlat.item;
  return (
    <FeedRoot>
      {/**
       * Header é aplicado a todos os tipos
       */}
      <FeedHeader item={item} removeProfile={removeProfile} />

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
          {item.evento_atitude_finalizada?.atitude_descricao && (
            <FeedTitle
              title={item.evento_atitude_finalizada?.atitude_descricao}
            />
          )}

          {/**
           * Imagem
           */}
          {item.evento_atitude_finalizada?.tipo === 'IMAGE' && (
            <FeedImage foto={item.evento_atitude_finalizada.midia_link} />
          )}

          {/**
           * Video
           */}
          {item.evento_atitude_finalizada?.tipo === 'VIDEO' && (
            <FeedVideo uri={item.evento_atitude_finalizada.midia_link} />
          )}

          {/**
           * Audio
           */}
          {item.evento_atitude_finalizada?.tipo === 'AUDIO' && (
            <FeedAudio uri={item.evento_atitude_finalizada.midia_link} />
          )}

          {item.evento_atitude_finalizada?.titulo && (
            <FeedTitle title={item.evento_atitude_finalizada?.titulo} />
          )}
          {item.evento_atitude_finalizada?.texto && (
            <FeedText text={item.evento_atitude_finalizada?.texto} />
          )}
        </>
      )}

      {/**
       * Footer apenas para atitudes realizadas e postagens avulsas
       */}
      {item.tipo === 'ATITUDE_REALIZADA' && (
        <FeedFooter evento={item.evento!} />
      )}

      {item.tipo === 'POSTAGEM_AVULSA' && item.evento && (
        <FeedFooter evento={item.evento} />
      )}
    </FeedRoot>
  );
}
