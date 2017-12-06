import sdk from './sdk';
import axios from './libs/axios';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SocialLogin {
    service: string;
    service_id: string;
}

export interface OAuthToken {
    token_type: string;
    access_token: string;
}

export interface SocialUser {
    connected: boolean;
    service: string;
    token: string;
    social_user: {
        id: string;
        email: string;
        url: string;
        avatar_url: string;
    };
}

async function getOauthToken (params: object) {
    const oauthConfig = sdk.config!.oauth;

    if (oauthConfig) {
        const response = await axios.post('/oauth/token', {
            client_id: oauthConfig.client_id,
            client_secret: oauthConfig.client_secret,
            ...params
        }).then((response: any) => response.data);

        return {
            token_type: response.token_type,
            access_token: response.access_token
        };
    }

    return Promise.reject('Oauth client is not set');
}

export const login = (credentials: LoginCredentials): Promise<OAuthToken> =>
    getOauthToken({
        ...credentials,
        grant_type: 'password'
    });

export const socialLogin = (credentials: SocialLogin) =>
    getOauthToken({
        ...credentials,
        grant_type: 'social'
    });

export const getSocialUser = (provider: string, params: {code: string}): Promise<SocialUser> =>
    axios.get(`/social/${provider}/callback`, { params }).then(_ => _.data);

export function setAccessToken (token: OAuthToken) {
    axios.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
}

export default {
    login,
    socialLogin,
    getSocialUser,
    setAccessToken
};
