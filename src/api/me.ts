import axios from '../libs/axios';
import { Request, PagedResource } from '../types/api';
import { SubscribableType } from '../libs/interactions';

interface UserSelf {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: string[];
    roles: string[];
    is_admin: boolean;
    reputation: number;
}

interface UploadedFile {
    id: string;
    name: string;
    path: string;
}

export const self = (): Promise<UserSelf> => axios.get('/me').then(_ => _.data);

// Draft contents

export const getDrafts = params => axios.get('/me/contents/drafts', { params }).then(_ => _.data);

// Uploaded files
export const getImages = (params?: Request): Promise<PagedResource<UploadedFile>> =>
    axios.get('/me/images', { params }).then(_ => _.data);

export const deleteImage = (uuid: string) => axios.delete(`/me/images/${uuid}`);

// Notifications
export const getNotifications = (params?: object) => axios.get('/me/notifications', { params }).then(_ => _.data);
export const clearNotifications = (params?: object): Promise<any> => axios.post('/me/notifications/clear', { params });

// Profile
export const getProfile = () => axios.get('/me/settings/profile').then(_ => _.data);
export const updateProfile = (input: object) => axios.post('/me/settings/profile', input);

export const changePassword = (input: object) => axios.put('/me/settings/password', input);

export const getConnectedAccounts = () => axios.get('/me/settings/socials').then(_ => _.data);
export const disconnectSocialAccount = (service: string) => axios.delete(`/social/${service}/disconnect`);
export const setSocialPrivacy = (service: string , value: boolean) =>
    axios.put('/me/settings/socialPrivacy', { service, value });

export const getNotificationSettings = () => axios.get('/me/settings/notification').then(_ => _.data);
export const getServiceSettings = () => axios.get('/me/settings/service').then(_ => _.data);

export const updateSettings = (name, value) => axios.put('/me/settings', { [name]: value });

// Subscriptions
export function subscribe(type: SubscribableType, key: string, value: boolean) {
    const url = `/me/subscriptions/${type}/${key}`;
    return value ? axios.put(url) : axios.delete(url);
}
