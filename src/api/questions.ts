import axios from '../libs/axios';
import {
    Question,
    QuestionFull,
    Answer,
    Request,
    PagedResource
} from '../types/api';

export enum QuestionFeedType {
    Newest = 'newest',
    Unsolved = 'unsolved',
    Unanswered = 'unanswered',
    Following = 'followings',
    Clipped = 'clips'
}

export const getQuestionsFeed = (feed: QuestionFeedType, params?: Request): Promise<PagedResource<Question>> =>
    axios.get('/questions', { params: { feed, ...params } }).then(_ => _.data);

export const getQuestion = (hashId: string): Promise<QuestionFull> =>
    axios.get(`/questions/${hashId}`).then(_ => _.data);

export const getAnswers = (hashId: string, params: Request): Promise<PagedResource<Answer>> =>
    axios.get(`/questsions/${hashId}/answers`, { params }).then(_ => _.data);

export const acceptAnswer = (answer: string, value: boolean) => axios.put(`/answers/${answer}/accept`, { value });

export const postQuestion = (input: object) => axios.post('/questions', input);
export const getQuestionForEdit = (hashId: string) => axios.get(`/questions/${hashId}/edit`);
export const updateQuestion = (hashId: string, input: object) => axios.put(`/questions/${hashId}`, input);
export const deleteQuestion = (hashId: string) => axios.delete(`/questions/${hashId}`);
