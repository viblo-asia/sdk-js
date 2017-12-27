import axios from '../libs/axios';
import { AxiosPromise } from 'axios';
import {
    Post,
    Series,
    Question,
    UserItem,
    TagItem,
    SocialAccount,
    Request,
    PagedResource
} from '../types/api';

export interface Profile extends UserItem {
    social_accounts: Array<SocialAccount>;
}

export const getProfile = (username: string, params?: object): Promise<Profile> =>
    axios.get(`/users/${username}`, { params }).then(_ => _.data);

const associatedResource = <T> (type: string) =>
    (username: string, params?: Request): Promise<PagedResource<T>> =>
        axios.get(`/users/${username}/${type}`, { params }).then(_ => _.data);

export const getPosts = associatedResource<Post>('posts');
export const getClips = associatedResource<Post>('clips');
export const getQuestions = associatedResource<Question>('questions');
export const getSeries = associatedResource<Series>('series');
export const getFollowers = associatedResource<UserItem>('followers');
export const getFollowings = associatedResource<UserItem>('followings');
export const getFollowingTags = associatedResource<TagItem>('following-tags');
