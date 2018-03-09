"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewPostsChannel = /** @class */ (function () {
    function NewPostsChannel(connection) {
        this.channel = connection.channel('newly-published-post');
    }
    NewPostsChannel.prototype.onNewPostPublished = function (listener) {
        this.channel.listen("PostsPublished", listener);
    };
    return NewPostsChannel;
}());
exports.default = NewPostsChannel;
