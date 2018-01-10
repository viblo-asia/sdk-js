const fse = require('fs-extra');

fse.copy('src/types', 'dist/types');

const files = ['package.json', 'yarn.lock', 'README.md'];

files.forEach(file =>
    fse.copy(file, `dist/${file}`)
        .catch(() => {
            console.log(`Cannot copy ${file}`)
        })
);
