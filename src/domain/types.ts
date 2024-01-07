import { Evento } from './Events/eventTypes';

export interface FeedDTO {
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

export interface UsuarioDTO {
  id?: string;
  codigo?: number;
  foto?: string;
  nome: string;
  email: string;
  data_nascimento: string;
  senha?: string;
  adm?: boolean;
  token_facebook?: string;
  token_google?: string;
  token_apple?: string;
  token_onesignal?: string;
  ativo?: boolean;
  data_cadastro?: string;
  data_atualizacao?: string;
  atitudes_realizadas?: number | null;
  meta?: {
    eventos?: number;
  };
}

export interface AtitudeGrupoDTO {
  id: string;
  codigo: number;
  descricao: string;
  descricao_ingles: string;
  descricao_espanhol: string;
  ativo: boolean;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface AtitudeDTO {
  id: string;
  codigo: number;
  atitude_grupo: AtitudeGrupoDTO;
  descricao: string;
  descricao_ingles: string;
  descricao_espanhol: string;
  ativo: boolean;
  aprovado: boolean | null;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface EventoDTO {
  id: string;
  codigo: number;
  foto?: string;
  descricao: string;
  visibilidade: 'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL';
  data_hora_inicio: string;
  data_hora_final?: string;
  presencial?: boolean;
  presencial_endereco?: string;
  virtual?: boolean;
  virtual_link?: string;
  tematico?: boolean;
  tematico_descricao?: string;
  observacoes?: string;
  usuario: UsuarioDTO;
  arquivado: boolean;
  finalizado: boolean;
  data_cadastro: string;
  data_atualizacao: string;
  meta?: {
    participantes?: number;
  };
}

export interface EventoAtitudeDTO {
  id: string;
  codigo: number;
  evento: EventoDTO;
  atitude?: AtitudeDTO;
  atitude_sugestao?: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}

export interface EventoCampanhaDTO {
  id: string;
  codigo: number;
  evento: EventoDTO;
  foto: string;
  descricao: string;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface EventoAtitudeFinalizadaDTO {
  id: string;
  codigo: number;
  tipo: 'AUDIO' | 'VIDEO' | 'IMAGE' | 'TEXT';
  // evento: Evento;
  // usuario: UsuarioDTO;
  // atitude: AtitudeDTO;
  atitude_descricao?: string;
  midia_link: string;
  titulo?: string;
  texto?: string;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface MetaDataPageAPI {
  total?: number;
  page?: number;
  per_page?: number;
  total_pages?: number;
  previous_page?: number | null;
  next_page?: number | null;
  has_more?: boolean;
}

export interface GrupoAtitudeDTO {
  id: string;
  codigo: number;
  descricao: string;
  ativo: boolean;
  data_cadastro: string;
  data_atualizacao: string;
  meta?: {
    atitudes?: number;
  };
}

/**
 * @description Interface que define o formato de uma página de dados da API.
 * @template Data Tipo do dado da página.
 */
export interface PageAPI<Data> {
  meta?: MetaDataPageAPI;
  data: Data[];
}

export interface PageParam {
  page?: number;
  per_page?: number;
  filter?: string;
}

export interface MetaDataPage {
  total: number; // 24;
  perPage: number; // 10;
  currentPage: number; // 1;
  lastPage: number; // 3;
  firstPage: number; // 1;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
