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
export declare const login: (credentials: LoginCredentials) => Promise<OAuthToken>;
export declare const socialLogin: (credentials: SocialLogin) => Promise<{
    token_type: any;
    access_token: any;
}>;
export declare const getSocialUser: (provider: string, params: {
    code: string;
}) => Promise<SocialUser>;
/**
 * Set current token and set the Authorization header for all requests.
 */
export declare function setAccessToken(token: OAuthToken): void;
/**
 * Get the current token.
 */
export declare const getCurrentToken: () => OAuthToken | null;
