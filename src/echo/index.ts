// Why, Laravel echo? Whyyyyyyyyyyyyy ლ(ಠ益ಠ)ლ
import Echo = require('laravel-echo');
import { getCurrentToken, OAuthToken } from '../auth';
import PrivateChannel from './PrivateChannel';
import NewPostsChannel from './NewPostsChannel';

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

export function joinPrivateChannel(userId: number, connection: Echo): PrivateChannel {
    return new PrivateChannel(userId, connection);
}

export function joinNewPostsChannel(connection: Echo): NewPostsChannel {
    return new NewPostsChannel(connection);
}
