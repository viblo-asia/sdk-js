import { AxiosPromise } from 'axios';
import { Post, PostFull, Request, PagedResource } from '../types/api';
export declare enum PostFeedType {
    Newest = "newest",
    Trending = "trending",
    Following = "followings",
    Clipped = "clips",
    Featured = "editors-choice",
}
export declare const getPostsFeed: (feed: PostFeedType, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getPost: (hashId: string) => Promise<PostFull>;
export declare const deletePost: (hashId: string) => AxiosPromise<any>;
