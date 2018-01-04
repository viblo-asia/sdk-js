"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("../libs/axios");
exports.all = function (params) {
    return axios_1.default.get('/questions', { params: params }).then(function (_) { return _.data; });
};
exports.getQuestion = function (hashId) {
    return axios_1.default.get("/questions/" + hashId).then(function (_) { return _.data; });
};
exports.getAnswers = function (hashId, params) {
    return axios_1.default.get("/questsions/" + hashId + "/answers", { params: params }).then(function (_) { return _.data; });
};
exports.acceptAnswer = function (answer, value) { return axios_1.default.put("/answers/" + answer + "/accept", { value: value }); };
exports.postQuestion = function (input) { return axios_1.default.post('/questions', input); };
exports.getQuestionForEdit = function (hashId) { return axios_1.default.get("/questions/" + hashId + "/edit"); };
exports.update = function (hashId, input) { return axios_1.default.put("/questions/" + hashId, input); };
exports.deleteQuestion = function (hashId) { return axios_1.default.delete("/questions/" + hashId); };
