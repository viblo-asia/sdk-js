import { AxiosPromise } from 'axios';
export interface PostEdit {
}
export declare const getPostForEdit: (hashId: string) => Promise<PostEdit>;
export declare const savePostRevision: (input: object) => AxiosPromise<any>;
export declare const saveAsDraft: (input: object) => AxiosPromise<any>;
export declare const saveAndPublish: (input: object) => AxiosPromise<any>;
