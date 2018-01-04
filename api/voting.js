"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.castVote = function (type, hashId, score) {
    return axios_1.default.post("/" + type + "/" + hashId + "/rate", { score: score });
};
