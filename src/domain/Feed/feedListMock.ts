import {FeedDTO} from '../types';

export const feedListMock: FeedDTO[] = [
  {
    id: '2',
    codigo: 2,
    tipo: 'EVENTO_FINALIZADO',
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
    evento: {
      id: '1',
      codigo: 1,
      foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
      nome: 'Almoço comunitário',
      visibilidade: 'PUBLICO_GERAL',
      data_hora_inicio: '10/10/2023 12:00',
      data_hora_final: '10/10/2023 15:00',
      presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
      virtual_link: undefined,
      tematico_descricao: undefined,
      observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
      usuario_codigo: 1,
      // usuario: {
      //   id: '1',
      //   nome: 'Leandro Rebouças',
      //   email: 'contato@leandroreboucas.com',
      //   foto: 'https://github.com/leandroreboucas.png',
      //   data_nascimento: '24/08/1989',
      //   ativo: true,
      //   data_cadastro: '04/10/2023 11:02:03',
      //   data_atualizacao: '04/10/2023 11:02:03',
      // },
      // arquivado: false,
      // finalizado: true,
      // data_cadastro: '04/10/2023 11:02:03',
      // data_atualizacao: '04/10/2023 11:02:03',
    },
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },

  {
    id: '3',
    codigo: 3,
    tipo: 'POSTAGEM_AVULSA',
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
    titulo: 'O que é um almoço comunitário?',
    texto:
      'O acesso aos restaurantes populares é universal, ou seja, qualquer cidadão pode ser beneficiário do equipamento público. Contudo, a prioridade são os grupos populacionais específicos em situação de insegurança alimentar e nutricional e/ou vulnerabilidade social.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF3NbeICvF0m3yeJQsnMaT7F5LguwKhWroKg&usqp=CAU',
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
  {
    id: '6',
    codigo: 6,
    tipo: 'ATITUDE_REALIZADA',
    usuario: {
      id: '2',
      nome: 'Paulo André',
      email: 'paulo@bemhaja.org',
      foto: 'https://pps.whatsapp.net/v/t61.24694-24/377376856_864015291495693_3424546452086421321_n.jpg?ccb=11-4&oh=01_AdRv7F_VK7_JybaqhuHmU4TzjDbkEiUJer45iu_Hz96iSA&oe=65396E15&_nc_sid=000000&_nc_cat=111',
      data_nascimento: '10/08/1989',
      ativo: true,
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
      meta: {
        eventos: 33,
      },
    },
    evento_atitude_Finalizada: {
      id: '3',
      codigo: 3,
      tipo: 'AUDIO',
      titulo: undefined,
      texto: undefined,
      midia_link:
        'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
      evento: {
        id: '1',
        codigo: 1,
        foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
        nome: 'Almoço comunitário',
        visibilidade: 'PUBLICO_GERAL',
        data_hora_inicio: '10/10/2023 12:00',
        data_hora_final: undefined,
        presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
        virtual_link: undefined,
        tematico_descricao: undefined,
        observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
        usuario_codigo: 1,
        // usuario: {
        //   id: '1',
        //   nome: 'Leandro Rebouças',
        //   email: 'contato@leandroreboucas.com',
        //   foto: 'https://github.com/leandroreboucas.png',
        //   data_nascimento: '24/08/1989',
        //   ativo: true,
        //   data_cadastro: '04/10/2023 11:02:03',
        //   data_atualizacao: '04/10/2023 11:02:03',
        // },
        // arquivado: false,
        // finalizado: false,
        // data_cadastro: '04/10/2023 11:02:03',
        // data_atualizacao: '04/10/2023 11:02:03',

        participantes: 10,
      },
      usuario: {
        id: '2',
        nome: 'Paulo André',
        email: 'paulo@bemhaja.org',
        foto: 'https://pps.whatsapp.net/v/t61.24694-24/377376856_864015291495693_3424546452086421321_n.jpg?ccb=11-4&oh=01_AdRv7F_VK7_JybaqhuHmU4TzjDbkEiUJer45iu_Hz96iSA&oe=65396E15&_nc_sid=000000&_nc_cat=111',
        data_nascimento: '10/08/1989',
        ativo: true,
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
        meta: {
          eventos: 33,
        },
      },
      atitude: {
        id: '2',
        codigo: 2,
        aprovado: true,
        ativo: true,
        descricao: 'Entrevista com participante do evento',
        descricao_espanhol: 'Preparar la ensalada',
        descricao_ingles: 'Grabar vídeo para redes sociales.',
        atitude_grupo: {
          id: '1',
          codigo: 1,
          ativo: true,
          descricao: 'Geral',
          descricao_espanhol: 'General',
          descricao_ingles: 'General',
          data_cadastro: '04/10/2023 11:02:03',
          data_atualizacao: '04/10/2023 11:02:03',
        },
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
      },
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
    },
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
  {
    id: '5',
    codigo: 5,
    tipo: 'ATITUDE_REALIZADA',
    usuario: {
      id: '3',
      nome: 'Leonardo Fagnani',
      email: 'leonardo@bemhaja.org',
      foto: 'https://pps.whatsapp.net/v/t61.24694-24/370558001_1467320294068741_4549773517490779992_n.jpg?ccb=11-4&oh=01_AdSRCuIArgAIAn7J55jEHA1aGOD2D9BtPtlX417aac_TsA&oe=6536A51C&_nc_sid=000000&_nc_cat=111',
      data_nascimento: '10/06/1989',
      ativo: true,
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
      meta: {
        eventos: 26,
      },
    },
    evento_atitude_Finalizada: {
      id: '1',
      codigo: 1,
      tipo: 'VIDEO',
      titulo: undefined,
      texto: undefined,
      midia_link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      evento: {
        id: '1',
        codigo: 1,
        foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
        nome: 'Almoço comunitário',
        visibilidade: 'PUBLICO_GERAL',
        data_hora_inicio: '10/10/2023 12:00',
        data_hora_final: undefined,
        presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
        virtual_link: undefined,
        tematico_descricao: undefined,
        observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
        usuario_codigo: 1,
        // usuario: {
        //   id: '1',
        //   nome: 'Leandro Rebouças',
        //   email: 'contato@leandroreboucas.com',
        //   foto: 'https://github.com/leandroreboucas.png',
        //   data_nascimento: '24/08/1989',
        //   ativo: true,
        //   data_cadastro: '04/10/2023 11:02:03',
        //   data_atualizacao: '04/10/2023 11:02:03',
        // },
        // arquivado: false,
        // finalizado: false,
        // data_cadastro: '04/10/2023 11:02:03',
        // data_atualizacao: '04/10/2023 11:02:03',

        participantes: 10,
      },
      usuario: {
        id: '3',
        nome: 'Leonardo Fagnani',
        email: 'leonardo@bemhaja.org',
        foto: 'https://pps.whatsapp.net/v/t61.24694-24/370558001_1467320294068741_4549773517490779992_n.jpg?ccb=11-4&oh=01_AdSRCuIArgAIAn7J55jEHA1aGOD2D9BtPtlX417aac_TsA&oe=6536A51C&_nc_sid=000000&_nc_cat=111',
        data_nascimento: '10/06/1989',
        ativo: true,
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
        meta: {
          eventos: 26,
        },
      },
      atitude: {
        id: '2',
        codigo: 2,
        aprovado: true,
        ativo: true,
        descricao: 'Gravar vídeo para redes sociais',
        descricao_espanhol: 'Preparar la ensalada',
        descricao_ingles: 'Grabar vídeo para redes sociales.',
        atitude_grupo: {
          id: '1',
          codigo: 1,
          ativo: true,
          descricao: 'Geral',
          descricao_espanhol: 'General',
          descricao_ingles: 'General',
          data_cadastro: '04/10/2023 11:02:03',
          data_atualizacao: '04/10/2023 11:02:03',
        },
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
      },
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
    },
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
  {
    id: '4',
    codigo: 4,
    tipo: 'ATITUDE_REALIZADA',
    usuario: {
      id: '3',
      nome: 'Leonardo Fagnani',
      email: 'leonardo@bemhaja.org',
      foto: 'https://pps.whatsapp.net/v/t61.24694-24/370558001_1467320294068741_4549773517490779992_n.jpg?ccb=11-4&oh=01_AdSRCuIArgAIAn7J55jEHA1aGOD2D9BtPtlX417aac_TsA&oe=6536A51C&_nc_sid=000000&_nc_cat=111',
      data_nascimento: '10/06/1989',
      ativo: true,
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
      meta: {
        eventos: 26,
      },
    },
    evento_atitude_Finalizada: {
      id: '1',
      codigo: 1,
      tipo: 'IMAGE',
      titulo: 'Minha experiência',
      texto: `Eu tinha a responsabilidade de preparar a salada, um componente essencial para qualquer refeição comunitária.
Decidi fazer uma salada colorida e nutritiva, que pudesse agradar a todos. Comecei escolhendo os ingredientes no mercado local: alface crespa, rúcula, tomates cereja, cenouras, pepinos, pimentões de várias cores e abacate. Para dar um toque especial, adicionei nozes torradas, queijo feta e um mix de sementes.
Ao chegar em casa, lavei cuidadosamente todos os vegetais e comecei a cortá-los. A alface foi rasgada com as mãos para dar uma textura mais agradável. Os tomates cereja foram cortados ao meio, as cenouras em finas tiras, os pepinos em rodelas e os pimentões em pequenos cubos. O abacate foi cortado em fatias finas.
Para o molho, decidi preparar um vinagrete simples, mas saboroso: azeite de oliva, vinagre balsâmico, mostarda dijon, mel, sal e pimenta. Misturei tudo em um pequeno frasco e agitei bem até ficar homogêneo.
No parque, enquanto as pessoas montavam as mesas e organizavam os outros pratos, despejei os ingredientes da salada em uma grande tigela de vidro. Misturei delicadamente, tentando preservar a integridade de cada ingrediente. Finalizei com o vinagrete, as nozes, o queijo feta e as sementes por cima.
A reação foi incrível. As cores vivas da salada atraíram muitos olhares e logo todos estavam servindo-se. Recebi muitos elogios, especialmente pela combinação de sabores e texturas. Foi um momento de conexão, onde a comida serviu como uma ponte para unir a comunidade.
No final do dia, percebi que, às vezes, os pratos mais simples são os que mais tocam o coração das pessoas. E a sensação de contribuir para a felicidade de todos foi imensamente gratificante.
Espero que tenha gostado da narrativa! Se precisar de mais detalhes ou outra história, é só pedir.`,
      midia_link:
        'https://img.freepik.com/fotos-gratis/salada-de-tomate-pepino-cebola-roxa-e-folhas-de-alface-menu-de-vitamina-verao-saudavel-comida-vegetal-vegana-mesa-de-jantar-vegetariana-vista-do-topo-configuracao-plana_2829-6482.jpg?size=626&ext=jpg&ga=GA1.1.2064557111.1697396826&semt=sph',
      evento: {
        id: '1',
        codigo: 1,
        foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
        nome: 'Almoço comunitário',
        visibilidade: 'PUBLICO_GERAL',
        data_hora_inicio: '10/10/2023 12:00',
        data_hora_final: undefined,
        presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
        virtual_link: undefined,
        tematico_descricao: undefined,
        observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
        // usuario: {
        //   id: '1',
        //   nome: 'Leandro Rebouças',
        //   email: 'contato@leandroreboucas.com',
        //   foto: 'https://github.com/leandroreboucas.png',
        //   data_nascimento: '24/08/1989',
        //   ativo: true,
        //   data_cadastro: '04/10/2023 11:02:03',
        //   data_atualizacao: '04/10/2023 11:02:03',
        // },
        // arquivado: false,
        // finalizado: false,
        // data_cadastro: '04/10/2023 11:02:03',
        // data_atualizacao: '04/10/2023 11:02:03',

        participantes: 10,
      },
      usuario: {
        id: '3',
        nome: 'Leonardo Fagnani',
        email: 'leonardo@bemhaja.org',
        foto: 'https://pps.whatsapp.net/v/t61.24694-24/370558001_1467320294068741_4549773517490779992_n.jpg?ccb=11-4&oh=01_AdSRCuIArgAIAn7J55jEHA1aGOD2D9BtPtlX417aac_TsA&oe=6536A51C&_nc_sid=000000&_nc_cat=111',
        data_nascimento: '10/06/1989',
        ativo: true,
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
        meta: {
          eventos: 26,
        },
      },
      atitude: {
        id: '1',
        codigo: 1,
        aprovado: true,
        ativo: true,
        descricao: 'Prepararo da salada',
        descricao_espanhol: 'Preparar la ensalada',
        descricao_ingles: 'Prepare the salad',
        atitude_grupo: {
          id: '1',
          codigo: 1,
          ativo: true,
          descricao: 'Geral',
          descricao_espanhol: 'General',
          descricao_ingles: 'General',
          data_cadastro: '04/10/2023 11:02:03',
          data_atualizacao: '04/10/2023 11:02:03',
        },
        data_cadastro: '04/10/2023 11:02:03',
        data_atualizacao: '04/10/2023 11:02:03',
      },
      data_cadastro: '04/10/2023 11:02:03',
      data_atualizacao: '04/10/2023 11:02:03',
    },
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
  {
    id: '1',
    codigo: 1,
    tipo: 'EVENTO_CRIADO',
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
    evento: {
      id: '1',
      codigo: 1,
      foto: 'https://img.freepik.com/fotos-premium/voluntariado-em-um-evento-comunitario_670382-32923.jpg?w=2000',
      nome: 'Almoço comunitário',
      visibilidade: 'PUBLICO_GERAL',
      data_hora_inicio: '10/10/2023 12:00',
      data_hora_final: undefined,
      presencial_endereco: 'Praça do Saber 20 A, Centro - São Paulo',
      virtual_link: undefined,
      tematico_descricao: undefined,
      observacoes: 'Venha fazer parte desse lindo gesto de amor ao próximo',
      usuario_codigo: 1,
      // usuario: {
      //   id: '1',
      //   nome: 'Leandro Rebouças',
      //   email: 'contato@leandroreboucas.com',
      //   foto: 'https://github.com/leandroreboucas.png',
      //   data_nascimento: '24/08/1989',
      //   ativo: true,
      //   data_cadastro: '04/10/2023 11:02:03',
      //   data_atualizacao: '04/10/2023 11:02:03',
      // },
      // arquivado: false,
      // finalizado: false,
      // data_cadastro: '04/10/2023 11:02:03',
      // data_atualizacao: '04/10/2023 11:02:03',

      participantes: 10,
    },
    data_cadastro: '04/10/2023 11:02:03',
    data_atualizacao: '04/10/2023 11:02:03',
  },
];
