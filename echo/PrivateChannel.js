"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrivateChannel = /** @class */ (function () {
    function PrivateChannel(userId, connection) {
        var channel = "Framgia.Viblo.Models.User." + userId;
        this.channel = connection.private(channel);
    }
    PrivateChannel.prototype.onNewNotification = function (listener) {
        this.channel.notification(listener);
    };
    PrivateChannel.prototype.onNotificationCleared = function (listener) {
        this.channel.listen('NotificationsCleared', listener);
    };
    return PrivateChannel;
}());
exports.default = PrivateChannel;
