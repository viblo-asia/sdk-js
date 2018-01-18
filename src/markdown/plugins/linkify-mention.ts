export const createDefinition = (baseURL: string) => ({
    validate: function (text: string, pos: number, self: any) {
        const tail = text.slice(pos);

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
        const username = match.url.replace(/^@/, '');
        match.url = `${baseURL}/${username}`;
    }
});
