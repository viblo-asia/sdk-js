import { OAuthToken } from './auth';

export interface OAuthConfig {
    client_id: string;
    client_secret: string;
}

export interface ConfigOption {
    baseUrl?: string;
    oauth?: OAuthConfig;
}

export class Config {
    baseUrl: string = 'https://api.viblo.asia';
    oauth?: OAuthConfig;

    constructor (options: ConfigOption) {
        this.oauth = options.oauth;
        this.baseUrl = options.baseUrl || this.baseUrl;
    }
}

export let config: Config;

export function init (options: ConfigOption) {
    config = new Config(options);
}
