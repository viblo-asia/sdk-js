import Echo = require('laravel-echo');
import { Channel } from 'laravel-echo/src/channel';
import { NewNotificationEvent, NotificationClearedEvent } from './events';

export default class PrivateChannel
{
    private channel: Channel;

    constructor (userId: number, connection: Echo) {
        const channel = `Framgia.Viblo.Models.User.${userId}`;
        this.channel = connection.private(channel);
    }

    public onNewNotification(listener: (event: NewNotificationEvent) => void) {
        this.channel.notification(listener);
    }

    public onNotificationCleared(listener: (event: NotificationClearedEvent) => void) {
        this.channel.listen('NotificationsCleared', listener);
    }
}
