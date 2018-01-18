declare module 'laravel-echo' {
    import { Channel, PresenceChannel } from 'laravel-echo/src/channel';

    class Echo {
        /**
         * Create an Echo instance.
         */
        constructor (options: any);

        /**
         * Listen for an event on a channel instance.
         */
        listen (channel: string, event: string, callback: Function): void;

        /**
         * Get a channel instance by name.
         */
        channel (channel: string): Channel;

        /**
         * Get a private channel instance by name.
         */
        private (channel: string): Channel;

        /**
         * Get a presence channel instance by name.
         */
        join (channel: string): PresenceChannel;

        /**
         * Leave the given channel.
         */
        leave (channel: string): void;

        /**
         * Disconnect from the Echo server.
         */
        disconnect (): void;
    }

    export = Echo;
}
