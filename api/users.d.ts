import { Post, Series, Question, UserItem, TagItem, SocialAccount, Request, PagedResource } from '../types/api';
export interface Profile extends UserItem {
    social_accounts: SocialAccount[];
}
export declare const getProfile: (username: string, params?: object | undefined) => Promise<Profile>;
export declare const getUserPosts: (username: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getUserClips: (username: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getUserQuestions: (username: string, params?: Request | undefined) => Promise<PagedResource<Question>>;
export declare const getUserSeries: (username: string, params?: Request | undefined) => Promise<PagedResource<Series>>;
export declare const getUserFollowers: (username: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
export declare const getUserFollowings: (username: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
export declare const getUserFollowingTags: (username: string, params?: Request | undefined) => Promise<PagedResource<TagItem>>;
