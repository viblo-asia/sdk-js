"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.getAnswer = function (answer) {
    return axios_1.default.get("/answers/" + answer);
};
exports.postAnswer = function (question, values) {
    return axios_1.default.post("/questions/" + question + "/answers", values);
};
exports.updateAnswer = function (hashId, values) {
    return axios_1.default.put("/answers/" + hashId, values);
};
exports.deleteAnswer = function (hashId) { return axios_1.default.delete("/answers/" + hashId); };
