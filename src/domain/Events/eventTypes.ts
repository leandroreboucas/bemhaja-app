import { Behavior } from '../Behavior';
import { Usuario } from '../User';

export interface Evento {
    id?: string;
    codigo?: number;
    foto?: string;
    nome: string;
    visibilidade: 'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL';
    data_hora_inicio: string;
    data_hora_final?: string | null;
    presencial_endereco?: string | null;
    virtual_link?: string | null;
    tematico_descricao?: string | null;
    observacoes?: string | null;
    usuario_codigo?: number | null;
}

export interface CreateEventModel {
    event: Evento;
    behaviors: Behavior[];
    users: Usuario[];
}
