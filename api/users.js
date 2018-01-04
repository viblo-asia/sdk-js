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
exports.getPosts = associatedResource('posts');
exports.getClips = associatedResource('clips');
exports.getQuestions = associatedResource('questions');
exports.getSeries = associatedResource('series');
exports.getFollowers = associatedResource('followers');
exports.getFollowings = associatedResource('followings');
exports.getFollowingTags = associatedResource('following-tags');
