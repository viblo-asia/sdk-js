import Echo = require('laravel-echo');
import { NewPostPublishedEvent } from './events';
export default class NewPostsChannel {
    private channel;
    constructor(connection: Echo);
    onNewPostPublished(listener: (event: NewPostPublishedEvent) => void): void;
}
