import axios from '../libs/axios';

export const getAnswer = (answer: string) =>
    axios.get(`/answers/${answer}`);

export const postAnswer = (question: string, values: object) =>
    axios.post(`/questions/${question}/answers`, values);

export const updateAnswer = (hashId: string, values: object) =>
    axios.put(`/answers/${hashId}`, values);

export const deleteAnswer = (hashId: string) => axios.delete(`/answers/${hashId}`);
