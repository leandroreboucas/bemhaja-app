export interface AuthCredentialsAPI {
    token: string;
    refreshToken: string;
    user: {
        foto: string;
        nome: string;
        email: string;
        adm: boolean;
    };
}

export interface SignUpDataAPI {
    nome: string;
    email: string;
    data_nascimento: string;
    senha: string;
    adm: boolean;
}

export interface SignUpData {
    foto?: string | null;
    nome: string;
    email: string;
    data_nascimento: string;
    senha: string;
    adm: boolean;
}

export interface UserResponseRegister {
    id: string | null;
    codigo: number | null;
    foto: string | null;
    nome: string;
    email: string;
    data_nascimento: string;
    senha: string | null;
    adm: boolean;
    token_facebook: string | null;
    token_google: string | null;
    token_apple: string | null;
    token_onesignal: string | null;
    regra_classificacao_codigo: number | null;
    ativo: boolean;
    data_cadastro: string;
    data_atualizacao: string | null;
}
