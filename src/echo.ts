// Why, Laravel echo? Whyyyyyyyyyyyyy ლ(ಠ益ಠ)ლ
import Echo = require('laravel-echo');
import { Channel } from 'laravel-echo/src/channel';
import { getCurrentToken, OAuthToken } from './auth';

export interface NewNotificationEvent {
    id: string;
    type: string;
    notification: {
        type: string;
        data: object;
        sender?: object;
    };
}

export interface NotificationClearedEvent {
    /** IDs of cleared notifications */
    ids: number[];
    /** Whether the notifications are mark as read or deleted permanently */
    deleted: Boolean;
}

const defaultOptions = {
    host: 'https://viblo.asia:6001',
    broadcaster: 'socket.io',
    namespace: 'Framgia.Viblo.Events',
    reconnectionAttempts: 2,
    reconnectionDelay: 5000
};

const setAuthorizationHeader = (token: OAuthToken, options: object) => ({
    ...options,
    auth: {
        headers: {
            authorization: `${token.token_type} ${token.access_token}`
        }
    }
});

export function newConnection(options?: object): Echo {
    const token = getCurrentToken();

    const baseOptions = token
        ? setAuthorizationHeader(token, defaultOptions)
        : defaultOptions;

    return new Echo({
        ...baseOptions,
        ...options
    });
}

export function joinPrivateChannel(userId: string, connection: Echo): Channel {
    const channel = `Framgia.Viblo.Models.User.${userId}`;
    return connection.private(channel);
}

export function onNewNotification(listener: (event: NewNotificationEvent) => void, channel: Channel) {
    channel.notification(listener);
}

export function onNotificationCleared(listener: (event: NotificationClearedEvent) => void, channel: Channel) {
    channel.listen('NotificationsCleared', listener);
}
