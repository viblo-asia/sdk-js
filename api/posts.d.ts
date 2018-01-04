import { AxiosPromise } from 'axios';
import { Post, PostFull, Request, PagedResource } from '../types/api';
export declare const all: (params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getPost: (hashId: string) => Promise<PostFull>;
export declare const deletePost: (hashId: string) => AxiosPromise<any>;
