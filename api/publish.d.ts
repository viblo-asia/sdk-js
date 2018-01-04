import { AxiosPromise } from 'axios';
export interface PostEdit {
}
export declare const getPostForEdit: (hashId: string) => Promise<PostEdit>;
export declare const saveRevision: (hashId: string, input: object) => AxiosPromise<any>;
export declare const publish: (input: object) => AxiosPromise<any>;
