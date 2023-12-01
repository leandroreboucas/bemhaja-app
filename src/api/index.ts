import { AuthCredentialsAPI, authService } from '@domain';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.bemhaja.org',
    headers: {},
});

interface InteceptorProps {
    authCredentials: AuthCredentialsAPI | null;
    saveCredentials: (authCredentials: AuthCredentialsAPI) => Promise<void>;
    removeCredentials: () => Promise<void>;
}

export function registerInterceptor({
    authCredentials,
    saveCredentials,
    removeCredentials,
}: InteceptorProps) {
    const interceptor = api.interceptors.response.use(
        response => response,
        async error => {
            const failedRequest = error.config;
            if (error.response.status === 401) {
                if (
                    !authCredentials?.refreshToken ||
                    authService.isRefreshTokenRequest(failedRequest) ||
                    failedRequest.sent
                ) {
                    await removeCredentials();
                    return Promise.reject(error);
                }
                failedRequest.sent = true;
                api.defaults.headers.common.Authorization = `Bearer ${authCredentials.refreshToken}`;
                const newAuthCredentials = await authService.refreshToken();
                await saveCredentials(newAuthCredentials);
                failedRequest.headers[
                    'Authorization'
                ] = `Bearer ${newAuthCredentials.token}`;
                return api(failedRequest);
            }
            return Promise.reject(error);
        },
    );
    return () => api.interceptors.response.eject(interceptor);
}
