"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
exports.multisearch = function (searchQuery, params) { return axios_1.default.get('/search/multi', {
    params: __assign({ q: searchQuery }, params)
}).then(function (_) { return _.data; }); };
