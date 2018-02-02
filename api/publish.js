"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getPostForEdit = function (hashId) {
    return axios_1.default.get("/posts/" + hashId + "/edit").then(function (_) { return _.data; });
};
exports.savePostRevision = function (input) {
    return axios_1.default.post("/publish/post/autosave", input);
};
exports.saveAsDraft = exports.savePostRevision;
exports.saveAndPublish = function (input) {
    return axios_1.default.post('/publish/post', input);
};
