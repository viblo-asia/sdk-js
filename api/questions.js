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
var QuestionFeedType;
(function (QuestionFeedType) {
    QuestionFeedType["Newest"] = "newest";
    QuestionFeedType["Unsolved"] = "unsolved";
    QuestionFeedType["Unanswered"] = "unanswered";
    QuestionFeedType["Following"] = "followings";
    QuestionFeedType["Clipped"] = "clips";
})(QuestionFeedType = exports.QuestionFeedType || (exports.QuestionFeedType = {}));
exports.getQuestionsFeed = function (feed, params) {
    return axios_1.default.get('/questions', { params: __assign({ feed: feed }, params) }).then(function (_) { return _.data; });
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
exports.updateQuestion = function (hashId, input) { return axios_1.default.put("/questions/" + hashId, input); };
exports.deleteQuestion = function (hashId) { return axios_1.default.delete("/questions/" + hashId); };
