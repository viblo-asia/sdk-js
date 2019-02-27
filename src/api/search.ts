import axios from '../libs/axios';
import { PagedResource } from '../types/api';

export enum SearchType {
    Post = 'posts',
    Question = 'questions'
}

interface SearchRequest {
    q: string;
    s: string;
    o: string;
}

interface SearchResult {
    highlights: {
        title: string[];
        contents: string[];
        code: string[];
    };
}

export const search = (type: SearchType, params: SearchRequest): Promise<PagedResource<SearchResult>> =>
    axios.get(`/search/${type}`, { params }).then(_ => _.data);

export const multisearch = (searchQuery: string, params?: Object) => axios.get('/search/multi', {
    params: {
        q: searchQuery,
        ...params
    }
}).then(_ => _.data);

export const searchUserToRequest = (params: SearchRequest) => axios.get(`/search-users`, { params }).then(_ => _.data);
