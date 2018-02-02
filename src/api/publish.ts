import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { Request } from '../types/api';

export interface PostEdit {

}

export const getPostForEdit = (hashId: string): Promise<PostEdit> =>
    axios.get(`/posts/${hashId}/edit`).then(_ => _.data);

export const savePostRevision = (input: object) =>
    axios.post(`/publish/post/autosave`, input);

export const saveAsDraft = savePostRevision;

export const saveAndPublish = (input: object) =>
    axios.post('/publish/post', input);
