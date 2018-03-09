import Echo = require('laravel-echo');
import PrivateChannel from './PrivateChannel';
import NewPostsChannel from './NewPostsChannel';
export declare function newConnection(options?: object): Echo;
export declare function joinPrivateChannel(userId: number, connection: Echo): PrivateChannel;
export declare function joinNewPostsChannel(connection: Echo): NewPostsChannel;
