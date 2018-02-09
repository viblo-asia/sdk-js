import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import {
    Post,
    PostFull,
    Request,
    PagedResource
} from '../types/api';

export enum PostFeedType {
    Newest = 'newest',
    Trending = 'trending',
    Following = 'followings',
    Clipped = 'clips',
    Featured = 'editors-choice'
}

export const getPostsFeed = (feed: PostFeedType, params?: Request): Promise<PagedResource<Post>> =>
    axios.get(`/posts/${feed}`, { params }).then(_ => _.data);

export const getPost = (hashId: string): Promise<PostFull> => axios.get(`/posts/${hashId}`).then(_ => _.data.post);
export const deletePost = (hashId: string) => axios.delete(`/posts/${hashId}`);
