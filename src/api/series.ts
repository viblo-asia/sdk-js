import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { Series, SeriesFull, Post, Request, PagedResource } from '../types/api';

export const all = (params?: Request): Promise<PagedResource<Series>> =>
    axios.get('/series', { params }).then(_ => _.data);

export const getSeries = (hashId: string): Promise<SeriesFull> =>
    axios.get(`/series/${hashId}`).then(_ => _.data);

export const createSeries = (values: object) => axios.post('/series', values);
export const edit = (hashId: string) => axios.get(`/series/${hashId}/edit`).then(_ => _.data);
export const update = (hashId: string, values: object) => axios.put(`/series/${hashId}`, values);
export const deleteSeries = (hashId: string) => axios.delete(`/series/${hashId}`);

export const getPosts = (hashId: string, params?: Request): Promise<PagedResource<Post>> =>
    axios.get(`/series/${hashId}/posts`).then(_ => _.data);

export const addPost = (postId: string, series: string) =>
    axios.put(`/api/series/${series}/addPost`, { post_id: postId });

export const removePost = (postId: string, series: string) =>
    axios.put(`/api/series/${series}/removePost`, { post_id: postId });

export const movePostBefore = (nextPostId: string, postId: string, series: string) =>
    axios.put(`/api/series/${series}/movePostBefore`, {
        next_post_id: nextPostId,
        post_id: postId
    });
