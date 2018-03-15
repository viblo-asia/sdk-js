import Echo = require('laravel-echo');
import { NewPostPublishedEvent } from './events';
import { Channel } from 'laravel-echo/src/channel';

export default class NewPostsChannel
{
    private channel: Channel;

    constructor (connection: Echo) {
        this.channel = connection.channel('newly-published-post');
    }

    public onNewPostPublished(listener: (event: NewPostPublishedEvent) => void) {
        this.channel.listen('Posts\\Published', listener);
    }
}
