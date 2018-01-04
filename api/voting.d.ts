import { AxiosPromise } from 'axios';
import { RateableType, VoteDir } from '../libs/interactions';
export declare const castVote: (type: RateableType, hashId: string, score: VoteDir) => AxiosPromise<any>;
