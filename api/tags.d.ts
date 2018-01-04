import { Post, Series, Question, UserItem, TagItem, Request, PagedResource } from '../types/api';
export declare const all: (params?: Request | undefined) => Promise<PagedResource<TagItem>>;
export declare const getPosts: (tag: string, params?: Request | undefined) => Promise<PagedResource<Post>>;
export declare const getQuestions: (tag: string, params?: Request | undefined) => Promise<PagedResource<Question>>;
export declare const getSeries: (tag: string, params?: Request | undefined) => Promise<PagedResource<Series>>;
export declare const getFollowers: (tag: string, params?: Request | undefined) => Promise<PagedResource<UserItem>>;
