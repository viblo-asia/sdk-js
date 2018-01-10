// Why, Laravel echo? Whyyyyyyyyyyyyy ლ(ಠ益ಠ)ლ
import Echo = require('laravel-echo');
import { getCurrentToken } from './auth';

export function createEchoInstance (options?: object): Echo {
    const token = getCurrentToken();

    const auth = token
        ? { headers: `${token.token_type} ${token.access_token}` }
        : null;

    return new Echo({
        host: 'https://viblo.asia:6001',
        broadcaster: 'socket.io',
        namespace: 'Framgia.Viblo.Events',
        reconnectionAttempts: 2,
        reconnectionDelay: 5000,
        auth,
        ...options
    });
}
