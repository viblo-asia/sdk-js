"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
var SearchType;
(function (SearchType) {
    SearchType["Post"] = "posts";
    SearchType["Question"] = "questions";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
exports.search = function (type, params) {
    return axios_1.default.get("/search/" + type, { params: params }).then(function (_) { return _.data; });
};
exports.multisearch = function (params) { return axios_1.default.get('/search/multi', { params: params }).then(function (_) { return _.data; }); };
