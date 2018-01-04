"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.all = function (params) {
    return axios_1.default.get('/posts', { params: params }).then(function (_) { return _.data; });
};
exports.getPost = function (hashId) { return axios_1.default.get("/posts/" + hashId).then(function (_) { return _.data; }); };
exports.deletePost = function (hashId) { return axios_1.default.delete("/api/posts/" + hashId); };
