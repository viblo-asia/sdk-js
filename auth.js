"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("./sdk");
var axios_1 = require("./libs/axios");
var currentToken = null;
function getOauthToken(params) {
    return __awaiter(this, void 0, void 0, function () {
        var oauthConfig, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oauthConfig = sdk_1.config.oauth;
                    if (!oauthConfig) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios_1.default.post('/oauth/token', __assign({ client_id: oauthConfig.client_id, client_secret: oauthConfig.client_secret }, params)).then(function (response) { return response.data; })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            token_type: response.token_type,
                            access_token: response.access_token
                        }];
                case 2: throw new Error('Oauth client is not set');
            }
        });
    });
}
exports.login = function (credentials) {
    return getOauthToken(__assign({}, credentials, { grant_type: 'password' }));
};
exports.socialLogin = function (credentials) {
    return getOauthToken(__assign({}, credentials, { grant_type: 'social' }));
};
exports.getSocialUser = function (provider, params) {
    return axios_1.default.get("/social/" + provider + "/callback", { params: params }).then(function (_) { return _.data; });
};
/**
 * Set current token and set the Authorization header for all requests.
 */
function setAccessToken(token) {
    currentToken = token;
    axios_1.default.defaults.headers.common['Authorization'] = token.token_type + " " + token.access_token;
}
exports.setAccessToken = setAccessToken;
/**
 * Get the current token.
 */
exports.getCurrentToken = function () { return currentToken ? (__assign({}, currentToken)) : null; };
