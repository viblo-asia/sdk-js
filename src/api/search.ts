import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { PagedResource } from '../types/api';

export enum SearchType {
    Post = 'posts',
    Question = 'questions'
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

export const search = (type: SearchType, params: SearchRequest): Promise<PagedResource<SearchResult>> =>
    axios.get(`/search/${type}`, { params }).then(_ => _.data);

export const multisearch = (params: {q: string}) => axios.get('/search/multi', { params }).then(_ => _.data);
