const fse = require('fs-extra');

fse.copy('src/types', 'dist/types');

const files = ['package.json', 'yarn.lock', 'README.md', '.npmignore'];

files.map(file => fse.copy(file, `dist/${file}`));
