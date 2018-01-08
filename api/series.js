"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getSeriesFeed = function (params) {
    return axios_1.default.get('/series', { params: params }).then(function (_) { return _.data; });
};
exports.getSeries = function (hashId) {
    return axios_1.default.get("/series/" + hashId).then(function (_) { return _.data; });
};
exports.createSeries = function (values) { return axios_1.default.post('/series', values); };
exports.edit = function (hashId) { return axios_1.default.get("/series/" + hashId + "/edit").then(function (_) { return _.data; }); };
exports.updateSeries = function (hashId, values) { return axios_1.default.put("/series/" + hashId, values); };
exports.deleteSeries = function (hashId) { return axios_1.default.delete("/series/" + hashId); };
exports.getPosts = function (hashId, params) {
    return axios_1.default.get("/series/" + hashId + "/posts").then(function (_) { return _.data; });
};
exports.addPost = function (postId, series) {
    return axios_1.default.put("/series/" + series + "/addPost", { post_id: postId });
};
exports.removePost = function (postId, series) {
    return axios_1.default.put("/series/" + series + "/removePost", { post_id: postId });
};
exports.movePostBefore = function (nextPostId, postId, series) {
    return axios_1.default.put("/series/" + series + "/movePostBefore", {
        next_post_id: nextPostId,
        post_id: postId
    });
};
