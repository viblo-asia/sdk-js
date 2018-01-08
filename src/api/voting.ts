import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import { RateableType, VoteDir } from '../libs/interactions';

export const castVote = (type: RateableType, hashId: string, score: VoteDir) =>
    axios.post(`/${type}/${hashId}/rate`, { score });
