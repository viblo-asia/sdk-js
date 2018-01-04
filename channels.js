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
function createEchoInstance(options) {
    var token = auth_1.getCurrentToken();
    var auth = token
        ? { headers: token.token_type + " " + token.access_token }
        : null;
    return new Echo(__assign({ host: 'https://viblo.asia:6001', broadcaster: 'socket.io', namespace: 'Framgia.Viblo.Events', reconnectionAttempts: 2, reconnectionDelay: 5000, auth: auth }, options));
}
exports.createEchoInstance = createEchoInstance;
