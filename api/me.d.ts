import { AxiosPromise } from 'axios';
import { Request, PagedResource } from '../types/api';
import { SubscribableType } from '../libs/interactions';
export interface UserSelf {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: Array<string>;
    roles: Array<string>;
    is_admin: boolean;
    reputation: number;
}
export interface UploadedFile {
    id: string;
    name: string;
    path: string;
}
export declare const self: () => Promise<UserSelf>;
export declare const getImages: (params?: Request | undefined) => Promise<PagedResource<UploadedFile>>;
export declare const deleteImage: (uuid: string) => AxiosPromise<any>;
export declare const getNotifications: (params?: object | undefined) => Promise<any>;
export declare const clearNotifications: () => Promise<any>;
export declare const getProfile: () => AxiosPromise<any>;
export declare const updateProfile: (input: object) => AxiosPromise<any>;
export declare const changePassword: (input: object) => AxiosPromise<any>;
export declare const getConnectedAccounts: () => Promise<any>;
export declare const disconnectSocialAccount: (service: string) => AxiosPromise<any>;
export declare const setSocialPrivacy: (service: string, value: boolean) => AxiosPromise<any>;
export declare const getNotificationSettings: () => Promise<any>;
export declare const setNotificationSettings: (name: string, value: boolean) => AxiosPromise<any>;
export declare const getServiceSettings: () => Promise<any>;
export declare const setServiceSettings: (name: string, value: boolean) => AxiosPromise<any>;
export declare function subscribe(type: SubscribableType, key: string, value: boolean): AxiosPromise<any>;
