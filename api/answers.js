"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.postAnswer = function (question, values) {
    return axios_1.default.post("/questions/" + question + "/answers", values);
};
exports.update = function (hashId, values) {
    return axios_1.default.put("/answers/" + hashId, values);
};
exports.destroy = function (hashId) { return axios_1.default.delete("/answers/" + hashId); };
