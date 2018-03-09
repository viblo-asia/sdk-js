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
        title: string[];
        contents: string[];
        code: string[];
    };
}
export declare const search: (type: SearchType, params: SearchRequest) => Promise<PagedResource<SearchResult>>;
export declare const multisearch: (searchQuery: string, params?: Object | undefined) => Promise<any>;
