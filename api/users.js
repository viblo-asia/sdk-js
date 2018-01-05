"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getProfile = function (username, params) {
    return axios_1.default.get("/users/" + username, { params: params }).then(function (_) { return _.data; });
};
var associatedResource = function (type) {
    return function (username, params) {
        return axios_1.default.get("/users/" + username + "/" + type, { params: params }).then(function (_) { return _.data; });
    };
};
exports.getUserPosts = associatedResource('posts');
exports.getUserClips = associatedResource('clips');
exports.getUserQuestions = associatedResource('questions');
exports.getUserSeries = associatedResource('series');
exports.getUserFollowers = associatedResource('followers');
exports.getUserFollowings = associatedResource('followings');
exports.getUserFollowingTags = associatedResource('following-tags');
