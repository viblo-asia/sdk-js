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

export const getTags = (params?: Request): Promise<PagedResource<TagItem>> =>
    axios.get('tags', { params }).then(_ => _.data);

export const getTagInfo = (tag): Promise<TagItem> => axios.get(`/tags/${tag}`).then(_ => _.data.data);

const associatedResource = <T> (type: string) =>
    (tag: string, params?: Request): Promise<PagedResource<T>> =>
        axios.get(`/tags/${tag}/${type}`, { params }).then(_ => _.data);

export const getTagPosts = associatedResource<Post>('posts');
export const getTagQuestions = associatedResource<Question>('questions');
export const getTagSeries = associatedResource<Series>('series');
export const getTagFollowers = associatedResource<UserItem>('followers');
