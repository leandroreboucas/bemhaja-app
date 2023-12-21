export interface Behavior {
  id?: string;
  codigo?: number;
  grupo_atitude_codigo?: number;
  grupo?: string;
  descricao: string;
  descricao_ingles?: string;
  descricao_espanhol?: string;
  ativo?: boolean;
  aprovado?: boolean;
  sugestao: string;
  data_cadastro?: string;
  data_atualizacao?: string;
}
