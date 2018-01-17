import axios from '../libs/axios';
import { AxiosPromise } from 'axios';

export const linkUserWithSameEmail = (provider: string, accessToken: string) =>
    axios.post(`/social/${provider}/identities`, { token: accessToken });

export const getConnectedUser = (provider: string, socialAccountID: string) =>
    axios.get(`/social/${provider}/user`, { params: { id: socialAccountID } });
