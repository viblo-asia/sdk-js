"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getPostForEdit = function (hashId) {
    return axios_1.default.get("/posts/" + hashId + "/edit").then(function (_) { return _.data; });
};
exports.saveRevision = function (hashId, input) { return axios_1.default.put("/posts/" + hashId + "/revisions", input); };
exports.publish = function (input) { return axios_1.default.post('/publish/post', input); };
