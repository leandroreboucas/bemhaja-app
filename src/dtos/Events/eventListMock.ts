import {EventoDTO} from '../types';

export const eventListMock: EventoDTO[] = [
  {
    id: '1',
    codigo: 1,
    foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
    descricao: 'Almoço comunitário',
    visibilidade: 'PUBLICO_GERAL',
    data_hora_inicio: '10/10/2023 12:00',
    data_hora_final: undefined,
    presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
    virtual_link: undefined,
    tematico_descricao: undefined,
    observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
    usuario: {
      id: '1',
      nome: 'Leandro Rebouças',
      email: 'contato@leandroreboucas.com',
      foto: 'https://github.com/leandroreboucas.png',
      data_nascimento: '24/08/1989',
      ativo: true,
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
    },
    arquivado: false,
    finalizado: false,
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
];
