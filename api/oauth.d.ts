export declare const getApiKeys: () => Promise<any>;
export declare const createApiKey: (name: string) => Promise<any>;
export declare const revokeApiKey: (tokenId: string, password: string) => import("axios").AxiosPromise<any>;
