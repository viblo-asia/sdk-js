import { OAuthToken } from './auth';

export interface OAuthConfig {
    client_id: string;
    client_secret: string;
}

export interface ConfigOption {
    oauth?: OAuthConfig;
}

export class Config {
    oauth?: OAuthConfig;

    constructor (options: ConfigOption) {
        this.oauth = options.oauth;
    }
}

export let config: Config;

export function init(options: ConfigOption) {
    config = new Config(options);
}

export { default as axios } from './libs/axios';
