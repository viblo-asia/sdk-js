"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.self = function () { return axios_1.default.get('/me').then(function (_) { return _.data.data; }); };
// Draft contents
exports.getDrafts = function (params) { return axios_1.default.get('/me/contents/drafts', { params: params }).then(function (_) { return _.data; }); };
// Uploaded files
exports.getImages = function (params) {
    return axios_1.default.get('/me/images', { params: params }).then(function (_) { return _.data; });
};
exports.deleteImage = function (uuid) { return axios_1.default.delete("/me/images/" + uuid); };
// Notifications
exports.getNotifications = function (params) { return axios_1.default.get('/me/notifications', { params: params }).then(function (_) { return _.data; }); };
exports.clearNotifications = function (params) { return axios_1.default.post('/me/notifications/clear', { params: params }); };
// Profile
exports.getProfile = function () { return axios_1.default.get('/me/settings/profile').then(function (_) { return _.data; }); };
exports.updateProfile = function (input) { return axios_1.default.post('/me/settings/profile', input); };
exports.changePassword = function (input) { return axios_1.default.put('/me/settings/password', input); };
exports.getConnectedAccounts = function () { return axios_1.default.get('/me/settings/socials').then(function (_) { return _.data; }); };
exports.disconnectSocialAccount = function (service) { return axios_1.default.delete("/social/" + service + "/identities"); };
exports.setSocialPrivacy = function (service, value) { return axios_1.default.put('/me/settings/socialPrivacy', { service: service, value: value }); };
exports.getNotificationSettings = function () { return axios_1.default.get('/me/settings/notification').then(function (_) { return _.data; }); };
exports.setNotificationSettings = function (name, value) { return axios_1.default.put('/me/settings/notification', { name: name, value: value }); };
exports.getServiceSettings = function () { return axios_1.default.get('/me/settings/service').then(function (_) { return _.data; }); };
exports.setServiceSettings = function (name, value) { return axios_1.default.put('/me/settings/service', { name: name, value: value }); };
// Subscriptions
function subscribe(type, key, value) {
    var url = "/me/subscriptions/" + type + "/" + key;
    return value ? axios_1.default.put(url) : axios_1.default.delete(url);
}
exports.subscribe = subscribe;
