export interface FeedDTO {
  id: string;
  codigo: number;
  tipo:
    | 'EVENTO_CRIADO'
    | 'EVENTO_FINALIZADO'
    | 'ATITUDE_REALIZADA'
    | 'POSTAGEM_AVULSA';
  usuario: UsuarioDTO;
  evento?: EventoDTO;
  evento_atitude_Finalizada?: EventoAtitudeFinalizadaDTO;
  titulo?: string;
  texto?: string;
  foto?: string;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface UsuarioDTO {
  id: string;
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
  ativo: boolean;
  data_cadastro: string;
  data_atualizacao: string;
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
  data_cadastro: Date;
  data_atualizacao: Date;
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
  data_cadastro: Date;
  data_atualizacao: Date;
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
  data_cadastro: Date;
  data_atualizacao: Date;
}

export interface EventoAtitudeFinalizadaDTO {
  id: string;
  codigo: number;
  evento: EventoDTO;
  usuario: UsuarioDTO;
  atitude: AtitudeDTO;
  midia_link: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}

export interface MetaDataPageAPI {
  total: number; // 24;
  per_page: number; // 10;
  current_page: number; // 1;
  last_page: number; // 3;
  first_page: number; // 1;
  first_page_url: string; // '/?page=1';
  last_page_url: string; // '/?page=3';
  next_page_url: string | null; // '/?page=2';
  previous_page_url: string | null; // null;
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
  meta: MetaDataPageAPI;
  data: Data[];
}
