import axios from '../libs/axios';
import {
    Post,
    Series,
    Question,
    UserItem,
    TagItem,
    Request,
    PagedResource
} from '../types/api';

export const all = (params?: Request): Promise<PagedResource<TagItem>> =>
    axios.get('tags', { params }).then(_ => _.data);

const associatedResource = <T> (type: string) =>
    (tag: string, params?: Request): Promise<PagedResource<T>> =>
        axios.get(`/tags/${tag}/${type}`, { params }).then(_ => _.data);

export const getPosts = associatedResource<Post>('posts');
export const getQuestions = associatedResource<Question>('questions');
export const getSeries = associatedResource<Series>('series');
export const getFollowers = associatedResource<UserItem>('followers');
