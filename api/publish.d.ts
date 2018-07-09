interface PostEdit {
}
export declare const getPostForEdit: (hashId: string) => Promise<PostEdit>;
export declare const savePostRevision: (input: object) => import("axios").AxiosPromise<any>;
export declare const saveAsDraft: (input: object) => import("axios").AxiosPromise<any>;
export declare const saveAndPublish: (input: object) => import("axios").AxiosPromise<any>;
export {};
