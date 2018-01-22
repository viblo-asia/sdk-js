"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefinition = function (baseURL) { return ({
    validate: function (text, pos, self) {
        var tail = text.slice(pos);
        if (!self.re.mention) {
            self.re.mention = /^([\w_.\\-]{3,255})\b/;
        }
        if (self.re.mention.test(tail)) {
            if (pos >= 2 && tail[pos - 2] === '@') {
                return false;
            }
            // @ts-ignore
            return tail.match(self.re.mention)[0].length;
        }
        return 0;
    },
    normalize: function (match) {
        var username = match.url.replace(/^@/, '');
        match.url = baseURL + "/" + username;
    }
}); };
