import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { VoteDir } from '../libs/voting';
import { PagedResource } from '../types/api';

export interface Comment {
    id: number;
    hash_id: string;
    user_id: number;
    contents: string;
    level: number;
    points: number;
    rated_value: number | null;
    commentable_type: string;
    commentable_id: number;
    in_reply_to_comment: number | null;
    in_reply_to_user: number | null;
    created_at: string;
    updated_at: string;
}

export interface CommentInput {
    comment_contents: string;
    ancestor_id: number;
}

export enum CommentableType {
    Post = 'posts',
    Series = 'series',
    Question = 'questions',
    Answer = 'answers'
}

export const getComments = (commentableType: CommentableType, hashId: string): Promise<PagedResource<Comment>> =>
    axios.get(`/${commentableType}/${hashId}/comments`).then(_ => _.data);

export const store = (commentableType: CommentableType, hashId: string, input: CommentInput) =>
    axios.post(`/${commentableType}/${hashId}/comments`, input);

export const update = (hashId: string, input: {comment_contents: string}) =>
    axios.put(`/comments/${hashId}`, input);

export const destroy = (hashId: string) => axios.delete(`/comments/${hashId}`);
