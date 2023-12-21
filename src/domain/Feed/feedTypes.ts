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
