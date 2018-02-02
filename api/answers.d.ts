import { AxiosPromise } from 'axios';
export declare const getAnswer: (answer: string) => AxiosPromise<any>;
export declare const postAnswer: (question: string, values: object) => AxiosPromise<any>;
export declare const updateAnswer: (hashId: string, values: object) => AxiosPromise<any>;
export declare const deleteAnswer: (hashId: string) => AxiosPromise<any>;
