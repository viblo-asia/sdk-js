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
export interface NewPostPublishedEvent {
    user: object;
    post: object;
}
