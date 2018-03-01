import axios from './libs/axios';

export interface OAuthToken {
    token_type: string;
    access_token: string;
}

let currentToken: OAuthToken | null = null;

/**
 * Set current token and set the Authorization header for all requests.
 */
export function setAccessToken (token: OAuthToken) {
    currentToken = token;
    axios.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
}

/**
 * Get the current token.
 */
export const getCurrentToken = (): OAuthToken | null => currentToken ? ({ ...currentToken }) : null;
