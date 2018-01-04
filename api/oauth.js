"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getApiKeys = function () { return axios_1.default.get('/oauth/personal-access-tokens').then(function (_) { return _.data; }); };
exports.getScopes = function () { return axios_1.default.get('/oauth/scopes').then(function (_) { return _.data; }); };
exports.createApiKey = function (name) { return axios_1.default.post('/oauth/personal-access-tokens', { name: name }); };
exports.revokeApiKey = function (tokenId, password) {
    return axios_1.default.post("/oauth/tokens/" + tokenId + "/revoke", { password: password });
};
