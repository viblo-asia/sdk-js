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
    social_accounts: SocialAccount[];
}

export const getProfile = (username: string, params?: object): Promise<Profile> =>
    axios.get(`/users/${username}`, { params }).then(_ => _.data);

const associatedResource = <T> (type: string) =>
    (username: string, params?: Request): Promise<PagedResource<T>> =>
        axios.get(`/users/${username}/${type}`, { params }).then(_ => _.data);

export const getUserPosts = associatedResource<Post>('posts');
export const getUserClips = associatedResource<Post>('clips');
export const getUserQuestions = associatedResource<Question>('questions');
export const getUserSeries = associatedResource<Series>('series');
export const getUserFollowers = associatedResource<UserItem>('followers');
export const getUserFollowings = associatedResource<UserItem>('followings');
export const getUserFollowingTags = associatedResource<TagItem>('following-tags');
