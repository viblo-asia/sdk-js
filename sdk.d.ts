export interface OAuthConfig {
    client_id: string;
    client_secret: string;
}
export interface ConfigOption {
    oauth?: OAuthConfig;
}
export declare class Config {
    oauth?: OAuthConfig;
    constructor(options: ConfigOption);
}
export declare let config: Config;
export declare function init(options: ConfigOption): void;
export { default as axios } from './libs/axios';
