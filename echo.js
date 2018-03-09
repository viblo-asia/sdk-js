"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Why, Laravel echo? Whyyyyyyyyyyyyy ლ(ಠ益ಠ)ლ
var Echo = require("laravel-echo");
var auth_1 = require("./auth");
var defaultOptions = {
    host: 'https://viblo.asia:6001',
    broadcaster: 'socket.io',
    namespace: 'Framgia.Viblo.Events',
    reconnectionAttempts: 2,
    reconnectionDelay: 5000
};
var setAuthorizationHeader = function (token, options) { return (__assign({}, options, { auth: {
        headers: {
            authorization: token.token_type + " " + token.access_token
        }
    } })); };
function newConnection(options) {
    var token = auth_1.getCurrentToken();
    var baseOptions = token
        ? setAuthorizationHeader(token, defaultOptions)
        : defaultOptions;
    return new Echo(__assign({}, baseOptions, options));
}
exports.newConnection = newConnection;
function joinPrivateChannel(userId, connection) {
    var channel = "Framgia.Viblo.Models.User." + userId;
    return connection.private(channel);
}
exports.joinPrivateChannel = joinPrivateChannel;
function onNewNotification(listener, channel) {
    channel.notification(listener);
}
exports.onNewNotification = onNewNotification;
function onNotificationCleared(listener, channel) {
    channel.listen('NotificationsCleared', listener);
}
exports.onNotificationCleared = onNotificationCleared;
