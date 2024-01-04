import { Evento } from '../Events';
import { EventoAtitudeFinalizadaDTO, UsuarioDTO } from '../types';

export interface FeedInsertApi {
  foto?: string;
  visibilidade: string;
  data_hora_inicio: string;
  data_hora_final: string;
  presencial_endereco?: string;
  virtual_link?: string;
  tematico_descricao?: string;
  observacoes?: string;
  usuario_codigo: number;
}

export interface FeedList {
  id: string;
  codigo: number;
  tipo:
  | 'EVENTO_CRIADO'
  | 'EVENTO_FINALIZADO'
  | 'ATITUDE_REALIZADA'
  | 'POSTAGEM_AVULSA';
  usuario: UsuarioDTO;
  evento?: Evento;
  evento_atitude_finalizada?: EventoAtitudeFinalizadaDTO;
  titulo?: string;
  texto?: string;
  foto?: string;
  data_cadastro: string;
  data_atualizacao: string;
}
