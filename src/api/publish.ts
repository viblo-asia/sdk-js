import axios from '../libs/axios';

interface PostEdit {

}

export const getPostForEdit = (hashId: string): Promise<PostEdit> =>
    axios.get(`/posts/${hashId}/edit`).then(_ => _.data);

export const savePostRevision = (input: object) =>
    axios.post('/publish/post/autosave', input);

export const saveAsDraft = savePostRevision;

export const saveAndPublish = (input: object) =>
    axios.post('/publish/post', input);
