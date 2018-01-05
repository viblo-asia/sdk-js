"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
var PostFeedType;
(function (PostFeedType) {
    PostFeedType["Newest"] = "newest";
    PostFeedType["Trending"] = "trending";
    PostFeedType["Following"] = "followings";
    PostFeedType["Clipped"] = "clips";
    PostFeedType["Featured"] = "editors-choice";
})(PostFeedType = exports.PostFeedType || (exports.PostFeedType = {}));
exports.getPostsFeed = function (feed, params) {
    return axios_1.default.get('/posts', { params: params }).then(function (_) { return _.data; });
};
exports.getPost = function (hashId) { return axios_1.default.get("/posts/" + hashId).then(function (_) { return _.data; }); };
exports.deletePost = function (hashId) { return axios_1.default.delete("/api/posts/" + hashId); };
