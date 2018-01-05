import { AxiosPromise } from 'axios';
export declare const getApiKeys: () => Promise<any>;
export declare const createApiKey: (name: string) => AxiosPromise<any>;
export declare const revokeApiKey: (tokenId: string, password: string) => AxiosPromise<any>;
