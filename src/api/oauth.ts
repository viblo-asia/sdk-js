import axios from '../libs/axios';
import { AxiosPromise } from 'axios';

export const getApiKeys = () => axios.get('/oauth/personal-access-tokens').then(_ => _.data);

export const getScopes = () => axios.get('/oauth/scopes').then(_ => _.data);

export const createApiKey = (name: string) => axios.post('/oauth/personal-access-tokens', { name });

export const revokeApiKey = (tokenId: string, password: string) =>
    axios.post(`/oauth/tokens/${tokenId}/revoke`, { password });
