import { Post, Series, Question, UserItem, TagItem, SocialAccount, Request, PagedResource } from '../types/api';
export interface Profile extends UserItem {
    social_accounts: Array<SocialAccount>;
}
export declare const getProfile: (username: string, params?: object | undefined) => Promise<Profile>;
export declare const getPosts: (username: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getClips: (username: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getQuestions: (username: string, params?: Request | undefined) => Promise<PagedResource<Question>>;
export declare const getSeries: (username: string, params?: Request | undefined) => Promise<PagedResource<Series>>;
export declare const getFollowers: (username: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
export declare const getFollowings: (username: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
export declare const getFollowingTags: (username: string, params?: Request | undefined) => Promise<PagedResource<TagItem>>;
