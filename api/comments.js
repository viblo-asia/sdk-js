"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getComments = function (commentableType, hashId) {
    return axios_1.default.get("/" + commentableType + "/" + hashId + "/comments").then(function (_) { return _.data; });
};
exports.postComment = function (commentableType, hashId, input) {
    return axios_1.default.post("/" + commentableType + "/" + hashId + "/comments", input);
};
exports.updateComment = function (hashId, input) {
    return axios_1.default.put("/comments/" + hashId, input);
};
exports.deleteComment = function (hashId) { return axios_1.default.delete("/comments/" + hashId); };
