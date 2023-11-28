export interface Usuario {
    id: string;
    codigo?: string;
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
