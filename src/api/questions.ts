import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import {
    Question,
    QuestionFull,
    Answer,
    Request,
    PagedResource
} from '../types/api';

export const all = (params?: Request): Promise<PagedResource<Question>> =>
    axios.get('/questions', { params }).then(_ => _.data);

export const getQuestion = (hashId: string): Promise<QuestionFull> =>
    axios.get(`/questions/${hashId}`).then(_ => _.data);

export const getAnswers = (hashId: string, params: Request): Promise<PagedResource<Answer>> =>
    axios.get(`/questsions/${hashId}/answers`, { params }).then(_ => _.data);

export const acceptAnswer = (answer: string, value: boolean) => axios.put(`/answers/${answer}/accept`, { value });

export const postQuestion = (input: object) => axios.post('/questions', input);
export const getQuestionForEdit = (hashId: string) => axios.get(`/questions/${hashId}/edit`);
export const update = (hashId: string, input: object) => axios.put(`/questions/${hashId}`, input);
export const deleteQuestion = (hashId: string) => axios.delete(`/questions/${hashId}`);
