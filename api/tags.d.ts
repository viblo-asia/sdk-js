import { Post, Series, Question, UserItem, TagItem, Request, PagedResource } from '../types/api';
export declare const getTags: (params?: Request | undefined) => Promise<PagedResource<TagItem>>;
export declare const getTagInfo: (tag: any) => Promise<TagItem>;
export declare const getTagPosts: (tag: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getTagQuestions: (tag: string, params?: Request | undefined) => Promise<PagedResource<Question>>;
export declare const getTagSeries: (tag: string, params?: Request | undefined) => Promise<PagedResource<Series>>;
export declare const getTagFollowers: (tag: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
