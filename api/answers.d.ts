import { AxiosPromise } from 'axios';
export declare const postAnswer: (question: string, values: object) => AxiosPromise<any>;
export declare const update: (hashId: string, values: object) => AxiosPromise<any>;
export declare const destroy: (hashId: string) => AxiosPromise<any>;
