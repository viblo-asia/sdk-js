import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { VoteDir } from '../libs/voting';

export enum RateableType {
    Post = 'posts',
    Series = 'series',
    Question = 'questions',
    Answer = 'answers'
}

export const castVote = (type: RateableType, hashId: string, score: VoteDir) =>
    axios.post(`/comments/${hashId}/rate`, { score });
