import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { Request } from '../types/api';

export interface PostEdit {

}

export const getPostForEdit = (hashId: string): Promise<PostEdit> =>
    axios.get(`/posts/${hashId}/edit`).then(_ => _.data);

export const saveRevision = (hashId: string, input: object) => axios.put(`/posts/${hashId}/revisions`, input);
export const publish = (input: object) => axios.post('/publish/post', input);
