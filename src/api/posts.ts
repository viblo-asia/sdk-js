import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import {
    Post,
    PostFull,
    Request,
    PagedResource
} from '../types/api';

export const all = (params?: Request): Promise<PagedResource<Post>> =>
    axios.get('/posts', { params }).then(_ => _.data);

export const getPost = (hashId: string): Promise<PostFull> => axios.get(`/posts/${hashId}`).then(_ => _.data);
export const deletePost = (hashId: string) => axios.delete(`/api/posts/${hashId}`);
