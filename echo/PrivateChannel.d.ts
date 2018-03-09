import Echo = require('laravel-echo');
import { NewNotificationEvent, NotificationClearedEvent } from './events';
export default class PrivateChannel {
    private channel;
    constructor(userId: number, connection: Echo);
    onNewNotification(listener: (event: NewNotificationEvent) => void): void;
    onNotificationCleared(listener: (event: NotificationClearedEvent) => void): void;
}
