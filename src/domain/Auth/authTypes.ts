export interface AuthCredentialsAPI {
    token: string;
    user: {
        foto: string;
        nome: string;
        email: string;
        adm: boolean;
    };
}
