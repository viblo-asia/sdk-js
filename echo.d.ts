import Echo = require('laravel-echo');
import { Channel } from 'laravel-echo/src/channel';
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
    ids: Array<Number>;
    /** Whether the notifications are mark as read or deleted permanently */
    deleted: Boolean;
}
export declare function newConnection(options?: object): Echo;
export declare function joinPrivateChannel(userId: string, connection: Echo): Channel;
export declare function onNewNotification(listener: (event: NewNotificationEvent) => void, channel: Channel): void;
export declare function onNotificationCleared(listener: (event: NotificationClearedEvent) => void, channel: Channel): void;
