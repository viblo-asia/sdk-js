import { AxiosPromise } from 'axios';
import { Question, QuestionFull, Answer, Request, PagedResource } from '../types/api';
export declare const all: (params?: Request | undefined) => Promise<PagedResource<Question>>;
export declare const getQuestion: (hashId: string) => Promise<QuestionFull>;
export declare const getAnswers: (hashId: string, params: Request) => Promise<PagedResource<Answer>>;
export declare const acceptAnswer: (answer: string, value: boolean) => AxiosPromise<any>;
export declare const postQuestion: (input: object) => AxiosPromise<any>;
export declare const getQuestionForEdit: (hashId: string) => AxiosPromise<any>;
export declare const update: (hashId: string, input: object) => AxiosPromise<any>;
export declare const deleteQuestion: (hashId: string) => AxiosPromise<any>;