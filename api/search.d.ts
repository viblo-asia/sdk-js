import { PagedResource } from '../types/api';
export declare enum SearchType {
    Post = "posts",
    Question = "questions",
}
export interface SearchRequest {
    q: string;
    s: string;
    o: string;
}
export interface SearchResult {
    highlights: {
        title: Array<string>;
        contents: Array<string>;
        code: Array<string>;
    };
}
export declare const search: (type: SearchType, params: SearchRequest) => Promise<PagedResource<SearchResult>>;
export declare const multisearch: (params: {
    q: string;
}) => Promise<any>;
