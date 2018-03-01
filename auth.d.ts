export interface OAuthToken {
    token_type: string;
    access_token: string;
}
/**
 * Set current token and set the Authorization header for all requests.
 */
export declare function setAccessToken(token: OAuthToken): void;
/**
 * Get the current token.
 */
export declare const getCurrentToken: () => OAuthToken | null;
