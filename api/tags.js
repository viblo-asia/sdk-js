"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.all = function (params) {
    return axios_1.default.get('tags', { params: params }).then(function (_) { return _.data; });
};
var associatedResource = function (type) {
    return function (tag, params) {
        return axios_1.default.get("/tags/" + tag + "/" + type, { params: params }).then(function (_) { return _.data; });
    };
};
exports.getPosts = associatedResource('posts');
exports.getQuestions = associatedResource('questions');
exports.getSeries = associatedResource('series');
exports.getFollowers = associatedResource('followers');
